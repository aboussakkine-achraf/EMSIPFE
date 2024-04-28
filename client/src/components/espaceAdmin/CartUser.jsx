import React from 'react'
import { Link } from 'react-router-dom'

const CartUser = (props) => {
  return (
    <Link to={'/Admin/User'} state={props}>   
        <div className='border-2 border-black w-[95%] rounded-md mx-auto px-3 py-3 my-2 flex flex-row items-center justify-between'>
          <div>
            <h2 className='font-bold'>{props.nom} {props.prenom}</h2>
            <p>{props.filier}</p>
            <p>{props.role}</p>
          </div>
          <div className='flex flex-col gap-1 pr-2'>
            <div className='w-[5px] h-[5px] rounded-full bg-black'></div>
            <div className='w-[5px] h-[5px] rounded-full bg-black'></div>
            <div className='w-[5px] h-[5px] rounded-full bg-black'></div> 
          </div>
        </div>
    </Link>
  )
}

export default CartUser