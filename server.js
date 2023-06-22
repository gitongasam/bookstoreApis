const express = require('express');
require('dotenv').config();

const bookRouter = require("../bookstoreApis/src/routers/routers");
const userRoutes = require('./src/routers/userRoute.js');

const app = express();

app.use(express.json());
// app.use('/',router)
app.use("/",bookRouter)

app.get('/', (req, res) => {
  res.send('chris');
});

console.log(process.env.DB_USER);

// app.use('/books', router); // Add this line to use the router middleware for '/books' and other routes
app.use(userRoutes);

const port = 5002;

app.listen(port, () => console.log(`Server is listening at port ${port}`));
