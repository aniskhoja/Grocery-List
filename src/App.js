import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('grocery-list')
  if (!list)
    return [];
    return JSON.parse(localStorage.getItem('grocery-list'))
}
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, SetIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({show:false, mesg:'', type:''});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Field cannot be emply")
    } else if (name && isEditing) {
      const itemExist = list.find(item => item.id === editID)
      const index = list.indexOf(itemExist)
      list[index].title = name
      setList([...list])
      showAlert(true, "success", "Edited successfully")
      setName('')
      SetIsEditing(false)
      setEditID(null)
    } else {
      //show alert
      showAlert(true, "success", "added to list")
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('')
    }
  }

  const handleEdit = (id) => {
    SetIsEditing(true)
    const itemExist = list.find(item => item.id === id)
    setName(itemExist.title)
    setEditID(itemExist.id)
  }

  const handleDelete = (id) => {
    showAlert(true, "danger", "item deleted")
    const updateList = list.filter(item => item.id !== id)
    setList([...updateList])
  }
  const showAlert = (show = false, type = '', mesg = '') => {
    setAlert({ show, type, mesg });
  };

  const clearList = () => {
    showAlert(true, "danger", "list is clear")
    setList([])
  }
  
  useEffect(() => {
      localStorage.setItem('grocery-list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>grocery list</h3>
        <div className='form-control'>
          <input type='text' className='grocery' placeholder='e.g eggs'
          value={name} onChange={(e) => setName(e.target.value)}/>
          <button className='submit-btn' type='submit'>{ isEditing ? 'Edit' : "Add"}</button>
        </div>
      </form>
      {list.length > 0 && <div className='grocery-container'>
        <List items={list} handleEdit={handleEdit} handleDelete={handleDelete} />
        <button className='clear-btn' onClick={clearList}>Clear Items</button>
       </div>}
      
    </section>
  )
}

export default App
