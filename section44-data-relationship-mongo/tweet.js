const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/relationshipDemo')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});

    const userSchema = new Schema({
        username: String,
        age: Number
    })

    const tweetSchema = new Schema({
        text: String,
        likes: Number,
        user: {type: Schema.Types.ObjectId, ref: 'User'}
    })


    const User = mongoose.model('User', userSchema);
    const Tweet = mongoose.model('Tweet', tweetSchema);

    const makeTweets = async () => {
        const user = new User({ username: "Allen", age: 24});
        const tweet1 = new Tweet({text: 'This is not the end it is the beginning', likes: 2028})
        tweet1.user = user;
        user.save();
        tweet1.save();
    }