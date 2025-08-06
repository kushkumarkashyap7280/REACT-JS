// import React from 'react'
// import { fetchData } from '../apis/reactQueryApi';
// import { useQuery } from '@tanstack/react-query';
// import { NavLink } from 'react-router-dom';

// function FetchRQ() {
//   // const [posts , setPosts] = useState([]);              no needed
//   // const [loading ,setLoading] = useState(true);
//   // useEffect(()=>{
//   //   fetchData().then((res)=>{
//   //     setPosts(res.data);
//   //     setLoading(false);
//   //   })
//   // },[]);
//   // useEffect(()=> console.log(posts),[posts]);

//   // useQuery
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["posts"],   //works  like usestate
//     queryFn: fetchData,  // works like useEffect - React Query calls this function automatically
//     gcTime: 1000 * 60 * 5, // 5 minutes    - data will be removed from the cache after 5 minutes
//     staleTime: 1000 * 60 * 2, // 2 minutes   - data will be considered stale after 2 minutes
//     // refetchInterval : 1000 , //  1s   - data will be refetched every 1 second
//     // refetchIntervalInBackground : true, // data will be refetched in the background
//   })

//   if (isLoading) {
//     return <h1 className='text-center text-2xl font-bold'>Loading...</h1>
//   }

//   if (isError) {
//     return (
//       <div className='text-center'>
//         <h1 className='text-2xl font-bold text-red-600'>Error</h1>
//         <p className='text-gray-600 mt-2'>{error?.message || 'Something went wrong'}</p>
//       </div>
//     )
//   }

//   if (!data || data.length === 0) {
//     return <h1 className='text-center text-2xl font-bold text-gray-600'>No posts found</h1>
//   }

//   return (
//     <ul className='grid grid-cols-3 gap-4'>
//       {data.map((ele) => (
//         <li key={ele.id} className='border-2 border-gray-300 p-4 rounded-md'>
//           <NavLink to={`/fetch-rq/${ele.id}`} className="block hover:bg-gray-50 transition-colors">
//             <h1 className='text-2xl font-bold'>{ele.title}</h1>
//             <p className='text-gray-500'>{ele.body}</p>
//           </NavLink>
//         </li>
//       ))}
//     </ul>
//   )
// }

// export default FetchRQ;




// learn pagination  :
// paginatino allows us to show only the data that we need
// we can use the page and limit to fetch the data
// backend should must have the pagination logic
// frontend should have the pagination logic
// frontend should have the page and limit state
// frontend should have the previous and next button
// frontend should have the page number
// frontend should have the data
// frontend should have the loading state

// import React, { useState } from 'react'
// import { useQuery } from '@tanstack/react-query';
// import { fetchPerPage } from '../apis/reactQueryApi';
// import { NavLink } from 'react-router-dom';
// function FetchRQ() {
//   const [page, setPage] = useState(1);
//   const {data, isLoading, isError, error} = useQuery({
//     queryKey: ["posts", page, 10],
//     queryFn: () => fetchPerPage(page, 10),
//   })
//   if(isLoading){
//     return <h1 className='text-center text-2xl font-bold'>Loading...</h1>
//   }
//   if(isError){
//     return <h1 className='text-center text-2xl font-bold'>Error</h1>
//   }
//   return (
//     <div>
//       <h1 className='text-center text-2xl font-bold'>Page: {page}</h1>
//      <ul className='grid grid-cols-3 gap-4'>
//      {data && data.map((ele) => (
//        <li className='border-2 border-gray-300 p-4 rounded-md' key={ele.id}> <NavLink to={`/fetch-rq/${ele.id}`} className='block hover:bg-gray-50 transition-colors' >
//        <h1>{ele.title}</h1>
//      </NavLink></li>
//       ))}
//      </ul>
//       <div className='flex justify-center gap-4'>
//         <button  disabled={page === 1} onClick={() => setPage(page - 1)} className={`bg-blue-500 text-white p-2 rounded-md ${page === 1 ? 'bg-gray-500' : ''}`}>Previous</button>
//         <button  disabled={page === 10} onClick={() => setPage(page + 1)} className={`bg-blue-500 text-white p-2 rounded-md ${page === 10 ? 'bg-gray-500' : ''}`}>Next</button>
//       </div>
//     </div>
//   )
// }

// export default FetchRQ



// use mutation in react Query

import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPerPage , deletePost, updatePost} from '../apis/reactQueryApi';
import { NavLink } from 'react-router-dom';
function FetchRQ() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ["posts", page, 10],
    queryFn: () => fetchPerPage(page, 10),
    placeholderData: (previousData, previousQuery)=>{   // what it does is it will return the previous data when the page is changed
      return previousData;
    }
  });


  // delete mutation
 const deleteMutation = useMutation({
    mutationFn: (id)=>deletePost(id),
    onSuccess: (data, id)=>{
      console.log("data is", data, "id is", id, "deleted successfully")
      queryClient.setQueryData(["posts", page, 10], (oldData)=>{
        return oldData.filter((ele)=>ele.id !== id)
      });
      // queryClient.invalidateQueries({queryKey: ["posts", page, 10]})
    },
    onError: (error)=>{
      console.log(error)
    }
  })

  // update mutation

  const updateMutation = useMutation({
    mutationFn: (id)=>updatePost(id),
    onSuccess: (data, id)=>{
      console.log("data is", data, "id is", id, "updated successfully")
      queryClient.setQueryData(["posts", page, 10], (oldData)=>{
        return oldData.map((ele)=>ele.id === id ? data : ele)
      });
      // queryClient.invalidateQueries({queryKey: ["posts", page, 10]})
    }
  })

  if(isLoading){
    return <h1 className='text-center text-2xl font-bold'>Loading...</h1>
  }
  if(isError){
    return <h1 className='text-center text-2xl font-bold'>Error</h1>
  }
  return (
    <div>
      <h1 className='text-center text-2xl font-bold'>Page: {page}</h1>
     <ul className='grid grid-cols-3 gap-4'>
     {data && data.map((ele) => (
       <li className='border-2 border-gray-300 p-4 rounded-md' key={ele.id}> <NavLink to={`/fetch-rq/${ele.id}`} className='block hover:bg-gray-50 transition-colors' >
       <h1>{ele.title}</h1>
     </NavLink>
     <button onClick={(e)=>{
        e.stopPropagation();
        deleteMutation.mutate(ele.id)
       }} className='bg-red-500 text-white p-2 rounded-md'>Delete</button>
       <button onClick={(e)=>{
        e.stopPropagation();
        updateMutation.mutate(ele.id)
       }} className='bg-green-500 text-white p-2 rounded-md'>Update</button>
     </li>
      ))}
     </ul>
      <div className='flex justify-center gap-4'>
        <button  disabled={page === 1} onClick={() => setPage(page - 1)} className={`bg-blue-500 text-white p-2 rounded-md ${page === 1 ? 'bg-gray-500' : ''}`}>Previous</button>
        <button  disabled={page === 10} onClick={() => setPage(page + 1)} className={`bg-blue-500 text-white p-2 rounded-md ${page === 10 ? 'bg-gray-500' : ''}`}>Next</button>
      </div>
    </div>
  )
}

export default FetchRQ
