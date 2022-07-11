import axios from 'axios';
import {GET_MOVIES, GET_DETAIL_MOVIE, CLEAR_MOVIES} from '../Types';

const API_KEY = 'fd5c68655c96f5c7b46a43864ca2b945';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = () => {
  return async dispatch => {
    axios
      .all([
        axios.get(`${BASE_URL}/movie/now_playing`, {
          params: {
            api_key: API_KEY,
          },
        }),
        axios.get(`${BASE_URL}/movie/popular`, {
          params: {
            api_key: API_KEY,
          },
        }),
      ])
      .then(
        axios.spread(async (nowPlaying, popular) => {
          dispatch({
            type: GET_MOVIES,
            payload: {
              nowPlaying: nowPlaying.data.results,
              popular: popular.data.results,
            },
          });
        }),
      )
      .catch(e => {
        console.log(e);
      });
  };
};

export const getDetailMovie = id => {
  return async dispatch => {
    axios
      .get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        },
      })
      .then(res => {
        dispatch({
          type: GET_DETAIL_MOVIE,
          payload: res.data,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const clearMovies = () => ({
  type: CLEAR_MOVIES,
});
