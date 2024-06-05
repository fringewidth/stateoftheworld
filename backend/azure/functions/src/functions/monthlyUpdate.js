const { app } = require("@azure/functions");

app.timer("monthlyUpdate", {
  schedule: "0 0 1 * *",
  handler: (myTimer, context) => {
    context.log("Timer function processed request.");
  },
});
