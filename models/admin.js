var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;


// Blueprint for Admin Collection
var schema = new Schema({
    widgets: {
        type: Array,
        default: [
            { widgetName: 'Recent Recipes', widgetDisplay: true}, 
            { widgetName: 'Popular Categories', widgetDisplay: true}, 
            { widgetName: 'Some Authors', widgetDisplay: true}, 
            { widgetName: 'Popular Recipes', widgetDisplay: true }
        ]
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