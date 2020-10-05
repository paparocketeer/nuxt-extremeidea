const Article = require('../models/Article');

// Get all
module.exports.list = function (req, res, next) {
  Article.find({}, function(err, articles){
    if(err) {
        return res.status(500).json({
            message: 'Error getting records.'
        });
    }
    return res.json(articles);
  });
}


// Get one
module.exports.show = function(req, res) {
  var id = req.params.id;
  Article.findOne({_id: id}, function(err, article){
      if(err) {
          return res.status(500).json({
              message: 'Error getting record.'
          });
      }
      if(!article) {
          return res.status(404).json({
              message: 'No such record'
          });
      }
      return res.json(article);
  });
}
