require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json())

const CRUD = require("./routes/CRUD")

const PORT = process.env.PORT || 3500;

app.use("/", CRUD)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
