<h1 align="center"> State of the World <a href="https://stateoftheworld.vercel.app">[Live Link]</a>

<h3 align="center"> A one-stop platform to track the global fight against climate change. </h3>

## Contents

1. [About The Project](#about-the-project)
2. [Architecture Overview](#architecture)
3. [Technology Stack](#tech-stack)
4. [Features](#features)
5. [Local Development](#installation)
6. [Deployment](#deployment)

---

<h2 id="about-the-project"> About the Project</h2>
**State of the World** is a modern serverless application that visualizes real-world climate data in real-time. It tracks temperature anomalies, CO2 emissions, and pollutant concentrations for the top 15 global economies, alongside sentiment-analyzed news headlines—all rendered on high-performance 3D globes.

<h2 id="architecture">Architecture Overview</h2>

The project has been migrated from a traditional Azure MERN stack to a **modern Serverless architecture** optimized for the Vercel ecosystem.

### 1. Serverless API (Vercel Functions)

The backend is now entirely serverless. Instead of a 24/7 running server, requests are handled by **Vercel Functions** (`/api`), reducing cost and increasing scalability.

- `/months/:month/:year`: Aggregates historical climate data.
- `/co2`: Returns global emission statistics.

### 2. Automated Data Pipeline (Vercel Cron)

A scheduled cron job runs on the 1st of every month to:

- Fetch daily temperature summaries via **OpenWeatherMap One Call 3.0**.
- Calculate monthly temperature anomalies against a 40-year statistical baseline.
- Scrape the latest climate news for each country.
- Run AI sentiment analysis on every headline.
- Store results in **MongoDB Atlas**.

### 3. Lightweight AI Sentiment Engine

We replaced the heavy Azure AI Language Service with a **custom-built Naive Bayes Sentiment Classifier**.

- **Dataset**: Trained on 1,000+ polarized samples from the [Climate Change News Dataset](https://www.kaggle.com/datasets/fringewidth/climate-change-news) on Kaggle.
- **Portability**: The model is stored as a 90KB JSON file, allowing it to run within serverless cold starts in milliseconds with ~72% accuracy.

<h2 id="tech-stack">Technology Stack</h2>

- **Frontend**: React, Vite, Three.js (for 3D Globes), TailwindCSS.
- **Backend**: Node.js, Vercel Serverless Functions.
- **Database**: MongoDB Atlas (Free Tier).
- **APIs**: OpenWeatherMap (One Call 3.0, Air Pollution, Geocoding).
- **AI/ML**: Custom Naive Bayes Classifier (JavaScript).
- **Deployment**: Vercel.

<h2 id="features">Features</h2>

- **Real-time 3D Visualization**: Interactive globes showing temperature shifts and pollutant density.
- **Precision Anomaly Data**: Uses One Call 3.0 `day_summary` to calculate exact monthly averages rather than estimated aggregates.
- **Smart News Feed**: Climate news is automatically scraped and analyzed to determine if the global sentiment is improving or declining.
- **Optimized for Free Tier**: Entirely built to run on the free tiers of Vercel and MongoDB Atlas.

<h2 id="installation">Local Development</h2>

### Prerequisites

- Node.js (v18+)
- A MongoDB Atlas connection string.
- An OpenWeatherMap API Key (One Call 3.0 subscription).

### Setup

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your `.env` file in the root:
   ```env
   MONGODB_STRING=your_mongodb_uri
   OWM_API_KEY=your_owm_key
   CRON_SECRET=your_random_string
   ```
4. Run the frontend:
   ```sh
   npm run build --workspace=frontend
   npm run start --workspace=frontend
   ```

<h2 id="deployment">Deployment</h2>

The project is pre-configured for **Vercel**.

- Simply connect your GitHub repository to Vercel.
- Set the `Output Directory` to `frontend/dist`.
- Set your Environment Variables in the Vercel dashboard.
- Vercel will automatically handle the build, the API routes, and the monthly Cron jobs via `vercel.json`.

---

<h2 id="credits">Original Credits</h2>
Ideated and developed by Hrishik Sai, Dhyaan Kotian, and Dharmisht SVK.
Refactored for Serverless & OWM 3.0 by ~~Hrishik Sai~~ (Gemini 3 Flash lmao).
