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
    console.log('req.body:', req.query);
    db.order.get_cartItems([req.query.id],function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  getallcartItems: function(req, res){
    db.order.get_allcartitems([req.user.userid],function(err, results){
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
 }
}
