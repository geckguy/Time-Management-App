const express = require("express")
const router = express.Router()
const Auth = require("../schema and models/auth")

router.get("/users", async (req, res) => {
    try {
        const user = await Auth.find()
        res.json(user)
    }
    catch(err) {
        res.send("Error!")
        console.log(err);
    }
})

router.get("/signup", async (req, res) => {
    res.sendFile("/SIH'22/app/frontend/signup.html")
})
router.post("/signup", async (req, res) => {
    const user = new Auth({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    console.log("Username: " + user.username + ", Password: " + user.password)

    try {
        await user.save()
        res.send("User created!")
    }
    catch(err) {
        console.log(err)
    }
})

router.get("/login", async (req, res) => {
    res.sendFile("/SIH'22/app/frontend/login.html")
})
router.post("/login", async (req, res) => {
    try {
        await Auth.findOne({ username: req.body.username }, (error, data) => {
            if(error) {
                console.log(error)
            }
            if(req.body.password === data.password) {
                res.send("Success!")
            }
            else {
                res.sendFile("/SIH'22/app/frontend/login1.html")
            }
        })
            .clone()
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router