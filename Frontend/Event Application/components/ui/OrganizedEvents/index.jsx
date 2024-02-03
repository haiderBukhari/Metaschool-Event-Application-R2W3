import React from 'react'
import Image from "next/image"
import NavLink from '../NavLink'

const OrganizedEvents = ({image, title}) => {
    return (
        <div className='min-h-[400px] max-w-[300px] border-1 m-4 shadow-2xl relative rounded-lg' style={{ border: "1px solid #ccc" }}>
            <Image style={{ width: "300px", height: "auto", borderRadius: "10px" }} src={image} alt="bg" />
            <h1 className="font-bold text-xl text-center mx-1 my-3 font-sans">{title}</h1>
            <div className="flex justify-end">
                <NavLink
                    href="/login"
                    className="py-2 px-4 text-center rounded-3xl duration-150 text-white text-bold text-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition mr-2"
                >
                    Details
                </NavLink>
            </div>
        </div>
    )
}

export default OrganizedEvents