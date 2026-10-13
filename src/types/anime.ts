export interface AnimeRecord {
  id: number;
  title: string;
  rating: number; // 1.0 to 10.0
  votes: number; // vote count, e.g. 100 to 5,000,000
  genres: string[];
  episodes?: number;
  type?: 'TV' | 'Movie' | 'OVA' | 'Special';
  releaseYear?: number;
  status?: 'Finished Airing' | 'Currently Airing';
  synopsis?: string;
  clusterId?: number;
  imageUrl?: string;
}

export interface DatasetMetrics {
  totalAnime: number;
  avgRating: number;
  totalVotes: number;
  totalGenres: number;
  ratingDistribution: { range: string; count: number }[];
  genreDistribution: { name: string; count: number; percentage: number; color: string }[];
  topRated: AnimeRecord[];
  topVoted: AnimeRecord[];
}

export interface ClusterSummary {
  id: number;
  name: string;
  color: string;
  count: number;
  percentage: number;
  avgRating: number;
  avgVotes: number;
  description: string;
  keyCharacteristics: string[];
  representativeAnime: AnimeRecord[];
}

export interface PreprocessingReport {
  rawCount: number;
  cleanedCount: number;
  duplicatesRemoved: number;
  missingValuesHandled: number;
  columnsDetected: string[];
  featuresSelected: string[];
  scalingApplied: string;
  executionTimestamp: string;
  status: 'raw' | 'processed';
}

export interface ColumnMetadata {
  name: string;
  detectedType: 'Numeric' | 'Categorical' | 'Text' | 'Unknown';
  missingCount: number;
  uniqueCount: number;
  sampleValue: string;
}

export interface TeamMember {
  id: string;
  name: string;
  rollNo: string;
  role: string;
  contributions: string;
}

export const PROJECT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '01',
    name: 'Raza Ansari',
    rollNo: '62',
    role: 'Team Lead & Project Architect',
    contributions: 'Project Coordination, System Architecture, Pipeline Integration & Deliverables',
  },
  {
    id: '02',
    name: 'Manasvi Pawar',
    rollNo: '45',
    role: 'Algorithms & Clustering Lead',
    contributions: 'K-Means Optimization, PCA Decomposition, A* Search Path & Statistical Testing',
  },
  {
    id: '03',
    name: 'Gavin Sequeira',
    rollNo: '52',
    role: 'Lead Developer & ML Engineer',
    contributions: 'Data Ingestion, Regression, Classification & Model Diagnostics',
  },
  {
    id: '04',
    name: 'Sunil Lewis',
    rollNo: '63',
    role: 'Frontend & Visualization Lead',
    contributions: 'React Components, Interactive Visualizations, State Management & Dashboard UX',
  },
];
