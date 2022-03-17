const logTime = () => {
  const now = new Date();
  const time = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return time;
};

const logger = (level, type, message) => {
  console.log(`[${logTime()}] - [${level}] - [${type}]: ${message}`);
};

module.exports = {
  logger,
};
