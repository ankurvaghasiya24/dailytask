// 11. Fetching Data from API: Use useEffect to fetch and display data from an API on 
// component mount.


import React, { useEffect, useState } from 'react'

function Task11() {

  const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/product')
        .then((res) => res.json())
        .then((data) => setData(data.products))
        .catch((err) => console.log(err))
    },[])

  return (
    <div>
      {data.map((item,index) => {
        return(
        <div className='d-flex'>
        <div className=''>
            <h6>{item.title}</h6>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p>{item.rating}</p>
        </div>
        </div>
        )
      })}
    </div>
  )
}

export default Task11
