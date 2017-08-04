import { tassign } from 'tassign'; 
import { GET_IMAGES_INFO } from './actions'; 
import { ImagesModel } from "../account/models/images.model";
import { ImagesService } from '../account/services/images.service';
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
    return tassign(state, { imagesInfo: action.imgPayload });
}




// Reducer 
export function messagingReducer(state: ImageInterface = USER_IMAGES_STATE, action): ImageInterface {
    switch (action.type) {
        case GET_IMAGES_INFO: return getUserImages(state, action);
    }
  return state; 
}