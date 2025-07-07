
import React from 'react'

function Input({label,type="text",value,onChange,className="" ,placeholder=""}) {
  return (
    <div className='mb-4'>
        {label && <label className='text-sm block mb-1'>{label}</label>}
        <input type={type} onChange={onChange} value={value} placeholder={placeholder} className={`px-3 py-2 w-full border focus:outline-pink-500 rounded ${className}`}/>
    </div>
  )
}

export default Input