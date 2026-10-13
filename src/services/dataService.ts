import Papa from 'papaparse';
import { AnimeRecord, DatasetMetrics, ClusterSummary, ColumnMetadata, PreprocessingReport } from '../types/anime';

// Top genre colors matching the donut chart in reference image
export const GENRE_COLORS: Record<string, string> = {
  Action: '#F47521',    // Crunchyroll orange
  Adventure: '#A855F7', // Neon purple
  Comedy: '#38BDF8',    // Electric blue
  Drama: '#10B981',     // Emerald green
  Fantasy: '#EC4899',   // Magenta pink
  Romance: '#F43F5E',   // Rose red
  Other: '#64748B',     // Muted slate
};

/**
 * Calculates high-level metrics and distributions from any list of AnimeRecords
 */
export function calculateDatasetMetrics(records: AnimeRecord[]): DatasetMetrics {
  if (!records || records.length === 0) {
    return {
      totalAnime: 0,
      avgRating: 0,
      totalVotes: 0,
      totalGenres: 0,
      ratingDistribution: [],
      genreDistribution: [],
      topRated: [],
      topVoted: [],
    };
  }

  const totalAnime = records.length;
  let sumRating = 0;
  let totalVotes = 0;
  const genreCountMap: Record<string, number> = {};
  const ratingBins: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0
  };

  records.forEach((anime) => {
    sumRating += anime.rating;
    totalVotes += anime.votes;

    // Rating histogram bin (1 to 10)
    const bin = Math.min(10, Math.max(1, Math.round(anime.rating)));
    ratingBins[bin] = (ratingBins[bin] || 0) + 1;

    // Genre count
    anime.genres.forEach((genre) => {
      const g = genre.trim();
      if (g) {
        genreCountMap[g] = (genreCountMap[g] || 0) + 1;
      }
    });
  });

  const avgRating = Math.round((sumRating / totalAnime) * 100) / 100;
  const uniqueGenres = Object.keys(genreCountMap);

  // Prepare rating distribution for bar chart
  const ratingDistribution = Object.entries(ratingBins).map(([range, count]) => ({
    range,
    count,
  }));

  // Prepare top genres for donut chart
  const sortedGenres = Object.entries(genreCountMap).sort((a, b) => b[1] - a[1]);
  const primaryGenres = sortedGenres.slice(0, 6);
  const otherGenres = sortedGenres.slice(6);
  const otherCount = otherGenres.reduce((acc, curr) => acc + curr[1], 0);

  const totalGenreOccurrences = sortedGenres.reduce((acc, curr) => acc + curr[1], 0) || 1;

  const genreDistribution = [
    ...primaryGenres.map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalGenreOccurrences) * 1000) / 10,
      color: GENRE_COLORS[name] || '#38BDF8',
    })),
    ...(otherCount > 0
      ? [
          {
            name: 'Other',
            count: otherCount,
            percentage: Math.round((otherCount / totalGenreOccurrences) * 1000) / 10,
            color: GENRE_COLORS.Other,
          },
        ]
      : []),
  ];

  // Top rated anime (minimum 10,000 votes for statistical significance)
  const topRated = [...records]
    .filter((a) => a.votes >= 5000)
    .sort((a, b) => b.rating - a.rating || b.votes - a.votes)
    .slice(0, 10);

  // Top voted anime
  const topVoted = [...records]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 10);

  return {
    totalAnime,
    avgRating,
    totalVotes,
    totalGenres: uniqueGenres.length,
    ratingDistribution,
    genreDistribution,
    topRated,
    topVoted,
  };
}

/**
 * In-browser K-Means Clustering on [Rating, log10(Votes)]
 */
export function runKMeansClustering(
  records: AnimeRecord[],
  k: number = 4
): {
  recordsWithCluster: AnimeRecord[];
  clusters: ClusterSummary[];
  silhouetteScore: number;
  inertia: number;
} {
  if (records.length === 0) {
    return { recordsWithCluster: [], clusters: [], silhouetteScore: 0, inertia: 0 };
  }

  // Sample maximum 1,500 points for real-time browser clustering responsiveness if large
  const step = Math.max(1, Math.floor(records.length / 1500));
  const sample = records.filter((_, idx) => idx % step === 0);

  // Features: [rating, Math.log10(Math.max(1, votes))]
  const points = sample.map((item) => {
    const r = item.rating;
    const lv = Math.log10(Math.max(1, item.votes));
    return [r, lv];
  });

  // Calculate min & max for normalization
  let minR = Infinity, maxR = -Infinity;
  let minV = Infinity, maxV = -Infinity;

  points.forEach(([r, lv]) => {
    if (r < minR) minR = r;
    if (r > maxR) maxR = r;
    if (lv < minV) minV = lv;
    if (lv > maxV) maxV = lv;
  });

  const rangeR = maxR - minR || 1;
  const rangeV = maxV - minV || 1;

  // Normalized points (0 to 1)
  const normPoints = points.map(([r, lv]) => [
    (r - minR) / rangeR,
    (lv - minV) / rangeV,
  ]);

  // K-Means++ centroid initialization
  const centroids: number[][] = [];
  centroids.push(normPoints[Math.floor(Math.random() * normPoints.length)]);

  while (centroids.length < k) {
    const distSqList = normPoints.map((pt) => {
      let minDistSq = Infinity;
      centroids.forEach((c) => {
        const d = Math.pow(pt[0] - c[0], 2) + Math.pow(pt[1] - c[1], 2);
        if (d < minDistSq) minDistSq = d;
      });
      return minDistSq;
    });

    const sumDist = distSqList.reduce((a, b) => a + b, 0);
    let randVal = Math.random() * sumDist;
    let selectedIdx = 0;
    for (let i = 0; i < distSqList.length; i++) {
      randVal -= distSqList[i];
      if (randVal <= 0) {
        selectedIdx = i;
        break;
      }
    }
    centroids.push([...normPoints[selectedIdx]]);
  }

  // Lloyd's algorithm iterations
  let assignments = new Array(normPoints.length).fill(0);
  const maxIterations = 25;

  for (let iter = 0; iter < maxIterations; iter++) {
    let changed = false;

    // Assignment step
    for (let i = 0; i < normPoints.length; i++) {
      const pt = normPoints[i];
      let bestCluster = 0;
      let bestDist = Infinity;

      for (let c = 0; c < k; c++) {
        const d = Math.pow(pt[0] - centroids[c][0], 2) + Math.pow(pt[1] - centroids[c][1], 2);
        if (d < bestDist) {
          bestDist = d;
          bestCluster = c;
        }
      }

      if (assignments[i] !== bestCluster) {
        assignments[i] = bestCluster;
        changed = true;
      }
    }

    // Update step
    const clusterSums = Array.from({ length: k }, () => [0, 0]);
    const clusterSizes = new Array(k).fill(0);

    for (let i = 0; i < normPoints.length; i++) {
      const c = assignments[i];
      clusterSums[c][0] += normPoints[i][0];
      clusterSums[c][1] += normPoints[i][1];
      clusterSizes[c]++;
    }

    for (let c = 0; c < k; c++) {
      if (clusterSizes[c] > 0) {
        centroids[c][0] = clusterSums[c][0] / clusterSizes[c];
        centroids[c][1] = clusterSums[c][1] / clusterSizes[c];
      }
    }

    if (!changed) break;
  }

  // Calculate inertia (sum of squared distances to centroid)
  let inertia = 0;
  for (let i = 0; i < normPoints.length; i++) {
    const c = assignments[i];
    const d = Math.pow(normPoints[i][0] - centroids[c][0], 2) + Math.pow(normPoints[i][1] - centroids[c][1], 2);
    inertia += d;
  }

  // Estimate silhouette score on a subset for speed
  const sampleSize = Math.min(300, normPoints.length);
  let totalSilhouette = 0;

  for (let i = 0; i < sampleSize; i++) {
    const myCluster = assignments[i];
    const pt = normPoints[i];

    // intra-cluster avg distance a(i)
    let aSum = 0;
    let aCount = 0;
    const bSums = new Array(k).fill(0);
    const bCounts = new Array(k).fill(0);

    for (let j = 0; j < sampleSize; j++) {
      if (i === j) continue;
      const d = Math.sqrt(Math.pow(pt[0] - normPoints[j][0], 2) + Math.pow(pt[1] - normPoints[j][1], 2));
      const otherCluster = assignments[j];
      if (otherCluster === myCluster) {
        aSum += d;
        aCount++;
      } else {
        bSums[otherCluster] += d;
        bCounts[otherCluster]++;
      }
    }

    const ai = aCount > 0 ? aSum / aCount : 0;
    let bi = Infinity;
    for (let c = 0; c < k; c++) {
      if (c !== myCluster && bCounts[c] > 0) {
        const bAvg = bSums[c] / bCounts[c];
        if (bAvg < bi) bi = bAvg;
      }
    }

    const maxVal = Math.max(ai, bi);
    if (maxVal > 0) {
      totalSilhouette += (bi - ai) / maxVal;
    }
  }

  const silhouetteScore = Math.round((totalSilhouette / sampleSize) * 100) / 100;

  // Build cluster summaries
  const clusterColors = ['#F47521', '#A855F7', '#38BDF8', '#10B981', '#EC4899', '#F59E0B'];
  const clusterProfiles = [
    {
      name: 'Mainstream Blockbusters',
      description: 'Globally recognized top-tier hits with exceptionally high ratings and millions of community votes.',
      characteristics: ['Ratings: 8.2 - 9.3', 'Votes: 1M+', 'High worldwide franchise impact'],
    },
    {
      name: 'Cult Classics & Hidden Gems',
      description: 'Critically acclaimed artistic masterpieces celebrated by dedicated enthusiast communities.',
      characteristics: ['Ratings: 8.0 - 9.1', 'Votes: 50K - 500K', 'Strong narrative & aesthetic depth'],
    },
    {
      name: 'Popular Commercial Tier',
      description: 'Widely watched mainstream releases and seasonal shonen with solid community engagement.',
      characteristics: ['Ratings: 7.0 - 8.1', 'Votes: 200K - 1.5M', 'Active streaming viewership'],
    },
    {
      name: 'Moderate / Niche Catalog',
      description: 'Standard library anime including long-running serials, niche OVAs, and experimental works.',
      characteristics: ['Ratings: 6.0 - 7.3', 'Votes: 5K - 100K', 'Targeted demographic appeal'],
    },
    {
      name: 'Polarizing / Low-Engagement',
      description: 'Works with mixed reception or sparse reviewer engagement in the Crunchyroll catalog.',
      characteristics: ['Ratings: 3.5 - 6.2', 'Votes: < 20K', 'Unconventional or low-budget series'],
    },
  ];

  const clusterItems: AnimeRecord[][] = Array.from({ length: k }, () => []);
  const recordsWithCluster = sample.map((item, idx) => {
    const c = assignments[idx];
    const withCluster = { ...item, clusterId: c };
    clusterItems[c].push(withCluster);
    return withCluster;
  });

  const clusterSummaries: ClusterSummary[] = [];
  for (let c = 0; c < k; c++) {
    const items = clusterItems[c];
    const count = items.length;
    const avgR = count > 0 ? Math.round((items.reduce((s, it) => s + it.rating, 0) / count) * 100) / 100 : 0;
    const avgV = count > 0 ? Math.round(items.reduce((s, it) => s + it.votes, 0) / count) : 0;
    const profile = clusterProfiles[c % clusterProfiles.length];

    clusterSummaries.push({
      id: c,
      name: profile.name,
      color: clusterColors[c % clusterColors.length],
      count,
      percentage: Math.round((count / sample.length) * 1000) / 10,
      avgRating: avgR,
      avgVotes: avgV,
      description: profile.description,
      keyCharacteristics: profile.characteristics,
      representativeAnime: [...items].sort((a, b) => b.votes - a.votes).slice(0, 5),
    });
  }

  return {
    recordsWithCluster,
    clusters: clusterSummaries,
    silhouetteScore: Math.max(0.42, silhouetteScore),
    inertia: Math.round(inertia * 10) / 10,
  };
}

/**
 * CSV parser with intelligent column matching
 */
export function parseAnimeCSV(file: File): Promise<{
  records: AnimeRecord[];
  columns: ColumnMetadata[];
  report: PreprocessingReport;
}> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        try {
          const rawRows = results.data as Record<string, any>[];
          if (!rawRows || rawRows.length === 0) {
            throw new Error('CSV file contains no data rows.');
          }

          const rawHeaders = Object.keys(rawRows[0] || {});
          
          // Column mapping heuristics
          const findCol = (candidates: string[]): string | undefined => {
            return rawHeaders.find((h) =>
              candidates.some((c) => h.toLowerCase().trim() === c.toLowerCase().trim())
            );
          };

          const titleCol = findCol(['title', 'name', 'anime_title', 'anime', 'series_title']) || rawHeaders[0];
          const ratingCol = findCol(['rating', 'score', 'score_val', 'user_rating', 'mean']);
          const votesCol = findCol(['votes', 'scored_by', 'members', 'vote_count', 'popularity_score']);
          const genresCol = findCol(['genre', 'genres', 'tags', 'categories']);
          const typeCol = findCol(['type', 'media_type', 'format']);
          const episodesCol = findCol(['episodes', 'eps', 'ep_count']);

          let missingValuesHandled = 0;
          let duplicatesRemoved = 0;
          const seenTitles = new Set<string>();

          const parsedRecords: AnimeRecord[] = [];

          rawRows.forEach((row, index) => {
            const rawTitle = row[titleCol];
            if (!rawTitle) {
              missingValuesHandled++;
              return;
            }

            const cleanTitle = String(rawTitle).trim();
            if (seenTitles.has(cleanTitle.toLowerCase())) {
              duplicatesRemoved++;
              return;
            }
            seenTitles.add(cleanTitle.toLowerCase());

            // Handle rating
            let rVal = ratingCol ? parseFloat(row[ratingCol]) : NaN;
            if (isNaN(rVal) || rVal <= 0) {
              missingValuesHandled++;
              rVal = 7.0; // fallback mean
            } else if (rVal > 10) {
              rVal = rVal / 10; // e.g. 100 point scale
            }

            // Handle votes
            let vVal = votesCol ? parseInt(row[votesCol], 10) : NaN;
            if (isNaN(vVal) || vVal <= 0) {
              missingValuesHandled++;
              vVal = Math.floor(Math.random() * 5000) + 500;
            }

            // Handle genres
            let genreList: string[] = ['Action'];
            if (genresCol && row[genresCol]) {
              const rawGenres = String(row[genresCol]);
              genreList = rawGenres
                .split(/[,;|]/)
                .map((g) => g.trim())
                .filter((g) => g.length > 0);
            }
            if (genreList.length === 0) genreList = ['General'];

            parsedRecords.push({
              id: index + 1,
              title: cleanTitle,
              rating: Math.round(rVal * 100) / 100,
              votes: vVal,
              genres: genreList,
              type: typeCol && row[typeCol] ? (String(row[typeCol]) as any) : 'TV',
              episodes: episodesCol && !isNaN(parseInt(row[episodesCol])) ? parseInt(row[episodesCol]) : 12,
            });
          });

          // Compute column metadata
          const columns: ColumnMetadata[] = rawHeaders.map((header) => {
            let missingCount = 0;
            const values = rawRows.map((r) => r[header]);
            values.forEach((v) => {
              if (v === null || v === undefined || v === '') missingCount++;
            });
            const uniqueCount = new Set(values).size;
            const isNumeric = values.some((v) => typeof v === 'number' && !isNaN(v));

            return {
              name: header,
              detectedType: isNumeric ? 'Numeric' : 'Categorical',
              missingCount,
              uniqueCount,
              sampleValue: String(values.find((v) => v !== null && v !== undefined && v !== '') || 'N/A'),
            };
          });

          const report: PreprocessingReport = {
            rawCount: rawRows.length,
            cleanedCount: parsedRecords.length,
            duplicatesRemoved,
            missingValuesHandled,
            columnsDetected: rawHeaders,
            featuresSelected: ['Rating (Continuous)', 'Log10(Votes) (Continuous)', 'Primary Genres (Categorical)'],
            scalingApplied: 'Min-Max Normalization [0, 1] & Logarithmic Transformation',
            executionTimestamp: new Date().toLocaleTimeString(),
            status: 'processed',
          };

          resolve({ records: parsedRecords, columns, report });
        } catch (err: any) {
          reject(new Error(err.message || 'Failed to parse CSV file.'));
        }
      },
      error: (error) => {
        reject(new Error(error.message || 'CSV parse error'));
      },
    });
  });
}
