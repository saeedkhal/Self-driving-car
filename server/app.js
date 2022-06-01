const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { EventEmitter } = require('events');
const { Server } = require('ws');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const emitter = new EventEmitter();
let server = express();
const { spawn } = require('child_process');
const python = spawn('python3', [__dirname, 'app.py']);
const { logger } = require('./logger');

server.use(cors());

server = server.listen(process.env.PORT || 80, () =>
  logger('INFO', 'Server', `Server started on port ${process.env.PORT || 80}`),
);

const ip = argv.ip || '';
const port = argv.port || '';
let takeScreenshot;

if (!ip || !port) {
  logger('ERROR', 'Server', 'Missing ip or port');
  process.exit(1);
}

const feedURL = `http://${ip}:${port}/shot.jpg`;

let mode = 'pilot';

let options = {
  responseType: 'arraybuffer',
  headers: {
    Accept: 'image/jpg',
  },
};

const sendImage = (image) => {
  python.stdin.write(image, (error) => {
    if (error) {
      logger('ERROR', 'Server', 'Error sending image to python');
    }
  });
};

function startAutoPilot() {
  takeScreenshot = setInterval(() => {
    axios
      .get(feedURL, options)
      .then((response) => {
        const image = new Buffer.from(response.data);
        sendImage(image);
        logger('INFO', 'Server', `Direction: ${direction}`);
      })
      .catch((err) => {
        logger('ERROR', 'Server', err);
      });
  }, 1000);
}

const wss = new Server({ server });

let chip = null;
const devices = [];

emitter.on('chipCall', (data) => {
  devices.forEach((device) => {
    try {
      device.send(data, { binary: false });
      logger('INFO', 'Master Sent', data);
    } catch (error) {
      logger('ERROR', 'Master Send', error);
    }
  });
});

emitter.on('sendDirections', (direction) => {
  if (chip) {
    chip.send(direction);
    logger('INFO', 'Master Recieved', direction);
  }
});

emitter.on('sendMode', (mode) => {
  if (chip) {
    chip.send(mode);
    logger('INFO', 'Master Recieved', mode);
  }
});

wss.on('connection', function connection(ws, req) {
  switch (req.url) {
    case '/master':
      chip = ws;
      chip.on('close', () => {
        logger('WARNING', 'Master', 'Master Closed');
        mode = 'pilot';
      });
      logger('INFO', 'Master', 'Master Connected');
      ws.on('message', function incoming(message) {
        logger('DATA', 'Master', message);
        try {
          emitter.emit('chipCall', message);
        } catch (error) {
          logger('ERROR', 'Master Data', 'Parsing JSON Data');
        }
      });
      break;
    case '/slave':
      logger('INFO', 'Slave', 'Slave Connected');
      devices.push(ws);
      ws.on('message', (message) => {
        message = message.toString();
        if (message === 'auto-pilot') {
          mode = 'auto-pilot';
          emitter.emit('sendMode', 'auto-pilot');
          logger('INFO', 'Slave', 'Auto Pilot Mode');
        } else if (message === 'pilot') {
          mode = 'pilot';
          emitter.emit('sendMode', 'pilot');
          logger('INFO', 'Slave', 'Pilot Mode');
          try {
            clearInterval(takeScreenshot);
          } catch {}
        } else {
          logger('INFO', 'Slave', 'Send Pilot Direction');
          emitter.emit('sendDirections', message);
        }
      });
      break;
  }
});

wss.on('error', (error) => {
  logger('ERROR', 'Server', error);
});

python.stdout.on('data', (direction) => {
  emitter.emit('sendDirections', direction);
});

python.stderr.on('data', (data) => {
  logger('ERROR', 'Child Process', data.toString());
});

python.on('close', () => {
  logger('WARNING', 'Child Process', 'Python Closed');
});
