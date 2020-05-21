import React, {useState, useEffect} from 'react';
import ListItems from "./ListItems/ListItems"
import { connect } from "react-redux"
import './App.css';
import { 
  getFulListTC, 
  setNextItemTC, 
  delItemTC, 
  updateItemTC,
  setSubListAC
} from "./redux/listReducer"

function App(props) {

  //====================================== maxSerialNumberSeeker ==========================================
  //We are looking for the maximum serial number through enumeration of serialNumber 
  // fields in children of the current parent
  const maxSerialNumberSeeker = (currentItem) => {
    let maxSerialNumber = 0
    let arrItems = props.fullList

    //Если объект пришел, то заполняем массив arrItems его детьми
    if (currentItem !== undefined) {
      arrItems = []
      arrItems = props.fullList.filter((item) => {
        return item.parent === currentItem._id
      })
    }

    if (arrItems.length === 0){
      return maxSerialNumber
    }

    // Находим максимальное значение поля serialNumber в массиве
    arrItems.forEach((item) => {
      if(item.serialNumber > maxSerialNumber){
        maxSerialNumber = item.serialNumber
      }
    })
    
    return maxSerialNumber
  }

  //====================================== UseState ==========================================
  // Set states for 2 inputs
  const [textLi, addText] = useState("")

  //====================================== useEffect ==========================================
  useEffect(() => { props.getFulListTC() }, [])
  
//====================================== addLiHandler ==========================================
  const addLiHandler = (currentItem = undefined, text = textLi) => {

    // create a new object for the database
    
    let ancestorsField = []
    
    if(currentItem !== undefined){
      ancestorsField.push(currentItem.parent)
      ancestorsField = [... ancestorsField, ...currentItem.ancestors]
    }
    
    let newItem = {
      serialNumber: maxSerialNumberSeeker(currentItem) + 1,
      text: text,
      parent: currentItem === undefined ? 0 : currentItem._id,
      children: false,
      subList: false,
      ancestors: ancestorsField
    }

    props.setNextItemTC(newItem)    
    addText("")
    // addSubText("")
  }
//====================================== upHandler ==========================================
  const upHandler = (currentItem) => {
  
    const currentItemSN = currentItem.serialNumber
   // 1. Создаем массив из детей одного родителя
    let arrNeighbors = props.fullList.filter((item) => { 
      return item.parent === currentItem.parent
    })

    let topItem = {}

    // Находим в этом массиве текущий объект и верхнего соседа
    arrNeighbors.forEach((item, i, arr) => {
      if (item._id === currentItem._id){
        topItem = arr[i - 1]
      }
    })

    // Меняем у них поле serialNumber
    currentItem = { ...currentItem, serialNumber: topItem.serialNumber }
    topItem = { ...topItem, serialNumber: currentItemSN }

    props.updateItemTC(currentItem, topItem )    
  }
  //====================================== downHandler ==========================================
  const downHandler = (currentItem) => {
    const currentItemSN = currentItem.serialNumber
    // 1. Создаем массив из детей одного родителя
    let arrNeighbors = props.fullList.filter((item) => {
      return item.parent === currentItem.parent
    })

    let bottomItem = {}

    // Находим в этом массиве текущий объект и нижнего соседа
    arrNeighbors.forEach((item, i, arr) => {
      if (item._id === currentItem._id) {
        bottomItem = arr[i + 1]
      }
    })

    // Меняем у них поле serialNumber
    currentItem = { ...currentItem, serialNumber: bottomItem.serialNumber }
    bottomItem = { ...bottomItem, serialNumber: currentItemSN }

    props.updateItemTC(currentItem, bottomItem)    
  }  
 // ====================================== addSubListHandler ==========================================
 // 1. We are looking for the current element in the DB, set its "subList" field to "true" to display input
 // Выводит поле для добавления подпункта
  const addSubListHandler = (currentItem) => {

    let newFullList = [ ...props.fullList]

    // newFullList.forEach((item) => {      
    //     item.subList = false      
    // })

    newFullList.forEach((item) => {
      if(item._id === currentItem._id){
        item.subList = true
      }
    })
    
    props.setSubListAC(newFullList)
  }

  //====================================== removeHandler ==========================================
  const removeHandler = (currentId, marker) => {
    props.delItemTC(currentId, marker)
  }

  return (
    <div>    
      <h2>Nested List</h2>
      <ul id="globalUL">
        <ListItems
          parent="0"
          items={props.fullList} 
          upHandler={upHandler}
          downHandler={downHandler}
          addSubListHandler={addSubListHandler}
          addLiHandler={addLiHandler}
          removeHandler={removeHandler}
        />
      </ul>
      <input 
        value={textLi} 
        onChange={(e) => { addText(e.target.value) }} 
        onKeyUp={e => {
          if (e.keyCode === 13) {
            if (textLi) {
              addLiHandler()
            }
          }
        }}
        />
      <button onClick={() => {
        if (textLi) {
          addLiHandler()
        }
        }}>
        Add
     </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fullList: state.fullList.fullList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFulListTC: () => {dispatch(getFulListTC())},
    setNextItemTC: (newItem) => { dispatch(setNextItemTC(newItem))},
    delItemTC: (currentId, marker) => { dispatch(delItemTC(currentId, marker))},
    updateItemTC: (currentItem, neighboringItem) => { dispatch(updateItemTC(currentItem, neighboringItem))},
    setSubListAC: (newFullList) => { dispatch(setSubListAC(newFullList))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
