import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  // try...catch allows us to handle unauthenticated requests in a custom way
  try {
    const { session } = req.cookies;

    const payload = jwt.verify(session, process.env.APP_SECRET);

    req.user = payload;
    next();
  } catch (err) {
    // Set the appropriate HTTP status code if unauthenticated
    err.status = 401;

    // And provide a message to the user
    err.message = 'You must be logged in to continue';

    // Then send the customized error to the error handling middleware
    next(err);
  }
}
