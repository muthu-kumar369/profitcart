import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function Footer({ data }) {
    return (
        <>
            <section className=' bg-emerald-900 px-10 lg:px-10 py-5 text-white mt-10 '>
                <div className="grid md:grid-cols-2 lg:grid-cols-3">
                    <div className="logo my-auto">
                        <Link href={"/"}>
                            <Image src={data?.logo} alt='logo'/>
                        </Link>
                    </div>
                    {data?.colums.map((items, index) => {
                        return (
                            <div className='menu-list' key={index}>
                                <p className="title font-bold text-lg uppercase my-3">{items?.name}</p>
                                {items?.items.map((item, index) => {
                                    return (
                                        <div className=' capitalize my-2'>
                                            <Link href={item?.link}>{item?.text}</Link>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <hr className='mt-3'/>
                <div className=' text-right'>
                    <p className="copy-right text-xs py-2"><span>&#169;</span>2024 Copy rights</p>
                </div>
            </section>
        </>
    )
}

export default Footer;