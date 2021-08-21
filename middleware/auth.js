function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.desiredPath = req.originalUrl
    req.flash('error', 'You must be signed in to view this page')
    return res.redirect('/auth')
  }
  return next()
}

module.exports = isLoggedIn
