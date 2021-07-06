const logger = (req, res, next) => {
  console.log(`Request Entry Time : ${new Date().toISOString()}: ${req.originalUrl}`);
  next();
  console.log(`Request Exit Time :  ${new Date().toISOString()}: ${req.originalUrl}`);
};
export default logger;
