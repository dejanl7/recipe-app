import { tassign } from 'tassign'; 
import { GET_IMAGES_INFO, GET_PROFILE_IMAGE, DELETE_PROFILE_IMAGE } from './actions';
import { ImagesService } from '../services/images.service';
import { ImageInterface } from "./interfaces";


// Initial State
export const USER_IMAGES_STATE: ImageInterface = { 
    imageName: null,
    imagePath: null
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
    return tassign(state, { profileImage: action.profileImgPayload });
}


/*===========================
    Delete User Image
=============================*/
function deleteProfileImage(state, action) {
    return tassign( state, { profileImage: action.profileImgPayload });
}



// Reducer 
export function messagingReducer(state: ImageInterface = USER_IMAGES_STATE, action): ImageInterface {
    switch (action.type) {
        case GET_IMAGES_INFO: return getUserImages(state, action);
        case DELETE_PROFILE_IMAGE: return deleteProfileImage(state, action);
        case GET_PROFILE_IMAGE: return getProfileImage(state, action);
    }
  return state; 
}