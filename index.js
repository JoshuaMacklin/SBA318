require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
// const usersRouter = require("./routes/users")
// const postsRouter = require("./routes/posts");
// const adminsRouter = require("./routes/admins")
const adminData = require('./data/admins')
const userData = require('./data/users')
const postData = require('./data/posts')



const path = require('path');

const morgan = require('morgan');
const cors = require('cors')


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// app.get('/', function(req, res) {
//   res.render("hi");
// });

app.get('/', (req, res) => {
  const data = { title: 'Express.js Template Engine', message: `Welcome to our website!`, adminData, userData, postData };
  res.render(`index`, data);
});
  

// app.use("/api/users", usersRouter)
// app.use("/api/posts", postsRouter)
// app.use("/api/admins", adminsRouter);

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.use(morgan('dev'))
app.use(cors())


// 404 Error Handling Middleware
// Custom 404 (not found) middleware.
// Since we place this last, it will only process
// if no other routes have already sent a response!
app.use((err, req, res, next) => {
  res.status(404).json({ error: err })
})


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})


