import { pathOr, construct, assocPath,concat, isNil, isEmpty, or } from 'ramda'


function Authen  (record:any){
 const isLoading:boolean = pathOr(false, ['isLoading'], record)
 const totalRepo:number = pathOr(null, ['totalRepo'], record)
 const listRepo:Array<any> = pathOr([], ['listRepo'], record)
 const listStar:Array<any> = pathOr([], ['listStar'], record)


 

}

Authen.prototype = {
    setLoading: function (value) {
        return assocPath(['isLoading'], value, this)
      },
      setTotalRepo: function (value) {
        return assocPath(['totalRepo'], value, this)
      },
      setListRepo: function (value) {
        return assocPath(['listRepo'], value, this)
      },
      
      concatListRepo: function (value){
        const listRepoTemple = pathOr([], ['listRepo'], this)
        const listAllRepo = concat(listRepoTemple, value, this)
        return assocPath(['listRepo'], listAllRepo, this)
      },
      setListStar: function (value) {
        return assocPath(['listStar'], value, this)
      },
      concatListStar: function (value){
        const listConcatTemple = pathOr([], ['listStar'], this)
        const listAllStar = concat(listConcatTemple, value, this)
        return assocPath(['listStar'], listAllStar, this)
      },
}

export default construct(Authen)
