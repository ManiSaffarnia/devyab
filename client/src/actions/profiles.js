import axios from 'axios';
import { setErrors } from './errors';

//TEST ACTION GENERATOR
export const profileTest = () => ({
    type: 'PROFILE'
});



//================================================================================================
//                                          GET/SET PROFILE
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
};//END startGetUserProfile


export const getUserProfile = (data) => ({
    type: 'GET_CURRENT_USER_PROFILE',
    data
});//END getUserProfile


// ==============================================GET ALL==============================================

export const startGetALLProfiles = () => {
    return async (dispatch) => {
        dispatch(isLoading());
        try {
            const result = await axios.get('/api/profiles/all');

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(setAllProfiles(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                dispatch(setAllProfiles({}));
                dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) dispatch(setErrors(ex.response.data));
        }
    }
};//END startGetProfiles


export const setAllProfiles = (data) => ({
    type: 'SET_ALL_DEVELOPERS_PROFILE',
    data
});//END setProfiles


// =========================================== GET BY HANDLE ==========================================

export const startGetProfileByHandle = (handle) => {
    return async (dispatch) => {
        dispatch(isLoading());
        try {
            const result = await axios.get(`/api/profiles/handle/${handle}`);

            if (result.status === 200) {
                //console.log(result.data);
                dispatch(setProfileByHandle(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data && ex.response.data.noProfile) {
                dispatch(setProfileByHandle({}));
                dispatch(setErrors(ex.response.data));
            }
            else if (ex.response.data && ex.response.status !== 404) dispatch(setErrors(ex.response.data));
        }
    }
};//END startGetProfiles


export const setProfileByHandle = (data) => ({
    type: 'SET_DEVELOPER_PROFILE_BY_HANDLE',
    data
});//END setProfiles


//================================================================================================
//                                      CREATE PROFILE
//================================================================================================
export const createProfile = (newProfileData = {}, history) => {
    return async (dispatch) => {
        dispatch(isLoading());
        try {
            const newProfile = new FormData();
            newProfile.append("handle", newProfileData.handle);
            newProfile.append("avatar", newProfileData.avatar);
            newProfile.append("company", newProfileData.company);
            newProfile.append("website", newProfileData.website);
            newProfile.append("location", newProfileData.location);
            newProfile.append("jobStatus", newProfileData.jobStatus);
            newProfile.append("skills", newProfileData.skills);
            newProfile.append("github", newProfileData.github);
            newProfile.append("bio", newProfileData.bio);
            newProfile.append("twitter", newProfileData.twitter);
            newProfile.append("facebook", newProfileData.facebook);
            newProfile.append("linkedin", newProfileData.linkedin);
            newProfile.append("youtube", newProfileData.youtube);
            newProfile.append("instagram", newProfileData.instagram);
            const result = await axios.post('api/profiles/me', newProfile);

            if (result.status === 200) {
                console.log(result.data);
                dispatch(isLoading());
                history.push({
                    pathname: '/dashboard',
                    state: { flashMessage: 'Your profile was created SUCCESSFULLY' }
                })
            }
        }
        catch (ex) {
            if (ex.response.data) dispatch(setErrors(ex.response.data));
        }
    }
};

//================================================================================================
//                                      EDIT PROFILE
//================================================================================================
export const editProfile = (editedProfile = {}, history) => {
    return async (dispatch) => {
        dispatch(isLoading());
        try {
            const result = await axios.put('api/profiles/me', editedProfile);

            if (result.status === 200) {
                console.log(result.data);
                history.push({
                    pathname: '/dashboard',
                    state: { flashMessage: 'Your profile was edited SUCCESSFULLY' }
                })
            }
        }
        catch (ex) {
            if (ex.response.data) dispatch(setErrors(ex.response.data));
        }
    }
};


//================================================================================================
//                                      DELETE PROFILE
//================================================================================================
export const deleteProfile = (history) => {
    return async (dispatch) => {
        try {
            const result = await axios.delete('api/profiles/me');

            if (result.status === 200) {
                console.log(result.data);
                history.push({
                    pathname: '/dashboard',
                    state: { flashMessage: 'Success! Your profile was deleted!' }
                })

            }
        }
        catch (ex) {
            if (ex.response.data) dispatch(setErrors(ex.response.data));
        }
    }
};


//================================================================================================
//                                         EXPERIENCE
//================================================================================================

//ADD EXPERIENCE
export const createExperience = (experience = {}, history) => {
    return async (dispatch) => {
        dispatch(isLoading()); // show loading page
        try {
            const result = await axios.post('api/profiles/experience', experience);

            if (result.status === 200) {
                dispatch(isLoading()); //hide loading page
                history.push({
                    pathname: '/dashboard',
                    state: { flashMessage: 'Your job experience was created SUCCESSFULY' }
                })
            }
        }
        catch (ex) {
            if (ex.response.data) dispatch(setErrors(ex.response.data));
        }
    }
};


//REMOVE EXPERIENCE
export const deleteExperience = (id = {}, history) => {
    return async (dispatch) => {
        dispatch(isLoading()); // show loading page
        try {
            const result = await axios.delete(`api/profiles/experience/${id}`);

            if (result.status === 200) {
                dispatch(isLoading()); //hide loading page
                history.push({
                    pathname: '/dashboard',
                    state: { flashMessage: 'Your job experience deleted SUCCESSFULY' }
                })
            }
        }
        catch (ex) {
            if (ex.response.data) dispatch(setErrors(ex.response.data));
        }
    }
};



//================================================================================================
//                                         EDUCATION
//================================================================================================

//ADD EDUCATION
export const createEducation = (education = {}, history) => {
    return async (dispatch) => {
        dispatch(isLoading()); // show loading page
        try {
            const result = await axios.post('api/profiles/education', education);

            if (result.status === 200) {
                dispatch(isLoading()); //hide loading page
                history.push({
                    pathname: '/dashboard',
                    state: { flashMessage: 'Your education record was created SUCCESSFULY' }
                })
            }
        }
        catch (ex) {
            if (ex.response.data) dispatch(setErrors(ex.response.data));
        }
    }
};


//REMOVE EDUCATION
export const deleteEducation = (id = {}, history) => {
    return async (dispatch) => {
        dispatch(isLoading()); // show loading page
        try {
            const result = await axios.delete(`api/profiles/education/${id}`);

            if (result.status === 200) {
                dispatch(isLoading()); //hide loading page
                dispatch(getUserProfile(result.data));
            }
        }
        catch (ex) {
            if (ex.response.data) dispatch(setErrors(ex.response.data));
        }
    }
};


//================================================================================================
//                                      LOADING
//================================================================================================


export const isLoading = () => ({
    type: 'SET_IS_LOADING'
});
