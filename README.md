# self-driving-car
car with two modes first pilot mode and second auto pilotmode.
1. pilot mode control the car from mobile app control panel.
2. auto pilot mode for self driving car based on line detection.
## requirement

* Nodemcu8266
* Car
* Motor driver (H-Bridge)

## Run Locally

Clone the project

```bash
  git clone https://github.com/saeedkhal/Self-driving-car.git
```

Go to the project directory

```bash
  cd Self-driving-car
```
Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```
Run IP webcam mobile app and replace xxxx:xxx:xxxx:xxx with your  ip 
- [ip webcam](https://play.google.com/store/apps/details?id=com.pas.webcam&hl=ar&gl=US)
Run the server run:
```sh
  node app.js --ip xxxx:xxxx:xxxx:xxxx --port 8080
```
Go to the mobile App directory

```bash
  cd mobile
```
Install dependencies

```bash
  npm install
```
Run the mobileApp run:
```sh
  expo start 
```
