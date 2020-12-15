import {handleActions} from 'redux-actions';

import {
  setLoading,
  setListRepo,
  setConcatListRepo,
  setTotalRepo,
  setListStar,
  setConcatListStar,
  LIST_REPO,
  CONCAT_LIST_REPO,
  TOTAL_REPO,
  LIST_STAR,
  CONCAT_LIST_STAR,
  LOADING,
} from './action-type';
import Model from './model';
import {Authen} from '../../api/';
import RequestHandler from '../../utils/RequestHandler';

const initialState = Model(null);

export const getListRepo = (page: number, nameRepo: string) => async (
  dispatch,
) => {
  dispatch(setLoading(true));
  try {
    if (page) {
      const dataResult = await Authen.getListRepoApi(page, nameRepo).catch(
        (error) => {
          RequestHandler(error, dispatch);
        },
      );

      if (dataResult) {
        if (page === 1) {
          dispatch(setListRepo(dataResult.data));
        } else {
          dispatch(setConcatListRepo(dataResult.data));
        }
      }
    }
  } catch (err) {
    console.log('error get list Repo', err);
  }
  dispatch(setLoading(false));
};

export const getTotal = (nameRepo: string) => async (dispatch) => {
  try {
    const data: any = await Authen.getTotalRepo(nameRepo);
    if (data) {
      dispatch(setTotalRepo(data.public_repos));
    }
  } catch (err) {
    console.log('error get total repo', err);
  }
};

export const getListStar = (url: string, page: number) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    if (page) {
      const dataResult = await Authen.getListStarApi(url, page).catch((err) => {
        RequestHandler(err, dispatch);
      });

      if (dataResult) {
        if (page === 1) {
          dispatch(setListStar(dataResult.data));
        } else {
          dispatch(setConcatListStar(dataResult.data));
        }
      }
    }
  } catch (err) {
    console.log('get star reducer error', err);
  }
  dispatch(setLoading(false));
};

export const resetListStar = () => async (dispatch) => {
  dispatch(setListStar(null));
};

const actions = {
  [LOADING]: (state, action) => state.setLoading(action.payload),
  [TOTAL_REPO]: (state, action) => state.setTotalRepo(action.payload),
  [LIST_REPO]: (state, action) => state.setListRepo(action.payload),
  [CONCAT_LIST_REPO]: (state, action) => state.concatListRepo(action.payload),
  [LIST_STAR]: (state, action) => state.setListStar(action.payload),
  [CONCAT_LIST_STAR]: (state, action) => state.concatListStar(action.payload),
};

export default handleActions(actions, initialState);
