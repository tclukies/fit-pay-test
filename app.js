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
    let json   
    return request(options).then((error, response) => {
    // if (error) throw new Error(error);
        // console.log(error)
        // console.log(body)
        json = JSON.parse(response)
        console.log("1" + json.access_token)
        return json.access_token
    })

}

app.get("/", (req, res) => {
    let token = giveMeAToken()
    console.log("3" + token)
    //hard code client credentials to get auth token
    //hit the oauth route



    
    //hit all three of routes with that oauth token
    //combine into one json


    
})


app.listen(port, () => {
    console.log("listening on port", port);
});
