
import React from 'react'

function Button({text,onClick,className="",type='button'}) {
  return (
    <button type={type} onClick={onClick} className={`bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded ${className}`}>
        {text}
    </button>
  )
}

export default Button