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
