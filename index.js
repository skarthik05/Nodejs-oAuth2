const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
app.use("/auth", require("./routes/auth"));
//Getting the current User
app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});