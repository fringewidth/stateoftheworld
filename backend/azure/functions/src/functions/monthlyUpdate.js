const { app } = require("@azure/functions");
const getMonthlyData = require("./historical/main.js");

app.timer("monthlyUpdate", {
  schedule: "0 0 1 * *",
  handler: async (myTimer, context) => {
    const date = new Date();
    let month = date.getMonth();
    const year = date.getFullYear();
    month = month === 0 ? 12 : month;
    await getMonthlyData(month, year, context);
    context.log("function has run");
  },
});
