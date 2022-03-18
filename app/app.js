const express = require("express")
const authRouter = require("./routers/auth")
const mongoose = require("mongoose")
const dbURI1 = "mongodb://127.0.0.1:27017/authDB"

mongoose.connect(dbURI1, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection
    .once("open", () => {
        console.log("Auth database connected...");
    })
    .on("error", (error) => {
        console.log(error);
    })
    .on("disconnected", () => {
        console.log("Auth database disconnected...")
    })
process.on("SIGINT", async () => {
    await mongoose.connection.close()
    process.exit(0)
})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use("/auth", authRouter)

app.listen(5000, () => {
    console.log("Server listening to port at 5000...");
})