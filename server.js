const express = require("express");
const dotenv = require("dotenv");


dotenv.config({path:"config.env"});

const app = express();
app.use(express.json())
const port = process.env.PORT || 3002;

app.use(require("./routes/email"))

app.get("/", (req, res)=>{
    res.send("Lets Send Email")
})

app.listen(port, ()=>{
    console.log("APP LISTENING AT PORT "+ port);
})