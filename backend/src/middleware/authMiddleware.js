const guestUserId = String(process.env.GUEST_USER_ID || "1");

module.exports = (req, res, next) => {
  req.user = { id: guestUserId };
  return next();
};