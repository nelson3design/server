
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require("cors");
const path = require('path')
const cookieParser = require("cookie-parser");
app.use(cors({
    origin: "*"
}))

// app.use(
//     cors({
//         origin: ["http://localhost:3000"],
//         methods: ["GET", "POST"],
//         credentials: true,
//     })
// );

app.use(cookieParser());
app.use('/', express.static(path.resolve(__dirname, "uplaod")))

var router = require('./router')


const port = process.env.PORT || 4000

app.set('view engine', 'ejs');


app.use(express.static('upload'))


app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/', router);


const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS


mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.4qiexfi.mongodb.net/?retryWrites=true&w=majority`).then(() => {

    app.listen(port, () => {
        console.log(`api rodando na porta ${port}`)
    })

}).catch((error) => console.log(error))


