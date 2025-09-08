// utils/ExpressError.js
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message; // Explicitly setting message (optional)
    this.statusCode = statusCode;
  }
}

module.exports= ExpressError;