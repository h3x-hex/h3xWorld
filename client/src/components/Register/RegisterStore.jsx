import { useState } from 'react'
import StarsCanvas from '../../components/Stars'
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'


export default function RegisterStore({setPages, user, setUser}) {

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();

    

    return(
        <>
            {
                isMobile ?

                <div className='flex flex-col h-full bg-[linear-gradient(142deg,_#ffffff,_#111111_16%,_#000000)] gap-8 pb-32 relative z-0'>
                <div className='absolute left-0 top-28'>
                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning' onClick={() => console.log(user)}><span className="material-symbols-outlined">arrow_back</span></button>
                </div>
                <div className='flex mx-auto text-white pt-8 pb-6 pl-3'>
                    <h1 className='text-5xl font-extralight'>Join h<span className='text-[#F0B90B]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
                </div>
                <div className='flex flex-col'> 
                    <div className='flex flex-row pt-8 pl-3'>
                        <img src='portfolio_logo.png' width={36}></img>
                        <h1 className='text-2xl text-white font-bold'>Portfolio</h1>
                    </div>
                    <ul className='text-xl text-white pl-12'>
                        <li className='text-white'><p>Upload photos, videos, GIFs, audio, files.</p></li>
                    </ul>
                </div>

                <div className='flex flex-col'> 
                    <div className='flex flex-row pl-3'>
                        <img src='blog_logo.png' width={36}></img>
                        <h1 className='text-2xl text-white font-bold'>Blog</h1>
                    </div>
                    <ul className='text-xl text-white pl-12'>
                        <li className='text-white'><p>Write your blog posts and start your own newsletter</p></li>
                    </ul>
                </div>

                <div className='flex flex-col'> 
                    <div className='flex flex-row pl-3'>
                        <img src='store.png' width={36}></img>
                        <h1 className='text-2xl text-white font-bold'>h<span className='text-[#F0B90B]'>3</span>xStore</h1>
                    </div>
                    <ul className='text-xl text-white pl-12'>
                        <li className='text-white'><p>Add your digital products to your own store</p></li>
                    </ul>
                </div>

                <div className='flex flex-col'> 
                    <div className='flex flex-row pl-3'>
                        <img src='h3xclusive.png' width={48}></img>
                        <h1 className='text-2xl text-white font-bold'>h<span className='text-[#F0B90B]'>3</span>xClusive</h1>
                    </div>
                    <ul className='text-xl text-white pl-12'>
                        <li className='text-white'><p>Members only section for paid content</p></li>
                    </ul>
                </div>

                <div className='flex mx-auto pt-8'>
                    <button className='btn btn-warning border-none rounded-full w-64'  onClick={() => completeRegistration}>Enter h3xWorld</button>
                </div> 
                <StarsCanvas/>
            </div>

            :

            <div className='flex flex-col h-screen bg-[linear-gradient(142deg,_#ffffff,_#111111_24%,_#000000)] gap-8 mx-auto pt-16 pl-3 relative z-0'>
                <div className='absolute left-3 top-18'>
                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning' onClick={() => setPages(2)}><span className="material-symbols-outlined">arrow_back</span></button>
                </div>
                <div className='flex mx-auto text-white pb-6'>
                    <h1 className='text-5xl font-extralight'>Join h<span className='text-[#F0B90B]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
                </div>
                

                <div className='flex mx-auto pt-8'>
                    <button className='btn btn-warning border-none rounded-full w-64'  onClick={() => completeRegistration()}>Enter h3xWorld</button>
                </div> 
                <StarsCanvas/>
            </div>
            }
        </>
    )
}