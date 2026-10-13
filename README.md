# Crunchyroll Anime Ratings and Popularity Analysis

A cinematic, anime-inspired exploratory data science web application for **Intelligent Data Systems 1 Lab — Experiment 10: To Implement Mini Project**, Department of Information Technology, **St. Francis Institute of Technology (SFIT)**, Mumbai.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Recharts**, and **PapaParse**.

---

## 👥 Project Team & Contributors
- **Manasvi Pawar** (Roll No: 51) — Team Lead & Project Architect
- **Gavin Sequeira** (Roll No: 52) — Lead Developer & ML Engineer
- **Raza Ansari** (Roll No: 53) — Algorithms & Clustering Lead
- **Sunil Lewis** (Roll No: 54) — Frontend & Visualization Lead

Department of Information Technology, **St. Francis Institute of Technology (SFIT)**, Mumbai.  
Course: **Intelligent Data Systems 1 Lab (ITL601) — Experiment 10: To Implement Mini Project**

---

## 🌟 Integrated Laboratory Modules (Experiments 1–10)
1. **Home (`/dashboard`)**: Full-width cinematic anime landscape hero, KPI cards, Recharts visualizations, and Project Team overview.
2. **Dataset (`/dataset`)**: Clean Crunchyroll catalog explorer with metadata inspection, search, and pagination.
3. **Preprocessing (`/preprocessing`)**: 6-step pipeline (schema coercion, median imputation, title deduplication, log10 scaling, Min-Max normalization).
4. **EDA (`/genres`)**: Exploratory data analysis with cross-genre ratings and volume comparisons.
5. **Statistics (`/statistics`)**: Experiment 05 — Hypothesis testing, Pearson correlation r, two-sample t-test, descriptive dispersion matrix.
6. **Regression (`/regression`)**: Experiment 06 — Linear regression continuous rating prediction with interactive score forecast and R², MAE, MSE.
7. **Classification (`/classification`)**: Experiment 07 — Logistic regression Hit / Top-Tier classification with 2x2 confusion matrix and live probability simulator.
8. **Clustering (`/clusters`)**: Experiment 08 — Unsupervised K-Means clustering ($k \in [2, 6]$), Silhouette score, and catalog archetypes.
9. **PCA (`/pca`)**: Experiment 09 — Principal component analysis, scree plot (86.5% variance explained), and 2D orthogonal projection.
10. **Study Path (`/study_path`)**: Experiment 04 — A* search graph traversal planning for optimal anime recommendation milestones.
11. **Experiment Report (`/report`)**: Complete official SFIT Experiment 10 report and Viva-Voce questions.

2. **Anime Explorer**:
   - Live catalog searching across titles.
   - Multi-genre filtering, minimum rating slider, vote count thresholds.
   - Grid and Table view modes.
   - Paginated display with modal inspection for synopsis, score breakdown, and cluster assignment.

3. **Genre Comparative Analytics**:
   - Cross-genre average rating rankings.
   - Catalog volume breakdown.
   - Deep dive inspector displaying top 5 canonical anime for each selected genre.

4. **K-Means Popularity & Rating Clusters**:
   - 2D feature space visualization using normalized Rating and Log10(Votes).
   - Interactive cluster parameter selector ($k \in [2, 6]$).
   - Cluster validation metrics: Inertia (SSE) and Silhouette Coefficient.
   - Archetype profiling: *Mainstream Blockbusters*, *Cult Classics*, *Popular Commercial Tier*, *Niche Catalog*, and *Polarizing Works*.

5. **Dataset Explorer & CSV Upload**:
   - Full drag-and-drop CSV upload with PapaParse.
   - Automated column mapping and data type inference.
   - Missing-value summary, duplicate detection, and schema table.
   - Filterable raw data preview with pagination.
   - Export processed data as CSV.

6. **Data Preprocessing Pipeline**:
   - Transparent 6-stage transformation pipeline:
     1. Data Ingestion & Schema Coercion
     2. Missing Value Imputation (Median substitution)
     3. Duplicate Record Elimination
     4. Logarithmic Transformation of Vote Counts
     5. Min-Max Feature Scaling $[0, 1]$
     6. Dense 2D Feature Vector Matrix Assembly

7. **Model Analysis**:
   - Mathematical justification of Lloyd's algorithm and WCSS objective function.
   - Interactive Elbow method line chart ($k=1$ to $8$) demonstrating optimal inflection point at $k=4$.
   - Feature scaling justification.
   - Model limitations and future enhancement roadmap.

8. **Experiment Report (Official SFIT Experiment 10 Guidelines)**:
   - Complete academic report covering Problem Statement, Aim, Dataset, Theory, Preprocessing, Visualizations, Model, Architecture, Code structure, Observations, Conclusion, and References.
   - Full Viva-Voce Questions and Answers.
   - Print / Export friendly formatting.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript
- **Bundler & Dev Server**: Vite
- **Styling**: Tailwind CSS, Glassmorphic CSS panels
- **Charts**: Recharts
- **Parsing**: PapaParse (Browser-side CSV parsing)
- **Icons**: Lucide React

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel

The application is 100% compatible with Vercel edge deployment:

1. Push this project to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Crunchyroll Anime Analysis"
   git branch -M main
   git remote add origin https://github.com/your-username/crunchyroll-anime-analysis.git
   git push -u origin main
   ```
2. Navigate to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Set the Framework Preset to **Vite**.
5. Click **Deploy**. Vercel will build and host your app on a free `.vercel.app` domain.

---

## 🔄 Google Antigravity Next Steps

To extend this frontend in Google Antigravity:
1. Export the project source code.
2. Open the repository in Google Antigravity.
3. Hook up any Python/Scikit-learn backend microservices or execute high-dimensional clustering with TF-IDF plot synopsis vectors in `src/services/dataService.ts`.
