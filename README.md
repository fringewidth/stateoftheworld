<h1 align = "center"> State of the World </h1>
<p align="center">
    <img src="images/state.png" alt = "Main Page">
</p>
<h3 align = "center"> A one stop website to track the fight against climate change. </h3>
<p>
    <img src="images/bar.png">
</p>

<h2 id = "contents"> Contents </h2>

<details open="open">
  <summary></summary>
  <ol>
    <li><a href="#about-the-project">  About The Project</a></li>
    <li><a href="#overview">  Overview</a></li>
    <li><a href="#project-structure">  Project Structure</a></li>
    <li><a href="#features">  Features</a></li>
    <li><a href="#installation">  Installation and Usage</a></li>
  </ol>
</details>

<p>
    <img src="images/bar.png">
</p>

<h2 id = "about-the-project"> About the Project</h2>
State of the World is a full stack React Web App that visualizes climate change through state specific greenhouse gas emissions amd pollutant concentrations for the top 15 global economies.
It acts as a hub of information regarding the overall conditions around the globe through news articles relating to the environment.

<h2 id="overview">Overview</h2>
The project aims to fetch and display a number of parameters for each country which includes monthly average emissions of:
<ul>
  <li>CO2</li>
  <li>NO2</li>
  <li>SO2</li>
  <li>O3</li>
</ul>
as well as 10 recent articles from each pertaining to climate change.<br><br>
It runs a classification model to obtain an overall sentiment rating for the article as well as the consolidated sentiment range as per all articles across a period of one month.The collected data is visualized via its representation on a 3-D globe rendered on the website.<br><br>
The colors on each component (either red, green or yellow) reflect the general conditions of each parameter relative to their past values (red depicting negative change, green indicating positve and yellow indicating a net value that is similar to the previous one)

<p>
    <img src="images/bar.png">
</p>

<h2 id="project-structure">Project Structure</h2>

The project is divided into three main directories:

- `backend/`: Contains the server-side code, including Azure functions and API routes.
- `frontend/`: Contains the client-side code, including React components and utility functions.
- `shared/`: Contains shared resources, such as JSON data files.

The tech stack for the project includes:

- Azure Cosmos DB running MongoDB for backend server object representation.</li>
<p>
    <img src="images/cosmodbinstance.png">
</p>
- Node-Express server backend hosted on Azure Web Apps part of the Azure App Service.</li>
- Azure Functions that run in the backend for running serverless event-driven computations every month.</li>
<p>
    <img src="images/azurefunction.png">
</p>
- Node runtime environment running the React App hosted on Vercel as the frontend component.</li>
<p>
    <img src="images/usi.png">
</p>

<p>
    <img src="images/bar.png">
</p>

<h2 id="features"> Features</h2>

- Monthly temparature anomalies of countires are calculated from data obtained from <a href=https://openweathermap.org/api> OpenWeather</a> historical and accumulated parameters API.
- Monthly average of CO, NO2, SO2 and O3 emissions of countries are calculated from the OpenWeather pollution API.
- Climate change news for each month is fetched via scraping Google search results and filtering out the best fitting articles.
- Classification of news headline done by a custom trained text classification Machine Learning algorithm implemented in the Azure Language Studio.
<p>
    <img src="images/aimodelresults.png">
</p>

<p>
    <img src="images/bar.png">
</p>

<h2 id="installation"> Installation and Usage</h2>

The website can be accessed at http://stateoftheworld.vercel.app/ <br>
The data can be accessed at https://sotwserver.azurewebsites.net/months/ ... followed by the required month and year

You can also build the website from source locally:

1. Clone the repository.
2. Install the dependencies in the root directory, frontend, and backend:

```sh
npm install
cd frontend && npm install
cd ../backend && npm install
```

To start the frontend development server:

```sh
cd frontend && npm run dev
```

To start the backend server:

```sh
cd backend && node index.js
```
