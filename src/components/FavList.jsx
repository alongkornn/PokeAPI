import React from 'react'
import LikePoke from './LikePoke'

function FavList({ favList }) {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4'>
        {favList?.map((item, idx) => (
          <div className='h-50 w-50' key={idx}>
            <img src={item?.sprites?.other?.home?.front_default} alt="" />
            <h3>{item?.name}</h3>
            <LikePoke />
          </div>
          ))}
    </div>
  )
}

export default FavList