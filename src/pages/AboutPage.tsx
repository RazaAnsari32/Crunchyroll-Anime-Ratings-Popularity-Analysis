import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Code2,
  Workflow,
  Globe,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Award,
  Users,
  Compass,
  Boxes,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react';
import { PROJECT_TEAM_MEMBERS } from '../types/anime';
import { useAnimeData } from '../context/AnimeDataContext';

export const AboutPage: React.FC = () => {
  const { dataset, setActiveTab } = useAnimeData();

  const experimentsList = [
    {
      exp: 'Exp 01 & 02',
      title: 'Dataset Ingestion & Preprocessing',
      desc: 'Cleaning animes.csv, handling null values, deduplicating indices, and log10 scaling skewed vote distributions.',
      tab: 'preprocessing',
    },
    {
      exp: 'Exp 03',
      title: 'Exploratory Data Analysis (EDA)',
      desc: 'Evaluating multi-label genre distributions, catalog volume, and rating density curves.',
      tab: 'genres',
    },
    {
      exp: 'Exp 04',
      title: 'Heuristic A* Search Path Planning',
      desc: 'Optimized curriculum and recommendation progression using f(n) = g(n) + h(n).',
      tab: 'study_path',
    },
    {
      exp: 'Exp 05',
      title: 'Descriptive Statistics & Correlation',
      desc: 'Measuring central tendency, skewness, Pearson correlation (r = 0.54) between score and vote volume.',
      tab: 'statistics',
    },
    {
      exp: 'Exp 06',
      title: 'Regression & Rating Estimation',
      desc: 'Ordinary Least Squares & Ridge regression modeling to predict user satisfaction.',
      tab: 'regression',
    },
    {
      exp: 'Exp 07',
      title: 'Popularity Classification Models',
      desc: 'Binary & multi-class classification into Popularity Tiers with precision, recall, and ROC analysis.',
      tab: 'classification',
    },
    {
      exp: 'Exp 08',
      title: 'K-Means Catalog Clustering',
      desc: 'Segmenting anime into 3 cohesive cohorts with Lloyd’s algorithm, Elbow WCSS curve, and Silhouette validation.',
      tab: 'clusters',
    },
    {
      exp: 'Exp 09',
      title: 'Principal Component Analysis (PCA)',
      desc: 'Dimensionality reduction projecting 8 multi-dimensional anime features onto PC1 and PC2 axes.',
      tab: 'pca',
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Project</span>
        <span>&gt;</span>
        <span className="text-white font-medium">About &amp; Institutional Documentation</span>
      </div>

      {/* Main Bold Heading */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5 mb-2">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            About Project: Crunchyroll Anime Ratings &amp; Popularity Analysis
          </h1>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            Mini Project
          </span>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            Semester V (5th) · Course: INFT (IDS-1 LAB)
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-4xl">
          Comprehensive documentation for Mini Project under Semester V (5th), Course: INFT (IDS-1 LAB), Department of Information Technology (INFT), St. Francis Institute of Technology (SFIT), Mumbai.
        </p>
      </div>

      {/* Institutional Profile Card */}
      <div className="glass-panel rounded-2xl p-6 border border-[#1E3052] bg-gradient-to-br from-[#0B1628] via-[#0A1224] to-[#070E1E] space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#15233D] pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F47521] via-amber-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-display font-bold text-white">
                St. Francis Institute of Technology (SFIT)
              </h2>
              <p className="text-xs sm:text-sm text-orange-400 font-medium">
                Department of Information Technology (INFT) · Mount Poinsur, Borivali (W), Mumbai
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-[#070E1E] border border-[#1A2C4C] text-slate-200 font-mono font-medium">
              Course: INFT (IDS-1 LAB)
            </span>
            <span className="px-3 py-1 rounded-xl bg-orange-950/40 border border-orange-800/40 text-orange-300 font-semibold">
              Semester V (5th)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
          <div className="p-3.5 rounded-xl bg-[#070E1E]/80 border border-[#15233D] space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
              Experiment Title
            </span>
            <p className="text-slate-200 font-medium">
              Experiment 10: To Implement Mini Project
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#070E1E]/80 border border-[#15233D] space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
              Project Domain
            </span>
            <p className="text-slate-200 font-medium">
              Intelligent Data Mining, Statistical Inference &amp; Clustering
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-[#070E1E]/80 border border-[#15233D] space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase tracking-wider">
              Catalog Scope
            </span>
            <p className="text-slate-200 font-medium">
              {dataset.length.toLocaleString()} Crunchyroll Anime Records (animes.csv)
            </p>
          </div>
        </div>
      </div>

      {/* Project Group Members Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg sm:text-xl font-display font-bold text-white">
              Project Group Members &amp; Leadership
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Semester V (5th) · Course: INFT (IDS-1 LAB) · SFIT Mumbai
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECT_TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="glass-panel rounded-2xl p-5 border border-[#1A2C4C] hover:border-orange-500/40 transition-all space-y-3 bg-[#0B1628]/90 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F47521] to-[#FF8C42] flex items-center justify-center font-display font-bold text-sm text-white shadow-md shadow-orange-500/20">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-orange-400 font-bold bg-orange-950/40 px-2 py-0.5 rounded border border-orange-800/40">
                    Roll: {member.rollNo}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-white text-base group-hover:text-orange-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-orange-300 font-medium mt-0.5">
                  {member.role}
                </p>
              </div>

              <div className="pt-2 border-t border-[#15233D]">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                  Core Responsibility:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {member.contributions}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Abstract & Problem Statement Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-3">
          <div className="flex items-center gap-2 text-white font-display font-bold text-base">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <h3>Project Abstract &amp; Motivation</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Streaming platforms like Crunchyroll host tens of thousands of anime titles spanning divergent genres, release eras, formats, and viewer demographics. Understanding what drives higher viewer satisfaction, viewer community engagement, and cross-genre resonance requires systematic data science exploration.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            This mini-project synthesizes data preprocessing, exploratory data analysis (EDA), heuristic path finding, inferential statistics, regression, classification, and unsupervised K-Means clustering into an interactive visual platform for student researchers, academic reviewers, and data analysts.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-3">
          <div className="flex items-center gap-2 text-white font-display font-bold text-base">
            <Award className="w-4 h-4 text-emerald-400" />
            <h3>Key Objectives</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Catalog Cleaning &amp; Feature Scaling:</strong> Ingest real Crunchyroll attributes, resolve missing rating indicators, and scale skewed vote counts via log10 transforms.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Clustering &amp; Cohort Discovery:</strong> Unsupervised K-Means segmentation (k=3) identifying Blockbuster Legends, Mainstream Solid Performers, and Niche Cult Works.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Interactive Curriculum &amp; Search:</strong> Provide an A* Heuristic Study Path and responsive search across canonical anime entries.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Experiments Architecture Matrix */}
      <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
        <div className="flex items-center justify-between border-b border-[#15233D] pb-3">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-purple-400" />
            <h3 className="font-display font-bold text-white text-base">
              IDS-1 Lab Experiments Suite (Exp 01 to Exp 10)
            </h3>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Click any experiment to open its interactive module
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {experimentsList.map((item) => (
            <div
              key={item.exp}
              onClick={() => setActiveTab(item.tab)}
              className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] hover:border-orange-500/50 hover:bg-[#0E1C33] cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  {item.exp}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-orange-400 transition-colors" />
              </div>
              <h4 className="font-semibold text-xs text-white group-hover:text-orange-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack & Workflow */}
      <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-orange-400" />
          <h3 className="font-display font-bold text-white text-base">
            Technology Stack &amp; Implementation Architecture
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#070E1E] border border-[#15233D] text-center space-y-1">
            <span className="font-bold text-white block">React 19</span>
            <span className="text-[10px] text-slate-400">UI Component Tree</span>
          </div>
          <div className="p-3 rounded-xl bg-[#070E1E] border border-[#15233D] text-center space-y-1">
            <span className="font-bold text-white block">TypeScript</span>
            <span className="text-[10px] text-slate-400">Strict Type Safety</span>
          </div>
          <div className="p-3 rounded-xl bg-[#070E1E] border border-[#15233D] text-center space-y-1">
            <span className="font-bold text-white block">Tailwind CSS</span>
            <span className="text-[10px] text-slate-400">Glassmorphism UI</span>
          </div>
          <div className="p-3 rounded-xl bg-[#070E1E] border border-[#15233D] text-center space-y-1">
            <span className="font-bold text-white block">Recharts</span>
            <span className="text-[10px] text-slate-400">Vector SVG Graphics</span>
          </div>
          <div className="p-3 rounded-xl bg-[#070E1E] border border-[#15233D] text-center space-y-1">
            <span className="font-bold text-white block">PapaParse</span>
            <span className="text-[10px] text-slate-400">RFC-4180 CSV Engine</span>
          </div>
          <div className="p-3 rounded-xl bg-[#070E1E] border border-[#15233D] text-center space-y-1">
            <span className="font-bold text-white block">Vite 8</span>
            <span className="text-[10px] text-slate-400">High-Speed Bundler</span>
          </div>
        </div>
      </div>
    </div>
  );
};
