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
2. This application requires installation of node.js. Find the link for installation below:
```
https://nodejs.org/en/download/package-manager/
```
3. Run the following command in the local folder:
```
npm install
```
4. Define environment variables for your client id and client secret provided by FitPay: 
```
export CLIENT_ID="[clientId]"
export CLIENT_SECRET="[clientSecret]"
```
5. Run the following command in the folder to start the application:
```
node app.js
```
6. Visit desired routes in the browser or use curl commands in the terminal with optional filters to recieve your payload:
```
GET http://localhost:8080/compositeUsers/:userId?creditCardState=ACTIVE
GET http://localhost:8080/compositeUsers/:userId?deviceState=INITIALIZED
GET http://localhost:8080/compositeUsers/:userId?creditCardState=ERROR&deviceState=FAILED_INITILIZATION
```