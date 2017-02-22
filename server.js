var massive = require('massive');
var connectionString = require("./config.js")
var config = require("./config.js")
var massiveInstance = massive.connectSync({connectionString : connectionString.connectionString})
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var bodyParser = require('body-parser');
var cors = require('cors');
var stripe = require('stripe')(config.STRIPE_KEYS.secretKey);

var app = module.exports = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cors());

var massiveServer = massive.connectSync({
  connectionString: connectionString
});
app.set('db', massiveServer);
var db = app.get('db');
var mainCtrl = require('./mainCtrl')

app.use(session({secret: config.secret}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy(
  config.authConfig
 ,function(accessToken, refreshToken, extraParams, profile, done) {
   db.Check_user([profile.identities[0].user_id], function(err, results){
     if (!results[0]){
       console.log('i will create here');
     }else{
       console.log(results[0])
     return done(null, results[0]);
   }
   })
   //console.log(profile.identities[0].user_id, profile.name.familyName, profile.name.givenName, profile.picture);

}));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: '/#!/payments',
  failureRedirect: '/auth'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/me', function(req,res,next){
  if (!req.user)
    return res.status(404).send('user not found');

  return res.status(200).send(req.user);
})
// payment
app.post('/api/payment', function(req, res, next){
  console.log(req.body);

  //convert amount to pennies
  const chargeAmt = req.body.amount;
  const amountArray = chargeAmt.toString().split('');
  const pennies = [];
  for (var i = 0; i < amountArray.length; i++) {
    if(amountArray[i] === ".") {
      if (typeof amountArray[i + 1] === "string") {
        pennies.push(amountArray[i + 1]);
      } else {
        pennies.push("0");
      }
      if (typeof amountArray[i + 2] === "string") {
        pennies.push(amountArray[i + 2]);
      } else {
        pennies.push("0");
      }
    	break;
    } else {
    	pennies.push(amountArray[i])
    }
  }
  const convertedAmt = parseInt(pennies.join(''));
  console.log("Pennies: ");
  console.log(convertedAmt);

  const charge = stripe.charges.create({
  amount: convertedAmt, // amount in cents, again
  currency: 'usd',
  source: req.body.payment.token,
  description: 'Test charge from Boosted project'
}, function(err, charge) {
     res.sendStatus(200);
  // if (err && err.type === 'StripeCardError') {
  //   // The card has been declined
  // }
});
});

app.get('/store/:item', mainCtrl.getItems)
app.get('/item/:itemid', mainCtrl.getOneItem)
app.get('/community', mainCtrl.getBlogs)
app.get('/blog/:blogid', mainCtrl.getOneBlog)
app.get('/getUser', function(req, res){res.status(200).send(req.session)})

app.listen(3000, function(){
  console.log("Successfully listening on : 3000")
})
