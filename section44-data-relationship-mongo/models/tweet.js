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

    // const makeTweets = async () => {
    //     // const user = new User({ username: "Allen", age: 24});
    //     const user = await User.findOne({username: 'Allen'})
    //     const tweet2 = new Tweet({text: 'In 3 years I will be in the best position of my life through my God', likes: 3})
    //     tweet2.user = user;
    //     tweet2.save();
    // }

    // makeTweets();

    const findTweet = async () => {
        const t = await Tweet.find({}).populate('user',)
        console.log(t);
    }

    findTweet();