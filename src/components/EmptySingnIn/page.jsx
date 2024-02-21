import Link from 'next/link';
import React from 'react'

function EmptySingnIn({title}) {
  return (
    <section className='empty-signin'>
        <div>
        <p className="title md:text-xl uppercase">please sign In to view {title}</p>
        <div className="btn-div my-4 flex justify-evenly">
            <Link prefetch={false} href={"/signin"} className='signin mx-2 p-1 px-3'>Sign In</Link>
            <Link prefetch={false} href={"/register"} className='signup mx-2 p-1 px-3'>Sign Up</Link>
        </div>
        </div>
    </section>
  )
}

export default EmptySingnIn;