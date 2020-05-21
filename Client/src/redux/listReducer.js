import { 
  getFullListAPI, 
  setNextItemAPI, 
  delItemAPI, 
  updateItemAPI
} from "../api/api"

const GET_FULL_LIST = "GET_FULL_LIST"
const SET_SUB_LIST = "SET_SUB_LIST"

let initialState = {
  fullList: []
}

export const listReducer = (state = initialState, action) => {
  switch (action.type){
    case "GET_FULL_LIST": 
    return {
      ...state,
      fullList: action.data
    }
    
    case "SET_SUB_LIST":
      return {
        ...state,
        fullList: action.newFullList
      }    

    default: return state
  }
}

let unSortedFullList = []

 //====================================== sorterList ==========================================
  //Sort the array received from the server by the "serialNumber" field
const sorterList = (arrItems) => {

  let sortedfullList = []

   // Переставляем элементы в массиве по порядку
  const internalSorter = (currentSortArr) => {
    currentSortArr.sort((a, b) => {
      return a.serialNumber - b.serialNumber
    })
    sortedfullList = [...sortedfullList, ...currentSortArr]
  }

  // Выбираем детей только одного родителя
  const filterList = (id) => {
    let tempArr = arrItems.filter((item) => {     
      return item.parent === id
    })
    internalSorter(tempArr)
  }

  filterList("0")  

  arrItems.forEach((item) => {
    if(item.children){
      filterList(item._id)
    }
  })

  return sortedfullList
}

//====================================== AC ========================================
//================================== Get full list===================================
export const getFulListAC = (data) => {
  // data = sorterList(data)
  return {
    type: GET_FULL_LIST,
    data
  }
}

//================================== Set sub lis "true"===================================
export const setSubListAC = (newFullList) => {
  return {
    type: SET_SUB_LIST,
    newFullList
  }
}

//====================================== TC ========================================
//================================== Get full list===================================
export const getFulListTC = () => {
  return (dispatch) => {
    getFullListAPI()
      .then((response) => {
        unSortedFullList = response.data        
        dispatch(getFulListAC(sorterList(unSortedFullList)))
      })
  }
}

//================================== Set new item in list =================================
export const setNextItemTC = (newItem) => {
  return (dispatch) => {
    setNextItemAPI(newItem)      
      .then((response) => {
        // Добавляем в unSortedFullList ребенка
        unSortedFullList.push(response.data.newItem)
      
        //Меняем свойства children и subList у родителя
        if(response.data.updatedParent){          
          unSortedFullList.forEach((item) => {
            if(item._id === response.data.updatedParent._id){            
              item.children = response.data.updatedParent.children
              item.subList = response.data.updatedParent.subList            
            }
          })
        }
      // сортируем и диспатчим в стор
        dispatch(getFulListAC(sorterList(unSortedFullList)))
    })  
  }
}

//================================== Delete item in list =================================
export const delItemTC = (currentID, marker) => {
  return (dispatch) => {
    delItemAPI(currentID, marker)
      .then((response) => {
        dispatch(getFulListTC())  // нужно убрать
      })
  }
}

//============================= Update curren item end neighboring Item ===========================
export const updateItemTC = (currentItem, neighboringItem) => {
  return (dispatch) => {
    updateItemAPI(currentItem)
      .then((response) => {
        dispatch(getFulListTC()) // нужно убрать
      })
    updateItemAPI(neighboringItem)
      .then((response) => {
        dispatch(getFulListTC()) // нужно убрать
      })
      
  }
}
