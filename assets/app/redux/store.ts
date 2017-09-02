import { tassign } from 'tassign'; 
import { GET_IMAGES_INFO, GET_PROFILE_IMAGE, DELETE_PROFILE_IMAGE, UPDATE_CATEGORY_NAME, ALL_CATEGORIES } from './actions';
import { ImagesService } from '../services/images.service';
import { RecipeInfoInterface } from "./interfaces";


// Initial State
export const RECIPE_INFO_STATE: RecipeInfoInterface = { 
    imageName: null,
    imagePath: null,
    categoryName: null,
    categoryState: null
};



/*===========================
    Get User Images
=============================*/
function getUserImages(state, action) {  
    return tassign(state, { imagesInfo: action.imgPayload, imagesInfoLength: action.imgPayload.length });
}

/*===========================
    Get Profile Image
=============================*/
function getProfileImage(state, action) {
    return tassign(state, { profileImage: action.profileImgPayload, profileEmail: action.profileEmailPayload });
}

/*===========================
    Delete User Image
=============================*/
function deleteProfileImage(state, action) {
    return tassign( state, { profileImage: action.profileImgPayload });
}

/*==================================
    Get category count
====================================*/
function getAllCategories(state, action) {
    return tassign( state, {displayAllCategories: action.categoriesPayload} );
}

/*==================================
    Update category name and state
====================================*/
function updateCategories(state, action) {
    return tassign( state, {catName: action.catNamePayload, catId: action.catIdPayload, remainCategoryCount: action.countRemainRecordsPayload} );
}



// Reducer 
export function messagingReducer(state, action) {
    switch (action.type) {
        case GET_IMAGES_INFO: return getUserImages(state, action);
        case DELETE_PROFILE_IMAGE: return deleteProfileImage(state, action);
        case GET_PROFILE_IMAGE: return getProfileImage(state, action);
        case UPDATE_CATEGORY_NAME: return updateCategories(state, action);
        case ALL_CATEGORIES: return getAllCategories(state, action);
    }

    return state; 
}