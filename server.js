const express = require('express');
require('dotenv').config();

const router = require('./src/routers/routers.js')
const userRoutes = require('./src/routers/userRoute.js')

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('chris')
})


console.log(process.env.DB_USER)

app.use('/',router)
app.use(userRoutes)

const port = 5000;

app.listen(port, ()=>console.log(`Server is listening at port ${port}`));