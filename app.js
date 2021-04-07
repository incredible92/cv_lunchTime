const express = require('express');
const mongoose = require('mongoose');

const {WebClient} = require('@slack/web-api');
const {MongoClient} = require('mongodb')
const {createEventAdapter} = require('@slack/events-api');

const dotenv = require('dotenv');
dotenv.config();

const mongoPass = process.env.MONGO_PASS;
const mongoUser = process.env.MONGO_USER;
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.c9ynn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const app = express();
const router = express.Router();

const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const botToken = process.env.BOT_TOKEN;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(botToken);
const dbClient = new MongoClient(uri, { useNewUrlParser: true });

const users = {
    _id: Number,
    username: 'string',
    email: 'string',
    phoneNumber: Number
}

app.use('/slack/events', slackEvents.expressMiddleware());

app.get('/', (req, res) => {
res.send('place your order NOW!!!')
});

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
  });

const connection = mongoose.connection();
connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });


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
app.use("/", router);
slackEvents.on('error', console.error);
app.listen(port, () => {
    console.log(`server started on ${port}`);
});