var allRoles = [ 
    {'canManageRecipe': false}, 
    {'canLeaveRating': true}, 
    {'canBlockRecipeComments': false}, 
    {'canBuy': true },
    {'canMakeOrder': false}, 
    {'canManageUsers': false}, 
    {'canBlockUserComments': false}
];

// Admin can manage user roles and block comments
var admin = [
    {'canManageUsers': false}, 
    {'canBlockUserComments': false}
];

// Creator can create/edit recipe, leave rating to other recipes (not to own), 
// block comments, buy from other creators and create order to sell products/services
var creator = [
    {'canManageRecipe': false}, 
    {'canLeaveRating': true}, 
    {'canBlockRecipeComments': true}, 
    {'canBuy': true },
    {'canMakeOrder': true}
];

// Viewer can buy products/services and leave rating
var viewer = [
    {'canLeaveRating': true},
    {'canBuy': true },
];




module.exports = {
    allRoles, 
    admin,
    creator,
    viewer
};
