import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import "../style/books.scss"

function Books() {
  const [books, setBooks] = useState([])

  useEffect(()=>{
    const fetchAllBooks = async ()=>{
      try{
        const res = await axios.get("http://localhost:8800/books")
        setBooks(res.data)
      }catch(err){
        console.log("the error :", err)
      }
    }
    fetchAllBooks()
  },[])

  const handleDelete =async(id)=>{
    try {
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()

    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="home">
      <h1>MST BookShop</h1>
      <div className="books">
        {books.map(book=>(
          <div className="book" key={book.id}>
            <div className={`${book.cover? "cover" : ""}`}>
              {book.cover && <img src={book.cover} alt='#'/>}
            </div>
            <div className="details">
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>{book.price} $</span>
            </div>
            <div className="btns">
              <button className="delete btn" onClick={()=>handleDelete(book.id)}>delete</button>
              <button className="update btn"><Link className='link' to={`/update/${book.id}`}>update</Link></button>
            </div>

          </div>
        ))}
      </div>
      <button className='addBtn'><Link className='link' to='/add'>add new book</Link></button>
    </div>
  )
}

export default Books