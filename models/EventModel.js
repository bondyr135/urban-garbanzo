const mongoose = require("mongoose");

//MONGOOSE SCHEMA
const Schema = mongoose.Schema;
const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

//MONGOOSE MODEL
const EventNote = mongoose.model("Events", EventSchema);

module.exports = EventNote;
