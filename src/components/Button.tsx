import Link from 'next/link'
import React from 'react'

const Button = () => {
  return (
    <div>
        <Link href="/onboarding">
          <button className="font-pixel text-lg sm:text-xl md:text-2xl bg-violet-600 text-background px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-md hover:bg-purple-500 transition-colors duration-150 hover:text-white shadow-md">
            Sign Up
          </button>
        </Link>
    </div>
  )
}

export default Button