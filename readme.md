# FitPay Composite API

## Overview
This project combines the following API endpoints:
```
GET https://api.qa.fitpay.ninja/users/:userId
GET https://api.qa.fitpay.ninja/users/:userId/devices
GET https://api.qa.fitpay.ninja/users/:userId/creditCards
```
into one API endpoint found at: 
```
GET http://localhost:8080/compositeUsers/:userId
```

## Instructions

1. Clone this repository 
2. Run the following command in the local folder:
```
npm install
```
3. Input ENV variables for your client id and client secret provided by FitPay: 
```
ENV_clientCredentials = {CLIENT_ID:CLIENT_SECRET}
```
4. Run the following command in the fold to start the application:
```
node app.js
```
5. Visit desired routes in the browser with optional filters to recieve a payload:
```
GET http://localhost:8080/compositeUsers/:userId?creditCardState=ACTIVE
GET http://localhost:8080/compositeUsers/:userId?deviceState=INITIALIZED
GET http://localhost:8080/compositeUsers/:userId?creditCardState=ERROR&deviceState=FAILED_INITILIZATION
```