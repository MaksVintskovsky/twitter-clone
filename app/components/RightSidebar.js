import React from 'react'
import { Suspense } from 'react'
import SearchBar from './SearchBar';

const RightSidebar = () => {
  return (
    <div className='pl-8 pt-3'>
      <Suspense>
        <div> <SearchBar placeholder="Search" /></div>
      </Suspense>
    </div>
  )
}

export default RightSidebar