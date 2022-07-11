import * as T from '../Types';

const InitialState = {
  nowPlaying: null,
  popular: null,
  detail: null,
};

const Reducers = (state = InitialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case T.GET_MOVIES:
      return {
        ...state,
        nowPlaying: payload.nowPlaying,
        popular: payload.popular,
      };
      break;
    case T.GET_DETAIL_MOVIE:
      return {
        ...state,
        detail: payload,
      };
      break;
    case T.CLEAR_MOVIES:
      return {
        ...state,
        nowPlaying: null,
        popular: null,
        detail: null,
      };
      break;
    default:
      return state;
  }
};

export default Reducers;
