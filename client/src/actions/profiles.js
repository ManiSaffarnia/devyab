import axios from 'axios';
import { setErrors } from './errors';

//TEST ACTION GENERATOR
export const profileTest = () => ({
    type: 'PROFILE'
});

//================================================================================================
//  
//================================================================================================
export const startGetUserProfile = () => {
    return async (dispatch) => {

        try {
            const result = await axios.get('/api/profiles/me');

            if (result.status === 200) {
                console.log(result.data);
                dispatch(getUserProfile(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                dispatch(getUserProfile({}));
                dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) dispatch(setErrors(ex.response.data));
        }
    }
};

export const getUserProfile = (data) => ({
    type: 'SET_CURRENT_USER_PROFILE',
    data
});




