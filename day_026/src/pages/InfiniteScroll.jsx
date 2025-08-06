import React, { useEffect, useCallback } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getUsers } from '../apis/reactQueryApi'
import { useInView } from 'react-intersection-observer'

function InfiniteScroll() {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 1 }) => getUsers(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // Continue to next page if we got users and haven't reached a reasonable limit
      return lastPage.length > 0 && allPages.length < 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  })


  // first way 

  // const handleScroll = useCallback(() => {
  //   const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500;
  //   if (bottom && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, [hasNextPage, isFetchingNextPage, fetchNextPage])
  
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [handleScroll])


  // second way 
  const { ref , inView}  = useInView({
    threshold: 0.5,
  });

  useEffect(()=>{
    if(inView && hasNextPage && !isFetchingNextPage){
      fetchNextPage();
    }
  },[inView, hasNextPage, isFetchingNextPage, fetchNextPage])


  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>
  }

  return (
    <div>
      {data && data.pages.map((page, pageIndex) => (
        <div className='grid grid-cols-3 gap-4' key={pageIndex}>
          {page.map((user) => (
            <div className='border-2 border-gray-300 p-4 rounded-md' key={user.id}>
              <img src={user.avatar_url} alt={user.login} className='w-full h-full object-cover' />
              <h1>{user.login}</h1>
            </div>
          ))}
        </div>
      ))}
      {isFetchingNextPage && <h2>Loading more...</h2>}
      <div ref={ref} className='h-10 bg-red-500'> </div>
    </div>
  )
}

export default InfiniteScroll
