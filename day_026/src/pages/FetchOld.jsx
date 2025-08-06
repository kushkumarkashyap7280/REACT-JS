import React, { useEffect, useState } from 'react'
import { fetchData } from '../apis/oldApi';
function FetchOld() {
  const [posts , setPosts] = useState([]);
  const [loading ,setLoading] = useState(true);
  useEffect(()=>{
    fetchData().then((res)=>{
      setPosts(res.data);
      setLoading(false);
    })
  },[]);
  useEffect(()=> console.log(posts),[posts]);
  return (
    <>
    {loading ? <h1 className='text-center text-2xl font-bold'>Loading...</h1> :
      <ul className='grid grid-cols-3 gap-4'>
      {posts?.map((ele )=>{
        return  <li key={ele.id} className='border-2 border-gray-300 p-4 rounded-md'>
         <h1 className='text-2xl font-bold'>{ele.title}</h1>
         <p className='text-gray-500'>{ele.body}</p>
          </li>
      })}
      </ul>
    }
    </>
  )
}

export default FetchOld
