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
    console.log('hello' , req.params);
    db.get_oneblog([req.params.blogid], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}
