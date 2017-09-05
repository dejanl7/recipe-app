var allRoles = [ 
    {'canManageRecipe': false}, 
    {'canLeaveRating': true}, 
    {'canBlockRecipeComments': false}, 
    {'canBuy': true },
    {'canMakeOrder': false}, 
    {'canManageUsers': false}, 
    {'canBlockUserComments': false}
];

var admin = [
    {'canManageUsers': false}, 
    {'canBlockUserComments': false}
];

var moderator = [
    {'canManageRecipe': false}, 
    {'canLeaveRating': true}, 
    {'canBlockRecipeComments': true}, 
    {'canBuy': true },
    {'canMakeOrder': true}
];

var viewer = [
    {'canLeaveRating': true},
    {'canBuy': true },
];




module.exports = {
    allRoles, 
    admin,
    moderator,
    viewer
};
