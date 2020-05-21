import React from "react";
import FieldInput from "../FieldInput/FieldInput"

const ListItems = props => {
  
  let currentItems = props.items.filter((i) => i.parent === props.parent)
  
  let listItems = currentItems.map((item, i, arr) => {
    
    let parentNext
    if(item.children){
      parentNext = item._id
    }    

    return (
      <li key={item._id}>
        {item.text}
        {i !== 0 && <button onClick={() => props.upHandler(item)}>Up</button>}

        {i !== arr.length - 1 && (
          <button onClick={() => props.downHandler(item)}>Down </button>
        )}

        {!item.subList && (
          <button onClick={() => props.addSubListHandler(item)}>
            Add Sublist
          </button>
        )}

        {item.subList && (
          <button onClick={() => props.removeHandler(item._id, "SL")}>
            Remove Sublist
          </button>
        )}

        <button
          onClick={() => {
            props.removeHandler(item._id, "L");
          }}
        >
          Remove
        </button>

        {item.subList && <FieldInput item={item} addLiHandler={props.addLiHandler} />}

        {parentNext && (
          <ul>
            <ListItems
              parent={parentNext}
              items={props.items}
              upHandler={props.upHandler}
              downHandler={props.downHandler}
              addSubListHandler={props.addSubListHandler}
              addLiHandler={props.addLiHandler}
              removeSubListHandler={props.removeSubListHandler}
              removeHandler={props.removeHandler}
            />
          </ul>
        )}
      </li>
    );
  });

  return <>
    {listItems}
  </>;
};

export default ListItems;