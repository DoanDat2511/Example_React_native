import { createAction }from 'redux-actions'

export const LOADING = 'Authen/LOADING'
export const TOTAL_REPO = 'Authen/TOTAL_REPO'
export const LIST_REPO = 'Authen/LIST_REPO'
export const CONCAT_LIST_REPO = 'Authen/CONCAT_LIST_REPO'
export const LIST_STAR = 'Authen/LIST_STAR'
export const  CONCAT_LIST_STAR = 'Authen/CONCAT_LIST_STAR'

export const setLoading = createAction(LOADING)
export const setTotalRepo = createAction(TOTAL_REPO)
export const setListRepo = createAction(LIST_REPO)
export const setConcatListRepo = createAction(CONCAT_LIST_REPO)
export const setListStar = createAction(LIST_STAR)
export const setConcatListStar = createAction(CONCAT_LIST_STAR)
