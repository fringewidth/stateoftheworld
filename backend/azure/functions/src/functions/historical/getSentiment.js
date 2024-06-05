const API_KEY = process.env.AZURE_LANGUAGE_KEY;

async function getSentiment(headlines) {
  let delay = 2000;
  const data = {
    displayName: "Classifying documents",
    analysisInput: {
      documents: headlines.map((headline, index) => ({
        id: index + "",
        language: "en",
        text: headline,
      })),
    },
    tasks: [
      {
        kind: "CustomSingleLabelClassification",
        taskName: "Single Classification Label",
        parameters: {
          projectName: "GoodOrBadClimateNews",
          deploymentName: "production",
        },
      },
    ],
  };

  const header = {
    "Ocp-Apim-Subscription-Key": API_KEY,
  };

  const url =
    "https://newclimateanalysis.cognitiveservices.azure.com/language/analyze-text/jobs?api-version=2022-05-01";

  let response = await fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", ...header },
  });

  if (!response.ok) {
    // console.log(
    // `Error with status code ${response.status} \nHeader: ${JSON.stringify(
    // response.headers
    // )}\nMessage: ${await response.text()}`
    // );
  }

  const oploc = response.headers.get("operation-location");
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let json;
  do {
    await sleep(delay);
    const res = await fetch(oploc, { headers: header });
    json = await res.json();
    delay *= 2;
  } while (json.status !== "succeeded");

  const sentiments = json.tasks.items[0].results.documents.map((doc) => {
    const classified = doc.class[0];
    return classified.category === "Positive"
      ? 1
      : -1 * classified.confidenceScore;
  });

  return sentiments;
}

module.exports = getSentiment;
