import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
} from "./types";
export const getCurrentProfile = (userType) => (dispatch) => {
  dispatch(setProfileLoading());
  if (userType === "applicant") {
    axios
      .get("/api/applicant")
      .then((res) =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_PROFILE,
          payload: {},
        })
      );
  } else {
    axios
      .get("/api/recruiter")
      .then((res) =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_PROFILE,
          payload: {},
        })
      );
  }
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear Loading
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

//Create Profile
export const createProfile = (profileData, history, userType) => (dispatch) => {
  if (userType === "applicant") {
    console.log("weeqe");
    axios
      .post("/api/applicant", profileData)
      .then((res) => history.push("./dashboard"))
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  } else {
    console.log("weeqe");
    axios
      .post("/api/recruiter", profileData)
      .then((res) => history.push("./dashboard"))
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

//updateProfile
export const updateProfile = (profileData, userType) => async (dispatch) => {
  if (userType === "applicant") {
    const vgh = await axios
      .post("/api/applicant", profileData)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: {},
        });
        return 1;
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
        return 0;
      });
    return vgh;
  } else {
    const vgh = await axios
      .post("/api/recruiter", profileData)
      .then((res) => {
        dispatch({
          type: GET_ERRORS,
          payload: {},
        });
        return 1;
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
        return 0;
      });
    return vgh;
  }
};

//add Education
export const addEducation = (educationData) => async (dispatch) => {
  const vgh = await axios
    .post("/api/applicant/education", educationData)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      return 1;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return 0;
    });
  return vgh;
};

//delete education
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/applicant/education/${id}`)
    .then((res) =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//update education
export const updateEducation = (educationData) => async (dispatch) => {
  const vgh = await axios
    .post("/api/applicant/update-education", educationData)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
      return 1;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      return 0;
    });
  return vgh;
};
