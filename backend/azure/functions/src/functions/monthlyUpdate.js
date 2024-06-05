const { app } = require("@azure/functions");
const getMonthlyData = require("./historical/main.js");

app.timer("monthlyUpdate", {
  schedule: "0 0 1 * *",
  handler: async (myTimer, context) => {
    const date = new Date();
    const month = date.getMonth() === 0 ? 12 : date.getMonth();
    const year = date.getFullYear();
    await getMonthlyData(month, year, context);
    context.log(`Data updated for ${month}/${year}`);
  },
});
