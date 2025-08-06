import React from 'react'
import { useParams ,useNavigate } from 'react-router-dom'  
import { useQuery } from '@tanstack/react-query'
import { fetchIndividualData } from '../apis/reactQueryApi'

function Individual() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["individual", id],  // query key is used to identify the query
    queryFn: () => fetchIndividualData(id),  // query function is used to fetch the data
  });

  if (isLoading) {
    return <h1 className='text-center text-2xl font-bold'>Loading...</h1>
  }

  if (isError) {
    return (
      <div className='text-center bg-red-500'>
        <h1 className='text-2xl font-bold text-red-600'>Error</h1>
        <p className='text-gray-600 mt-2'>{error?.message || 'Something went wrong'}</p>
      </div>
    )
  }

  return (
    <div className='text-center'>
      <h1 className='text-2xl font-bold'>{data.title}</h1>
      <p className='text-gray-500'>{data.body}</p>
      <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}
export default Individual
