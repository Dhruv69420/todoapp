import React, { useState, useEffect} from 'react'
import todo from "../images/todo.png"

const getLocalData = ()=>{
  const lists = localStorage.getItem("key");

  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData);
  const [toggleButton, setToggleButton] = useState(false);
  const [isEditItem, setIsEditItem] = useState("");
  const addItem = () => {
    
    if(!inputdata){
        alert("plz input something first");
    }
    else if(inputdata && toggleButton){
      setItems(
        items.map((currElem)=>{
          if(currElem.id===isEditItem){
            return {...currElem, name:inputdata }
          }
          return currElem;
        })
      );

    setInputData("");
    setIsEditItem(null);
    setToggleButton(false);
    }
    else{
      const myNewInputData = {
        id:new Date().getTime().toString(),
        name: inputdata
      };
      setItems([...items,myNewInputData]);
      setInputData("");
    }
  };

  const EditItem = (index) =>{
    const itemEditied = items.find((currElem)=>{
      return currElem.id === index;
    });

    
    setInputData(itemEditied.name);
    setIsEditItem(index);
    setToggleButton(true);
    console.log(toggleButton);
  };

  const deleteItem = (index) =>{
    const updatedItems = items.filter((currElem)=>{
      return currElem.id != index;
    });
    setItems(updatedItems);
  };
  const removeAll = () =>{
    setItems([]);
  };

  useEffect(()=>{
    console.log("yo");
    localStorage.setItem("key", JSON.stringify(items));
  },[items]);

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src={todo}></img>
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className='addItems'>
            <input type="text" placeholder="✍️ Add Items" className="form-control" value={inputdata} onChange={(e)=>setInputData(e.target.value)}/>
            {toggleButton?(<i className="far fa-edit add-btn" onClick={addItem}></i>):(<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            
          </div>
          
          <div className='showItems'>
            {items.map((currElem)=>{
              return(
                <div className='eachItem' key={currElem.id}>
              <h3>{currElem.name}</h3>
              <div className="todo-btn">
              <i className="far fa-edit add-btn" onClick={()=>EditItem(currElem.id)}></i>
              <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(currElem.id)}></i>
              </div>
            </div>
              );
            })}
            
          </div>

          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default Todo