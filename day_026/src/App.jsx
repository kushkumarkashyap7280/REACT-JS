import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import FetchOld from './pages/FetchOld'
import FetchRQ from './pages/FetchRQ'
import { QueryClient ,QueryClientProvider } from '@tanstack/react-query'
import Individual from './pages/Individual'
import InfiniteScroll from './pages/InfiniteScroll'

const router = createBrowserRouter([
  {path : "/",element : <MainLayout/>,
    children : [
    {path : "/",element : <Home/>,index : true},
    {path : "/infinite-scroll",element : <InfiniteScroll/>},
    {path : "/fetch-old",element : <FetchOld/>},
    {path : "/fetch-rq",element : <FetchRQ/>},
    {path : "/fetch-rq/:id",element : <Individual/>},
    {path : "*",element : <div>404</div>},
  ]}
]);

function App() {
  const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
  )
}

export default App
