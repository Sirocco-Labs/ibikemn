import { supabase } from "../../../services/supabase/supabase";
import { setOrgList } from "../../slices/private/orgListSlice";

export const getOrganizations = () => async (dispatch) => {
	console.log("IN STAFF ORG THUNK ----> getOrganizations()");
	try {
        const orgListData = await supabase.from('partner_organizations').select('*')
        if(orgListData.error){
            console.error('SUPABASE GET ORG LIST ERROR:', orgListData.error);
            dispatch(setOrgList([]))

        }else{
            console.log('SUPABASE GET ORG LIST SUCCESS:', orgListData.status, orgListData.data);
            dispatch(setOrgList(orgListData.data))
        }
	} catch (error) {
        console.log("STAFF ORG THUNK ERROR ----> getOrganizations()", error);

    }
};
