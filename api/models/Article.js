const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Article = new Schema ();

module.exports = mongoose.model('Article', Article)
