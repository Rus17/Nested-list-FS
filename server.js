//server.js
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()   // Переменная, которая будет нашим сервером

//== Подключаемся к нашей БД. БД создастся автоматически ====
mongoose.connect("mongodb://localhost/ListItemDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err))

app.use(bodyParser.json())
app.use("/api", require("./api"))   //для тех запросов, которые будут обращены к "/api" сработает перенаправление на api.js

app.listen(4000, () => {
  console.log("Server is listening")
})