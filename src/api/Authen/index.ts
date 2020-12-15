import  axios from 'axios'

import API from '../../common/axios-config';
import constants from "../../utils/Constants"

export default {
  getTotalRepo: async (nameRepo: string) => {
    try {
      const dataResult = await API.get(`/users/${nameRepo}`);
      console.log('data === ', dataResult);
      if (dataResult) {
        return dataResult.data;
      }
      return null;
    } catch (err) {
      console.log('get list rep APi', err);
    }
  },

  getListRepoApi: async (page: number, nameRepo: string) => {
    const dataResult = await API.get(
      `/users/${nameRepo}/repos?page=${page}&per_page=${constants.limitPage}`,
    );
    return dataResult;
  },
  getListStarApi: async(url: string ,page:number) =>{
      const dataResult = await axios.get(`${url}?page=${page}&per_page=${constants.limitPage}`)
    return dataResult
  }
};
