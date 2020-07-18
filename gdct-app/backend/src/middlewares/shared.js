export const addTokenToCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + 60 * 60 * 1000, // 1 hour
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('token', token, cookieOptions);
};

export const errorHandler = (err, req, res) => {
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
