import * as types from "../action/actionTypes";

const initialState = {
  meetings: [],
  meeting: [],
  loading: true,
};

const meetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MEETINGS:
      return {
        ...state,
        meetings: action.payload,
        loading: false,
      };
    case types.ADD_MEETING:
    case types.UPDATE_MEETING:
    case types.DELETE_MEETING:
      return {
        ...state,
        loading: false,
      };
    case types.GETSINGLE_MEETING:
    case types.SEARCH_MEETING:
      return {
        ...state,
        meeting: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default meetingsReducer;
