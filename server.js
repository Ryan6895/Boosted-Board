var massive = require('massive');
var connectionString = require("./config.js")
var config = require("./config.js")
var massiveInstance = massive.connectSync({
    connectionString: connectionString.connectionString
})
var Geocodio = require('geocodio');
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

app.use(session({
    secret: config.secret
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy(
    config.authConfig,
    function(accessToken, refreshToken, extraParams, profile, done) {
        db.Check_user([profile.identities[0].user_id], function(err, results) {
            if (!results[0]) {
                db.create_user([profile.name.givenName, profile.name.familyName, profile.identities[0].user_id, profile.picture_large], function(err, resu) {
                    console.log('User created Successfully');
                      console.log(resu);
                    db.order.insert([resu[0].userid], function(err, order) {
                        if (err) {
                            console.log('DB Create, durring user create: ', err);
                        }

                        resu[0].order_id = order[0].id;
                        return done(null, resu[0]);
                    })
                })
            } else {
                console.log('User found');
                console.log(results[0].userid);
                db.order.read_incomplete([results[0].userid], function(err, order) {
                    if (err) {
                        return console.log("Find User Auth, Order not found");
                    }
                    results[0].order_id = order[0].id
                    return done(null, results[0]);
                })
            }
        })
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

app.get('/auth/me', function(req, res, next) {
    if (!req.user)
        return res.status(200).send(false);

    return res.status(200).send(req.user);
})
// payment
app.post('/api/payment', function(req, res, next) {
    console.log(req.body);

    //convert amount to pennies
    const chargeAmt = req.body.amount;
    const amountArray = chargeAmt.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
        if (amountArray[i] === ".") {
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
        //res.sendStatus(200);

    });
      db.add_payment([req.body.amount, req.body.date, req.body.user.userid, req.body.active], function(err, results){
        if (err){
          console.error(err);
          return res.send(err);
        }
        res.send(results);
      })
});

app.get('/store/:item', mainCtrl.getItems)
app.get('/item/:itemid', mainCtrl.getOneItem)
app.put('/item', mainCtrl.changeQuantity)
app.put('/item/update', mainCtrl.updateQty)
app.get('/community', mainCtrl.getBlogs)
app.get('/blog/:blogid', mainCtrl.getOneBlog)
app.get('/getUser', function(req, res) {
    res.status(200).send(req.session)
})
app.post('/addemail', mainCtrl.addEmail)
app.post('/addtoCart', mainCtrl.addtoCart)
app.get('/cart', mainCtrl.getallcartItems)
app.delete('/cart', mainCtrl.removeItems)
app.get('/cartItems', mainCtrl.getcartItems)
app.get('/api/logout', function(req, res, next) {
   req.logout();
   return res.redirect('/');
});
app.get('/payments', mainCtrl.gettotalPayments)

app.listen(3000, function() {
    console.log("Successfully listening on : 3000")
})
