import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../style/add.scss"

function Update() {
  const [bookInfo, setBookInfo]= useState({
    // id: null,
    title :"",
    desc: "",
    price: null,
    cover: "",
  })
  const navigate = useNavigate()
  const location = useLocation()
  const bookId = location.pathname.split("/")[2]
  console.log()
  
  const handleInputChange = (e)=>{
    setBookInfo((prev)=>({...prev, [e.target.name] : e.target.value}))
  }

  const handleAddClick = async(e)=>{
    e.preventDefault()
    console.log("handleAddClick function called");
    try {
      console.log('Sending data:', bookInfo);
      await axios.put("http://localhost:8800/books/"+ bookId, bookInfo )
      console.log('Data sent successfully');
      navigate('/')
    } catch (err) {
      console.log("an error from handleAddClick function",err)
    }
  }
  return (
    <div className="formContainer">
      <div className="form">
        <h1>update new book</h1>
        {/* <input type="number" placeholder='id' name='id' onChange={handleInputChange}/> */}
    
        <div className="inputs">
          <input type="text" placeholder='title' name='title'   onChange={handleInputChange}/>
          <input type="text" placeholder='desc' name='desc'   onChange={handleInputChange} />
          <input type="number" placeholder='price' name='price'   onChange={handleInputChange} />
          <input type="text" placeholder='cover' name='cover'   onChange={handleInputChange} />
        </div>
        <button onClick={handleAddClick}>update</button>
    
        </div>
    </div>
  )
}

export default Update