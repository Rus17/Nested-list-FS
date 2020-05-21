import React, { useState } from "react"

const FieldInput = (props) => {

  const [textSubLi, addSubText] = useState("")

  return (    
    <ul>
      <li>
        <input
          value={textSubLi}
          onChange={(e) => { addSubText(e.target.value) }}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              if (textSubLi) {
                props.addLiHandler(props.item, textSubLi)
                addSubText("")
              }
            }
          }}
        />
        <button onClick={() => {
          if (textSubLi){
            props.addLiHandler(props.item, textSubLi)
            addSubText("")
          }
        }}>
        Add
          </button>
      </li>
    </ul>
  )  
}

export default FieldInput