# Server

The Server has three main roles:

- A websocket server between the ESP MCU and the Clients (Mobile Application)
- Sends a request to fetch an image from the live feed of the IP Webcam
- Apply line detection algorithms to the image and send the direction to the ESP MCU

## Tools & Packages

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [ws](https://www.npmjs.com/package/ws)
- [axios](https://www.npmjs.com/package/axios)
- [minimist](https://www.npmjs.com/package/minimist)
- [IP Webcam](https://play.google.com/store/apps/details?id=com.pas.webcam)

## Installation

inside the `server` folder run:

```sh
npm install
```

to run the server run:

```sh
node app.js --ip xxxx:xxxx:xxxx:xxxx --port 8080
```

where the xxxx:xxxx:xxxx:xxxx is the (dynamic or static) IP address of the mobile phone given by the network, and the server and mobile phone **must** be on the same network.
