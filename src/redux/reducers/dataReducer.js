import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  screams: [],
  scream: {
    comments: [],
    screamId: "",
    likeCount: 0 //define variable which we use in component
  },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
      if (state.scream.screamId === action.payload.screamId) {
        // when like button is clicked in  particuler scream
        let index = state.screams.findIndex(
          scream => scream.screamId === action.payload.screamId
        );

        state.screams[index].likeCount = action.payload.likeCount;
        state.scream.likeCount = action.payload.likeCount;
      }

      return {
        ...state
      };
    case UNLIKE_SCREAM:
      if (state.scream.screamId === action.payload.screamId) {
        let index1 = state.screams.findIndex(
          scream => scream.screamId === action.payload.screamId
        );
        state.screams[index1].likeCount = action.payload.likeCount;
        state.scream.likeCount = action.payload.likeCount;
      }
      return {
        ...state
      };
    case DELETE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
