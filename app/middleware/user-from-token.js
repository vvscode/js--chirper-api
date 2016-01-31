var jwt = require('jwt-simple');

module.exports = function(req, res, next) {

  if (!req.token) {
    console.log('No request token presented');
    return next();
  }

  // Same secret code as we used before
  var secret = 's3cret_c0de';

  // Try to decode the token
  try {
    var claim = jwt.decode(req.token, secret);
    console.log('Request token:' + req.token);
    console.log('User Id:' + claim.userId);

    // Store the user in the request object if decoding was successful
    if (claim.userId) {
      req.user = claim.userId;
    }

    next();
  } catch (err) {
    console.log("Error decoding");
    next();
  }

}
