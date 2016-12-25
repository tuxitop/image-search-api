/* jshint esversion: 6 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const searchSchema = new Schema({
    term: { 
        type: String,
        required: true, 
    },
    when: {
        type: Date,
        required: true
    }
}, { capped: {size: 1024, max: 10} });

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
