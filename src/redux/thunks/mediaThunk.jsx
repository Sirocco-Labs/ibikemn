import { supabase } from "../../services/supabase/supabase";
import { setResourceMedia } from "../slices/resourceMediaSlice";

export const getResourceMedia = () => async (dispatch) =>{
    console.log('IN MEDIA THUNK ---> getResourceMedia()');

try {
    const getMedia = await supabase.from('resource_media').select('*').order('id', {ascending:false})
    if (getMedia.error) {
        console.error('SUPABASE GET RESOURCES MEDIA !:', getMedia.error);
    } else {
        console.log(
			"SUPABASE GET RESOURCES MEDIA !:",
			getMedia.status, getMedia.data
		);

        dispatch(setResourceMedia(getMedia.data))

    }

} catch (error) {
    console.error('MEDIA THUNK ERROR ---> getResourceMedia()', error);

}
}