/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimeDataProvider, useAnimeData } from './context/AnimeDataContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { AnimeDetailModal } from './components/anime/AnimeDetailModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { DatasetExplorerPage } from './pages/DatasetExplorerPage';
import { DataPreprocessingPage } from './pages/DataPreprocessingPage';
import { GenreAnalysisPage } from './pages/GenreAnalysisPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { RegressionPage } from './pages/RegressionPage';
import { ClassificationPage } from './pages/ClassificationPage';
import { PopularityClustersPage } from './pages/PopularityClustersPage';
import { PcaPage } from './pages/PcaPage';
import { StudyPathPage } from './pages/StudyPathPage';
import { AboutPage } from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { activeTab, selectedAnime, setSelectedAnime } = useAnimeData();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'dataset':
        return <DatasetExplorerPage />;
      case 'preprocessing':
        return <DataPreprocessingPage />;
      case 'genres':
        return <GenreAnalysisPage />;
      case 'statistics':
        return <StatisticsPage />;
      case 'regression':
        return <RegressionPage />;
      case 'classification':
        return <ClassificationPage />;
      case 'clusters':
        return <PopularityClustersPage />;
      case 'pca':
        return <PcaPage />;
      case 'study_path':
        return <StudyPathPage />;
      case 'about':
      case 'report':
        return <AboutPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050B18] text-slate-100 flex">
      {/* Sidebar Navigation matching Image 2 */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0">
        {/* Sticky Top Navbar */}
        <TopNavbar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Anime Detail Modal */}
      <AnimeDetailModal
        anime={selectedAnime}
        onClose={() => setSelectedAnime(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AnimeDataProvider>
      <AppContent />
    </AnimeDataProvider>
  );
}
