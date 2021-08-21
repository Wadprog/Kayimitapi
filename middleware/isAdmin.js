function isAdmin(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.desiredPath = req.originalUrl;
    req.flash('error', 'You must be an admin and sign in to view this page');
    return res.redirect('/auth');
  }
  if (req.user.isAdmin) return next();

  req.flash('error', 'You must be an admin to view this page');
  return res.redirect('/');
}

module.exports = isAdmin;
