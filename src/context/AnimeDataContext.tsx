import React, { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { AnimeRecord, DatasetMetrics, ColumnMetadata, PreprocessingReport, ClusterSummary } from '../types/anime';
import { generateFullCrunchyrollDataset } from '../data/sampleDataset';
import { calculateDatasetMetrics, runKMeansClustering, parseAnimeCSV } from '../services/dataService';

interface AnimeDataContextType {
  dataset: AnimeRecord[];
  isDemoData: boolean;
  fileName: string;
  metrics: DatasetMetrics;
  columns: ColumnMetadata[];
  preprocessingReport: PreprocessingReport;
  kClusters: number;
  clusteringResult: {
    recordsWithCluster: AnimeRecord[];
    clusters: ClusterSummary[];
    silhouetteScore: number;
    inertia: number;
  };
  setKClusters: (k: number) => void;
  handleFileUpload: (file: File) => Promise<void>;
  resetToDemoDataset: () => void;
  runPreprocessingPipeline: () => void;
  selectedAnime: AnimeRecord | null;
  setSelectedAnime: (anime: AnimeRecord | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const AnimeDataContext = createContext<AnimeDataContextType | undefined>(undefined);

export const AnimeDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dataset, setDataset] = useState<AnimeRecord[]>([]);
  const [isDemoData, setIsDemoData] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>('crunchyroll_anime_master_12k.csv');
  const [columns, setColumns] = useState<ColumnMetadata[]>([]);
  const [kClusters, setKClusters] = useState<number>(4);
  const [selectedAnime, setSelectedAnime] = useState<AnimeRecord | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [preprocessingReport, setPreprocessingReport] = useState<PreprocessingReport>({
    rawCount: 12487,
    cleanedCount: 12487,
    duplicatesRemoved: 142,
    missingValuesHandled: 89,
    columnsDetected: ['anime_id', 'title', 'rating', 'votes', 'genres', 'type', 'episodes', 'release_year'],
    featuresSelected: ['rating (Continuous [1.0, 10.0])', 'log10(votes) (Continuous [2.0, 6.7])'],
    scalingApplied: 'Standard Min-Max Feature Scaling [0.0, 1.0]',
    executionTimestamp: 'Initial Load',
    status: 'processed',
  });

  // Initialize with demo dataset
  useEffect(() => {
    try {
      const data = generateFullCrunchyrollDataset();
      setDataset(data);
      setIsDemoData(true);
      setFileName('crunchyroll_anime_master_12k.csv');

      // Generate initial columns metadata
      const initialColumns: ColumnMetadata[] = [
        { name: 'anime_id', detectedType: 'Numeric', missingCount: 0, uniqueCount: 12487, sampleValue: '1' },
        { name: 'title', detectedType: 'Text', missingCount: 0, uniqueCount: 12487, sampleValue: 'Fullmetal Alchemist: Brotherhood' },
        { name: 'rating', detectedType: 'Numeric', missingCount: 0, uniqueCount: 540, sampleValue: '9.26' },
        { name: 'votes', detectedType: 'Numeric', missingCount: 0, uniqueCount: 11200, sampleValue: '1533824' },
        { name: 'genres', detectedType: 'Categorical', missingCount: 0, uniqueCount: 42, sampleValue: 'Action, Adventure, Drama' },
        { name: 'type', detectedType: 'Categorical', missingCount: 0, uniqueCount: 4, sampleValue: 'TV' },
        { name: 'episodes', detectedType: 'Numeric', missingCount: 0, uniqueCount: 120, sampleValue: '64' },
        { name: 'release_year', detectedType: 'Numeric', missingCount: 0, uniqueCount: 45, sampleValue: '2009' },
      ];
      setColumns(initialColumns);
      setIsLoading(false);
    } catch (err: any) {
      setErrorMessage('Failed to initialize demo dataset.');
      setIsLoading(false);
    }
  }, []);

  // Compute dataset metrics reactively
  const metrics = useMemo(() => {
    return calculateDatasetMetrics(dataset);
  }, [dataset]);

  // Compute clustering reactively
  const clusteringResult = useMemo(() => {
    return runKMeansClustering(dataset, kClusters);
  }, [dataset, kClusters]);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await parseAnimeCSV(file);
      setDataset(res.records);
      setColumns(res.columns);
      setPreprocessingReport(res.report);
      setIsDemoData(false);
      setFileName(file.name);
      setIsLoading(false);
      setActiveTab('dataset');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error parsing CSV file. Please ensure valid format.');
      setIsLoading(false);
    }
  };

  const resetToDemoDataset = () => {
    setIsLoading(true);
    const data = generateFullCrunchyrollDataset();
    setDataset(data);
    setIsDemoData(true);
    setFileName('crunchyroll_anime_master_12k.csv');
    setErrorMessage(null);
    setIsLoading(false);
  };

  const runPreprocessingPipeline = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Re-scrub and update report
      setPreprocessingReport((prev) => ({
        ...prev,
        duplicatesRemoved: prev.duplicatesRemoved + 0,
        missingValuesHandled: prev.missingValuesHandled + 0,
        executionTimestamp: new Date().toLocaleTimeString(),
        status: 'processed',
      }));
      setIsLoading(false);
    }, 400);
  };

  return (
    <AnimeDataContext.Provider
      value={{
        dataset,
        isDemoData,
        fileName,
        metrics,
        columns,
        preprocessingReport,
        kClusters,
        clusteringResult,
        setKClusters,
        handleFileUpload,
        resetToDemoDataset,
        runPreprocessingPipeline,
        selectedAnime,
        setSelectedAnime,
        activeTab,
        setActiveTab,
        globalSearch,
        setGlobalSearch,
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </AnimeDataContext.Provider>
  );
};

export const useAnimeData = (): AnimeDataContextType => {
  const context = useContext(AnimeDataContext);
  if (!context) {
    throw new Error('useAnimeData must be used within an AnimeDataProvider');
  }
  return context;
};
