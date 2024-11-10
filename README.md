# Tesla IoT Project 🚗
<p align = "center">
    <img src="car.gif" />
</p>

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)

## Project Overview

This IoT project enhances a Tesla vehicle with two driving modes:
1. **Pilot Mode**: Allows manual control of the car through a mobile app.
2. **Autopilot Mode**: Enables self-driving using line detection technology, offering an autonomous experience on specific roads.

## Features

- **Pilot Mode**
  - Control car's speed, direction, and braking via mobile app.
  - Real-time telemetry data on app dashboard.

- **Autopilot Mode**
  - Line detection for autonomous navigation.
  - Automatic speed and lane adjustment based on road conditions.

## Technologies Used

- **Mobile App Framework**: [React Native]
- **Line Detection**: [OpenCV]
- **Programming Languages**: [Python, Node.js, Express.js, websocket]
- **Connectivity**: [ip webcam](https://play.google.com/store/apps/details?id=com.pas.webcam&hl=ar&gl=US)

## Setup & Installation

### Prerequisites

- Tesla car with supported IoT integration.
- Nodemcu8266 for WIFI and data comunication.
- Motor driver (H-Bridge)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/saeedkhal/Self-driving-car.git
   ```

2. Go to the project directory
    ```bash
    cd Self-driving-car
    ```

3. Go to the server directory

    ```bash
    cd server
    ```
4. Install dependencies

    ```bash
      npm install
    ```
  
5. Run IP webcam mobile app and replace xxxx:xxx:xxxx:xxx with your  ip address
    ```sh
      node app.js --ip xxxx:xxxx:xxxx:xxxx --port 8080
    ```

6. Go to the mobile App directory
    ```bash
      cd mobile
    ```

7. Install dependencies

    ```bash
      npm install
    ```
    
8. Run the mobileApp run:
    ```sh
      expo start 
    ```
