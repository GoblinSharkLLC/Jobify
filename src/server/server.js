const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const path = require('path')

if (process.env.NODE_env === "production") {
  app.use("/build", express.static(path.resolve(__dirname, "../../build")));

  app.get("/", (req, res) => {
    // console.log(req)
    return res.status(200).sendFile(path.resolve(__dirname, "../../index.html"))
  });
}
app.use('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, "../../index.html"))
})

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
})