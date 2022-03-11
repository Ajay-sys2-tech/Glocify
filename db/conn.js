const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log(`db connection succesfull`);
}).catch((e) => {
    console.log("no connection");
})