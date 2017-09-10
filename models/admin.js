var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;


// Blueprint for Admin Collection
var schema = new Schema({
    widgetsDisplay: {
        type: Array,
        default: [
            {'Recent Recipes': true}, 
            {'Popular Categories': true}, 
            {'Some Authors': true}, 
            {'Popular Recipes': true }
        ]
    },
    widgetsPosition: {
        type: Array,
        default: ['Recent Recipes', 'Popular Categories', 'Some Authors', 'Popular Recipes']
    },
    homePageLayout: {
        type: String,
        enum: ['one-and-right-sidebar', 'two-and-right-sidebar', 'three-without-sidebar'],
        default: 'two-and-right-sidebar'
    }
});



module.exports = mongoose.model(
    'Admin',
    schema
)