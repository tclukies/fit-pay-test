const express = require("express")
const app = express()
const port = 8080
const request = require("request-promise");
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

function giveMeAToken(){
    var options = { method: 'GET',
      url: 'https://auth.qa.fitpay.ninja/oauth/token',
      auth: {
          //pass this as env variable
          user: "plFYHKtt",
          pass: "5AditH9m"
      },
      //query string option
      qs: {
          grant_type: "client_credentials"
      },
      rejectUnauthorized: false
    };
    return request(options, function (error) {
      if (error) throw new Error(error);
    })
    .then(res => JSON.parse(res).access_token)
}

app.get("/", async (req, res) => {
    let token = await giveMeAToken()
    console.log("2" + token)
    //hit the oauth route



    
    //hit all three of routes with that oauth token
    //combine into one json


    
})


app.listen(port, () => {
    console.log("listening on port", port);
});
