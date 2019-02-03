var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NewsSchema = new Schema({
    title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
    },
    reference: {
      type: Schema.Types.ObjectId,
      ref: "Notes"
    }
});

var News = mongoose.model("News", NewsSchema);
module.exports = News;