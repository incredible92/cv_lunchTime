const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {WebClient} = require('@slack/web-api');
// const {MongoClient} = require('mongodb')
const {createEventAdapter} = require('@slack/events-api');

const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT || 3030;
const app = express();


const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const botToken = process.env.BOT_TOKEN;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(botToken);


// const dbClient = new MongoClient(uri, { useNewUrlParser: true })
// .then(() => {
//     const app = express()

//     app.listen(5000, () => {
//         console.log("Server has started!")
//     })
// });

const users = {
    username: 'string',
    email: 'string',
    comments: 'string',
    phoneNumber: Number
}

app.use('/slack/events', slackEvents.expressMiddleware());
app.use("/users", router);

app.get('/', (req, res) => {
res.send('place your order NOW!!!')
});

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) throw err;
      console.log("MongoDB connection established");
    }
  );
//   const connection = mongoose.connection;
// connection.once("open", function() {
//     console.log("MongoDB database connection established successfully");
//   });


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