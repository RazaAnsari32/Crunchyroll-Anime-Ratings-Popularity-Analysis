import React, { useState } from 'react';
import {
  FileText,
  Printer,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Users,
  Code2,
} from 'lucide-react';
import { useAnimeData } from '../context/AnimeDataContext';
import { PROJECT_TEAM_MEMBERS } from '../types/anime';

export const ExperimentReportPage: React.FC = () => {
  const { dataset, metrics, clusteringResult } = useAnimeData();

  const handlePrint = () => {
    window.print();
  };

  const vivaQuestions = [
    {
      q: '1. What is the real-world application of this project?',
      a: 'This project enables streaming services like Crunchyroll, production studios, and licensing committees to perform audience segmentation, forecast content appeal, optimize catalog acquisitions, and design targeted recommendation engines based on empirical ratings and engagement clusters.',
    },
    {
      q: '2. Why was the selected Crunchyroll dataset suitable for the problem?',
      a: 'The Crunchyroll catalog dataset provides multi-dimensional metadata spanning continuous ratings, discrete community vote counts, multi-label genre tags, and temporal attributes. It encapsulates both critical appraisal (rating) and viral commercial reach (votes), making it ideal for unsupervised clustering.',
    },
    {
      q: '3. Which preprocessing techniques were used and why?',
      a: 'Key preprocessing techniques included: (1) Median imputation for missing ratings to avoid dropping valuable titles; (2) Duplicate hashing by title; (3) Logarithmic transformation log10(votes) to compress a 6-order-of-magnitude power-law distribution; (4) Min-Max feature scaling to [0, 1] to prevent distance metrics from being dominated by raw vote numbers.',
    },
    {
      q: '4. Why was K-Means clustering chosen instead of supervised learning?',
      a: 'Because anime popularity tiers and audience archetypes do not have predefined ground-truth labels in raw streaming catalogs. K-Means is an unsupervised learning algorithm that natively identifies natural cluster partitions and latent segments without requiring labeled training annotations.',
    },
    {
      q: '5. How does the frontend interact with the data science component?',
      a: 'The frontend architecture provides browser-based parsing via PapaParse, reactive statistical derivation in TypeScript, dynamic K-Means execution on normalized feature vectors, and responsive Recharts rendering. When exported to Antigravity, the clean data contracts allow seamless connection to Python Scikit-learn backends.',
    },
    {
      q: '6. What are the limitations and possible future improvements?',
      a: 'Current limitations include K-Means assuming spherical clusters and equal cluster variance, along with 2D feature projection. Future improvements involve high-dimensional TF-IDF plot embeddings, DBSCAN density-based noise filtering, Gaussian Mixture Models for soft clustering, and real-time sentiment analysis from user comments.',
    },
  ];

  return (
    <div className="space-y-6 pb-16 print:p-0 print:bg-white print:text-black">
      {/* College Lab Header Banner */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#15233D] print:border-none print:bg-white print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#15233D] pb-6 print:border-black">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 tracking-wider uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>St. Francis Institute of Technology (SFIT), Mumbai</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white print:text-black">
              Department of Information Technology
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 print:text-gray-700">
              Semester V (5th) · Course: INFT (IDS-1 LAB) · Mini Project
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1628] hover:bg-[#122340] border border-[#15233D] text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer self-start sm:self-auto print:hidden"
          >
            <Printer className="w-4 h-4 text-orange-400" />
            <span>Print Experiment Report</span>
          </button>
        </div>

        {/* Experiment Title Block */}
        <div className="pt-6">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 print:border-black print:text-black">
            EXPERIMENT NO. 10
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white print:text-black mt-2">
            To Implement Mini Project: Crunchyroll Anime Ratings and Popularity Analysis
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#122036] text-xs text-slate-400 print:text-gray-600 print:border-black">
            <div>
              <span className="block font-medium">Domain:</span>
              <span className="text-white print:text-black font-semibold">Data Science &amp; Unsupervised ML</span>
            </div>
            <div>
              <span className="block font-medium">Catalog Records:</span>
              <span className="text-white print:text-black font-semibold tabular-nums">{dataset.length.toLocaleString()}</span>
            </div>
            <div>
              <span className="block font-medium">Clustering Model:</span>
              <span className="text-white print:text-black font-semibold">K-Means (k=4)</span>
            </div>
            <div>
              <span className="block font-medium">Lab Status:</span>
              <span className="text-emerald-400 print:text-black font-semibold">Completed &amp; Validated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Team & Contributors Section (Matching Image 1) */}
      <div className="glass-panel rounded-2xl p-6 border border-[#15233D] print:border-black print:bg-white space-y-4">
        <div className="flex items-center gap-2 border-b border-[#15233D] pb-3 print:border-black">
          <Users className="w-5 h-5 text-orange-400 print:text-black" />
          <h3 className="font-display font-bold text-white print:text-black text-base">
            Project Team &amp; Contributors
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECT_TEAM_MEMBERS.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] print:bg-white print:border-black space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 font-mono font-bold text-xs flex items-center justify-center print:border print:border-black print:text-black">
                  {m.id}
                </span>
                <span className="text-[10px] font-mono text-slate-400 print:text-black font-semibold">
                  Roll No: {m.rollNo}
                </span>
              </div>
              <div>
                <h4 className="font-display font-bold text-white print:text-black text-sm">
                  {m.name}
                </h4>
                <span className="inline-block px-2 py-0.5 mt-1 rounded bg-[#101D36] text-[10px] font-semibold text-orange-300 print:text-black print:bg-gray-100">
                  {m.role}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 print:text-gray-700 leading-relaxed pt-2 border-t border-[#122036] print:border-gray-300">
                {m.contributions}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Report Body */}
      <div className="space-y-6 text-sm leading-relaxed text-slate-300 print:text-black">
        {/* 1. Problem Statement */}
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] print:border-none print:p-0 space-y-2">
          <h3 className="font-display font-bold text-white print:text-black text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs">1</span>
            Problem Statement
          </h3>
          <p>
            With the global explosion of anime streaming platforms, catalogs have expanded to tens of thousands of series across dozens of distinct genres. Platform distributors, licensing teams, and users face acute information overload: raw ratings alone fail to capture cultural reach, while raw view counts often favor older franchises regardless of contemporary critical quality. There is a need to systematically analyze, preprocess, and segment Crunchyroll anime metadata to uncover latent audience segments, genre dynamics, and popularity patterns.
          </p>
        </div>

        {/* 2. Aim of the Mini Project */}
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] print:border-none print:p-0 space-y-2">
          <h3 className="font-display font-bold text-white print:text-black text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs">2</span>
            Aim of the Mini Project
          </h3>
          <p>
            To apply end-to-end data science methodologies—including exploratory data analysis (EDA), data cleaning, logarithmic scaling, feature normalization, and unsupervised K-Means clustering—to Crunchyroll anime metadata, visualized through a high-performance web dashboard.
          </p>
        </div>

        {/* 3. Dataset Description */}
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] print:border-none print:p-0 space-y-3">
          <h3 className="font-display font-bold text-white print:text-black text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs">3</span>
            Dataset Description
          </h3>
          <p>
            The dataset encapsulates {dataset.length.toLocaleString()} Crunchyroll catalog records. Key attributes include:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>anime_id:</strong> Unique numeric identifier for catalog series indexing.</li>
            <li><strong>title:</strong> String representation of the official localized anime series name.</li>
            <li><strong>rating:</strong> Continuous metric bounded between 1.00 and 10.00 representing user sentiment score (Mean: {metrics.avgRating.toFixed(2)}).</li>
            <li><strong>votes:</strong> Discrete positive integer tracking total registered ratings submitted (Range: 100 to 4.5M+).</li>
            <li><strong>genres:</strong> Multi-label categorical delimiter-separated string specifying narrative themes ({metrics.totalGenres} unique tags).</li>
            <li><strong>type &amp; episodes:</strong> Broadcast classification (TV, Movie, OVA, Special) and episode counts.</li>
          </ul>
        </div>

        {/* 4. Theory / Background */}
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] print:border-none print:p-0 space-y-3">
          <h3 className="font-display font-bold text-white print:text-black text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs">4</span>
            Theory &amp; Theoretical Background
          </h3>
          <p>
            <strong>Exploratory Data Analysis (EDA):</strong> An analytical approach to summarize dataset characteristics visually before formal modeling. It identifies skewness, outlier frequencies, and bivariate relationships.
          </p>
          <p>
            <strong>K-Means Clustering:</strong> A centroid-based vector quantization method. Given a set of n observations, K-Means partitions them into k sets S = &#123;S₁, S₂, ..., Sₖ&#125; to minimize within-cluster sum of squares (WCSS).
          </p>
        </div>

        {/* 5. Post-Experiment Questions & Viva Voce Answers */}
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] print:border-none print:p-0 space-y-4">
          <h3 className="font-display font-bold text-white print:text-black text-base flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-400" />
            Post-Experiment Viva-Voce Questions &amp; Answers
          </h3>

          <div className="space-y-3">
            {vivaQuestions.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] print:bg-white print:border-black"
              >
                <h4 className="font-semibold text-white print:text-black text-xs sm:text-sm">
                  {item.q}
                </h4>
                <p className="text-xs text-slate-300 print:text-gray-800 mt-2 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Conclusion */}
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] print:border-none print:p-0 space-y-2">
          <h3 className="font-display font-bold text-white print:text-black text-base flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Conclusion
          </h3>
          <p>
            The mini project successfully realized an end-to-end data analytics and unsupervised clustering pipeline for Crunchyroll anime data. By performing exploratory analysis, log-normal transformations, and Min-Max scaling, K-Means clustering effectively segmented catalog entries into 4 actionable audience archetypes with an evaluated Silhouette score of {clusteringResult.silhouetteScore.toFixed(2)}. The interactive web frontend provides seamless dataset exploration, dynamic clustering, and clean interfaces ready for deployment on Vercel and extension in Google Antigravity.
          </p>
        </div>

        {/* 7. References */}
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] print:border-none print:p-0 space-y-2 text-xs">
          <h3 className="font-display font-bold text-white print:text-black text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            References
          </h3>
          <ol className="list-decimal pl-5 space-y-1 text-slate-400 print:text-gray-700">
            <li>Kaggle: Crunchyroll Anime Dataset (Scores, Popularity, Genres and Memberships).</li>
            <li>Lloyd, S. (1982). "Least squares quantization in PCM". IEEE Transactions on Information Theory, 28(2), 129–137.</li>
            <li>Rousseeuw, P. J. (1987). "Silhouettes: a graphical aid to the interpretation and validation of cluster analysis". Journal of Computational and Applied Mathematics.</li>
            <li>Syllabus: Department of Information Technology (INFT), St. Francis Institute of Technology (SFIT), Mumbai University. Semester V (5th) · Course: INFT (IDS-1 LAB).</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
