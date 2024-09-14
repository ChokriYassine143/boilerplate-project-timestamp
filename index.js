// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  let newDate;
  
  // If no date is provided, use the current date
  if (!date) {
    newDate = new Date();
  } else if (!isNaN(date) && date.length === 13) {  // Check if the date is a UNIX timestamp in milliseconds
    newDate = new Date(parseInt(date));  // Parse as UNIX timestamp in milliseconds
  } else {
    newDate = new Date(date);  // Try to parse the string as a date
  }

  // Check if the date is invalid
  if (isNaN(newDate.getTime())) {
    return res.status(400).send({ error: "Invalid Date" });
  }

  // Return the UNIX timestamp (milliseconds) and UTC string
  res.send({
    unix: newDate.getTime(),  // UNIX timestamp in milliseconds
    utc: newDate.toUTCString()  // UTC string in the correct format
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
