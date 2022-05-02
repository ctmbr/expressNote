const express = require('express');

const PORT = 3001;
const app = express();
const htmlRoutes = require('./routes/html_routes')
// const apiRoutes = require('./routes/api_routes')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(PORT, () => console.log(`Listening at ${PORT}`))