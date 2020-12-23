const express = require("express");
const cors = require("cors");
const lib = require('./routes/router');
const app = express();

app.use('/lib', lib);
app.get('/', (req, res) => {
  res.json({
    status: 200,
    msg: 'OK!'
  });
});


app.use((req, res, next) => res.status(403).json({status:403,msg:"not OK, 403 error"}));

app.listen(8080, () => {
  console.log('server started');
});