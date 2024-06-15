<h1 align="center"> State of the World <a href="https://stateoftheworld.vercel.app">[Live Link]</a> | <a href="https://drive.google.com/file/d/1O7H_h5-T2hSbDf5F3ZfJA5Sk2455sEJB/view?usp=sharing">[Demo Video]</a></h1>
<p align="center">
    <h3 align="center">Demo Screenshots</h3>
    <img src="images/d2.png" alt = "Main Page">
    <img src="images/d3.png">
    <img src="images/d4.png">

</p>
<h3 align = "center"> A one stop website to track the fight against climate change. </h3>
<p>
    <img src="images/bar.png">
</p>

## Contents

  <ol>
  <li><a href="#credits">Team Member Contributions</a></li>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#services">Azure Services Used</a></li>
    <li><a href="#Tech-Stack">Tech Stack</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#installation">Website Link</a></li>
  </ol>

  <p>
    <img src="images/bar.png">
</p>
<h2 id="credits">Team Member Contributions</h2>

"State of the World" was ideated, designed and developed by

### Dharmisht SVK [[dragn0id](https://github.com/dragn0id)]

- Tested the project throughout every stage of development
- Prepared Codebase for hosting
- Hosted Node.js server on **Azure App Services**
- Deployed the web app to Vercel

### Dhyaan Kotian[[Dhyaan1](https://github.com/Dhyaan1)]

- Developed the Website frontend UI and responsive design
- Developed the Website functionality to work smoothly with data fetched from **Azure CosmoDB**
- Trained and deployed the **Azure Language AI** custom classification model and created the API endpoints for it

### Hrishik Sai [[fringewidth](https://github.com/fringewidth)]

- Developed the main backend functionality, including data fetching through **Azure functions**, custom API endpoints, and the CosmosDB.
- Implemented all globes using Three.js
- Designed the Website UI
<p>
    <img src="images/bar.png">
</p>

<h2 id = "about-the-project"> About the Project</h2>
State of the World is a <b>Azure</b> + MERN App that visualizes climate change through country specific temperature anomalies, CO2 emissions, pollutant concentrations as well as news headlines for the top 15 global economies on a monthly basis.

<h2 id="overview">Overview</h2>
The project aims to fetch and display a number of climate change indicators for each country which includes annual CO2 emmissions of a country, as well as monthly average emissions of CO, NO2, SO2, and O3.
<br><br>
Additionally, the project displays the 10 most relevant climate change news articles per country on a monthly basis, classified into good or bad news via a custom-trained text-classification model.
<br><br>
The collected data is visualized on multiple 3D globes rendered on the website.
<br><br>
The colors on each component (either red, green or yellow) reflect the general conditions of each parameter.
<br><br>
<p>
    <img src="images/bar.png">
</p>

<h1 id="services"><b>Azure</b> Services Used</h1>

# Core <b>Azure</b> Services

## _I. <b>Azure</b> CosmosDB_

As the project requires to draw data on monthly news headlines and climate statistics of various countries, we chose <b>_Azure</b> CosmosDB for MongoDB_ to store this data in a NoSQL format in the cloud.

This data is queried by month every time a user requests it through the front end.

<img src="images/datasample.png"/>
<p align="center"><em>A screenshot of the <b>Azure</b> CosmosDB data explorer, showing a sample document</em></p>


We chose CosmosDB for MongoDB as we wanted real time fetching of data in a specific format(JSON) only.

<img src="images/cosmodbgraph.jfif">
<p align="center"><em>Stacks of <b>Azure</b> ComsmosDB instances</em></p>

## _II. Azure Functions_

To update the database with the complete statistics and headlines of the prior month, we leveraged the event driven nature of _<b>Azure</b> functions_, particularly the timer trigger.

We configured the data fetch functions to trigger on the 1st of every new month.

<img src="images/azurefunction.png">
<p align="center"><em>The main file of the <b>Azure</b> functions project, with the CRON timer trigger.</em></p>

<img src="images/azurefunction2.jfif">
<p align="center"><em> <b>Azure</b> Function App</em></p>

# <b>Azure</b> AI Service

## _<b>Azure</b> AI Language Service_

To estimate the overall sentiment of the monthly news headlines mined for each country, we utilised _Custom Text Classification_ of the <b>Azure</b> AI Language Suite. This involved manually labelling 930+ headlines as "Good News" or "Bad News", and training a custom text multilingual classification model on this dataset through the Language Studio UI.

The model achieved an F1 score of 84.95%.

<img src="images/aiaccuracy.png/">
<p align="center"><em>Performance of the model upon testing</em></p>

We used the <b>Azure</b> Language REST API to programmatically classify headlines that were mined on the fly before storing it in the database.

<img src="images/datalabelling.jfif">
<p align="center"><em>Data Labelling of data points</em></p>
<img src="images/deployingmodel.jfif">
<p align="center"><em>Deploying the AI Model</em></p>
<img src="images/goodornot.jfif">
<p align="center"><em>Blob Storage Container for training dataset</em></p>
<img src="images/apikeysendpoint.jfif">
<p align="center"><em>API keys and End Point for AI Model</em></p>

## Other <b>Azure</b> Technologies

### <b>Azure</b> App Service

<img src="images/webaps.png">
<img src="images/webaps2.png">
<p align="center"><em><b>Azure</b> Web App Deployment</em></p>

We deployed the backend server on <b>Azure</b> Web Apps from Node.js. Our backend server consisted of two custom API endpoints that we created for querying the [months data](https://sotwserver.azurewebsites.net/months/1/2024) from the database, as well as fetching [annual CO2 emissions](https://sotwserver.azurewebsites.net/co2) of countries.

These API endpoints are live at `https://sotwserver.azurewebsites.net/months/{month}/{year}`, and `https://sotwserver.azurewebsites.net/co2` respectively.

<img src="images/sotw.jfif">
<p align="center"><em> Deployed <b>Azure</b> Website Server</em></p>

_Note: The month data was only mined for the year 2024._

<h2 id="Tech-Stack">Tech Stack</h2>

The tech stack for the project includes:

- **MongoDB** as the database hosted through **Azure CosmosDB**
  **Node** and **Express** server backend deployed to **Azure Web Apps**.
- Serverless **Azure Functions** that are triggered every month for updating the database.
- **React** on the front end using **Three.js** for 3D rendering and **Tailwind** for styling, served deployed through **Vercel**.
  <!-- <p>
      <img src="images/cosmodbinstance.png">
  </p> -->
  <!-- <p>
      <img src="images/usi.png">
  </p> -->
  <h2 id="features">Features</h2>

1. Monthly temparature anomalies of countries are calculated from data obtained from the OpenWeatherMap [historical](https://openweathermap.org/history) and [accumulated parameters](https://openweathermap.org/api/accumulated-parameters) API.
1. Monthly average of CO, NO2, SO2 and O3 emissions of countries are calculated from the OpenWeather [air pollution](https://openweathermap.org/api/air-pollution) API.
1. Climate change news for each month is fetched via scraping advanced Google search results.
1. Classification of news headline done by a custom trained text classification Machine Learning algorithm implemented in the <b>Azure</b> AI Language Studio.
<p>
    <img src="images/aimodelresults.png">
</p>
<p>
    <img src="images/aimodelresults2.png">
</p>

1. This data is displayed intuitively on multiple globes we have devised for this project.
1. The data is updated automatically every month.
1. Additionally, the serverside code caches data received from the database for an hour, to prevent unnecessary database queries.
1. On the client side, the browser is set to cache data received for 12 hours.

<p>
    <img src="images/bar.png">
</p>

<h2 id="installation">Website Links</h2>

The website can be accessed at http://stateoftheworld.vercel.app/ <br>
The data can be accessed at https://sotwserver.azurewebsites.net/months/ ... followed by the required month and year
