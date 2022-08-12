const express = require("express");
const processorRoute = require("./routes/processor");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/", processorRoute);

app.listen(port, () => console.log(`Server started at port ${port}`));
