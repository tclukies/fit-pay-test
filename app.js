const express = require("express");
const app = express();
const port = 8080;
const request = require("request-promise");
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

function giveMeAToken() {
    var options = {
        method: "GET",
        url: "https://auth.qa.fitpay.ninja/oauth/token",
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
    return request(options, function(error) {
        if (error) throw new Error(error);
    }).then(res => JSON.parse(res).access_token);
}

app.get("/compositeUsers/:userId", async (req, res) => {
    let token = await giveMeAToken();
    let compositeObject = {};
    // console.log("2" + token);
    //hit the oauth route
    var options = {
        method: "GET",
        url: "https://api.qa.fitpay.ninja/users/" + req.params.userId,
        headers: {
            Authorization: "Bearer " + token
        },
        rejectUnauthorized: false
    };

    await request(options, function(error, response, body) {
        if (error) throw new Error(error);

        // console.log(body);
        compositeObject = { ...compositeObject, userInfo: JSON.parse(body) };
        // console.log(compositeObject)
    });

    var options = {
        method: "GET",
        url:
            "https://api.qa.fitpay.ninja/users/" +
            req.params.userId +
            "/devices",
        headers: {
            Authorization: "Bearer " + token
        },
        rejectUnauthorized: false
    };

    await request(options, function(error, response, body) {
        if (error) throw new Error(error);

        // console.log(body);
        compositeObject = { ...compositeObject, devices: JSON.parse(body) };
    });

    var options = {
        method: "GET",
        url:
            "https://api.qa.fitpay.ninja/users/" +
            req.params.userId +
            "/creditCards",
        headers: {
            Authorization: "Bearer " + token
        },
        rejectUnauthorized: false
    };

    await request(options, function(error, response, body) {
        if (error) throw new Error(error);
        compositeObject = { ...compositeObject, creditCards: JSON.parse(body) };
    });
    if (req.query.creditCardState && req.query.deviceState) {
        compositeObject.creditCards.results = compositeObject.creditCards.results.filter(
            e => e.state === req.query.creditCardState
        );
        compositeObject.devices.results = compositeObject.devices.results.filter(
            e => e.state == req.query.deviceState
        );
        res.send(compositeObject);
    } else if (req.query.creditCardState) {
        compositeObject.creditCards.results = compositeObject.creditCards.results.filter(
            e => e.state === req.query.creditCardState
        );
        res.send(compositeObject);
    } else if (req.query.deviceState) {
        compositeObject.devices.results = compositeObject.devices.results.filter(
            e => e.state === req.query.deviceState
        );
        res.send(compositeObject);
    } else {
        res.send(compositeObject);
    }
});

app.listen(port, () => {
    console.log("listening on port", port);
});
