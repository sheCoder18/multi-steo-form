const express = require("express");
const cors = require("cors");
const {mongoose} = require("mongoose");
const FormEntry = require('./models/User')


const app = express();
app.use(express.json());

mongoose
.connect('mongodb://127.0.0.1:27017/form')
.then(()=> console.log("Database is connected"))
.catch((err)=> console.log("Database is not connected", err))

app.use(cors());

app.get('/test', (req, res)=> {
    res.json('Test Works')
});

// Register Route
app.post('/register', async (req, res) => {
    const { username, email, password, firstName, lastName, address, phone, food} = req.body
    try {
        const userInfo = await FormEntry.create({
            username,
            email,
            password,
            firstName,
            lastName,
            address,
            phone, 
            food
        })
        res.json(userInfo)
    } catch (error) {
        res.status(422).json(error)
    }
})


app.listen(4000);