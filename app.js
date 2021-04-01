const express = require('express');

const {WebClient} = require('@slack/web-api');
const {createEventAdapter} = require('@slack/events-api');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const botToken = process.env.BOT_TOKEN;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(botToken);

app.use('/slack/events', slackEvents.expressMiddleware());

app.get('/', (req, res) => {
res.send('place your order NOW!!!')
})

slackEvents.on('app_mention', (e) => {
    console.log(`Got message from villagers ${e.user}: ${e.text}`);
    
    (async () => {
        try {
         await slackClient.chat.postMessage({ channel: e.channel, text: `your order received!<@${e.user}>!`});
        } catch (error) {
            console.log(error.data);
        }
    })();
})
slackEvents.on('error', console.error);
app.listen(port, () => {
    console.log(`server started on ${port}`);
});