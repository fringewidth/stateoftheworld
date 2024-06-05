const { app } = require('@azure/functions');

app.timer('monthlyUpdate', {
    schedule: '0 30 9 * Jan Mon',
    handler: (myTimer, context) => {
        context.log('Timer function processed request.');
    }
});
