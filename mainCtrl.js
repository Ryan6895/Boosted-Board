var app = require('./server');
var db = app.get('db');

module.exports = {
  getItems: function(req, res){
    db.get_items([req.params.item], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  getOneItem: function(req, res){
    db.get_oneitem([req.params.itemid], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  getBlogs: function(req, res){
    db.get_blogs(function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  getOneBlog: function(req, res){
//    console.log('hello' , req.params);
    db.get_oneblog([req.params.blogid], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  addEmail: function(req, res){
    db.add_email([req.body.email], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  addtoCart: function(req,res){
    db.add_toCart([req.user.order_id, req.body.product, 1], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  getcartItems: function(req, res){
    db.order.get_cartItems([req.query.id],function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  getallcartItems: function(req, res){
    db.order.get_allcartitems([req.user.userid, req.user.order_id],function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  removeItems: function(req, res){
    db.order.delete_cartitem([req.query.id], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  changeQuantity: function(req, res) {
    db.order.update_quantity([req.query.id], function(err, results){
        if (err){
          console.error(err);
          return res.send(err);
        }
        res.send(results);
      })
  },
   checkCart: function(req, res){
   db.order.check_cart([req.body.id], function(err, results){
     if (err){
       console.error(err);
       return res.send(err);
     }
     res.send(results);
   })
 },
 gettotalPayments: function(req, res){
   console.log(req.user.userid);
 db.get_totalpayments([req.user.userid], function(err, results){
   if (err){
     console.error(err);
     return res.send(err);
   }
   res.send(results);
 })
},
addAddress: function(req, res) {
  console.log(req.body);
  db.order.Add_address([req.body.address, req.body.email, req.body.id], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
},
updateQty: function(req, res) {
  db.order.change_quantity([req.body.id, req.body.qty], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
},
completeOrder: function (req, res, next) {
  db.order.update([req.user.order_id, new Date(), undefined], function(err, oldOrder) {
    if (err) {
      console.log('complete order err: ', err);
      return res.status(500).send(err);
    }

    db.order.insertNew([req.user.userid], function(err, order) {
      if (err) {
        console.log('complete order create err: ', err);
        return res.status(500).send(err);
      }
      req.user.order_id = order[0].id;
      next()
  })
})
},
completePayments: function (req, res, next) {
  db.order.clear_payments([req.user.userid], function(err, payments) {
    if (err) {
      console.log('complete order create err: ', err);
      return res.status(500).send(err);
    }
    return res.status(200).send('Order completed successfully');
  })
},
checkCartItems: function(req, res){
db.check_cartItems([req.query.id, req.user.order_id], function(err, results){
  if (err){
    console.error(err);
    return res.send(err);
  }
  res.send(results);
})
}
}
