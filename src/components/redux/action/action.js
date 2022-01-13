import * as types from "./actionTypes";
import axios from "axios";

const getMeetings = (meetings) => ({
  type: types.GET_MEETINGS,
  payload: meetings,
});

const meetingAdded = () => ({
  type: types.ADD_MEETING,
});

const meetingUpdated = () => ({
  type: types.UPDATE_MEETING,
});

const getMeeting = (meeting) => ({
  type: types.GETSINGLE_MEETING,
  payload: meeting,
});

const meetingDeleted = () => ({
  type: types.DELETE_MEETING,
});

const searchMeeting = (meetings) => ({
  type: types.SEARCH_MEETING,
  payload: meetings,
});

export const loadMeetings = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getMeetings(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const addMeeting = (meeting) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, meeting)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(meetingAdded());
        dispatch(loadMeetings());
      })
      .catch((error) => console.log(error));
  };
};

export const getSingleMeeting = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(getMeeting(resp.data));
      })
      .catch((error) => console.log(error));
  };
};

export const updateMeeting = (meeting, id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${id}`, meeting)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(meetingUpdated());
        dispatch(loadMeetings());
      })
      .catch((error) => console.log(error));
  };
};

export const deleteMeetings = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(meetingDeleted());
        dispatch(loadMeetings());
      })
      .catch((error) => console.log(error));
  };
};

export const searchMeetings = (value) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}?meetingTitle_like=${value}`)
      .then((resp) => {
        console.log("resp", resp);
        dispatch(searchMeeting(resp.data));
      })
      .catch((error) => console.log(error));
  };
};
