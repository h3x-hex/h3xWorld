import { useState, useRef, Suspense  } from 'react'
import StarsCanvas from '../components/Stars'
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { getDatabase, ref, set } from "firebase/database";
import { features, pricingOptions } from "../constants";
import { CheckCircle2, ArrowDown } from "lucide-react";
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { H3xCard } from '../components/H3xCard';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import * as THREE from 'three'


function Home() {
  const [count, setCount] = useState(0)
  const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const homeRef = useRef(null);
  const [email, setEmail] = useState('');
  const [addedToWaitlist, setAddedToWaitlist] = useState(false);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth'
    })
  }

  const [text] = useTypewriter({
    words: ['Portfolio', 'Brand', 'Blog', 'Shop', 'Campaign', 'Community', 'Link in Bio'],
    loop: {},
    typeSpeed: 100,
  })

  function addUserToWaitlist(){
    const timestamp = new Date().getTime();
    const db = getDatabase();
    set(ref(db, `Waitlist/${timestamp}`), email);
    setAddedToWaitlist(true);
  }

  return (
    <>
    {
      isMobile ?

      <div className='h-full w-screen bg-stone-950 text-white' ref={homeRef}>
        <div className='h-full relative z-0'>
        <div className='flex flex-col pt-16 gap-16 '>
          <div className='flex flex-col mx-auto gap-3 pl-3'>
            <h1 className='text-5xl'>Welcome to h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
            <h1 className='text-2xl'>Web3 Social Media for creators, artists, and entrepreneurs.</h1>
          </div>
          <div className='flex flex-col mx-auto pr-3 gap-3'>
            <div className='flex flex-col gap-3 items-center justify-center'>
              {
                addedToWaitlist ?

                <h1  className='text-xl mx-auto pb-3'>Joined the h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World beta waitlist. Thank you and see you soon!</h1>
                :
                <h1  className='text-xl mx-auto pb-3'>Join the h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World beta waitlist.</h1>
              }
              <input type="text" placeholder="Email" className="input input-bordered text-lg text-white w-80" disabled={addedToWaitlist} value={email} onChange={(e) => setEmail(e.target.value)}/>
              <button className='btn btn-warning w-80' onClick={() => addUserToWaitlist()} disabled={addedToWaitlist}>Join h3x|World</button>
              <div className='pt-10'><ArrowDown className='text-warning hover:cursor-pointer mx-auto' onClick={() => scrollToSection(featuresRef)}/></div>
            </div>
          </div>
        </div>
        <div className="relative mt-28 border-b border-neutral-800 pt-6" ref={featuresRef}>
            <div className="text-center">
              <span className="bg-neutral-900 text-warning rounded-full h-12 text-3xl font-medium px-6 py-3">
                Features
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl pt-8 tracking-wide">
                Easily build your 
                <span className='font-bold text-warning'> {text}</span>
                <span className='text-warning'><Cursor cursorStyle='|'/></span>
              </h2>
            </div>
            <div className="flex flex-wrap mt-10 lg:mt-20">
              {features.map((feature, index) => (
                <div key={index} className="sm:w-1/2 lg:w-1/3">
                  <div className="flex">
                    <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-warning justify-center items-center rounded-full">
                      {feature.icon}
                    </div>
                    <div className='w-8/12'>
                      <h5 className="mt-1 mb-1 text-xl border-b-2 border-warning">{feature.text}</h5>
                      <p className="text-md p-2 mb-20 text-white">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center ">
              <span className="bg-neutral-900 text-warning rounded-full h-12 text-3xl font-medium px-6 py-3">
                h3xPremium
              </span>
              <p>for more storage (Free Tier 1GB)</p>
              <div className="flex flex-col pt-8">
                {pricingOptions.map((option, index) => (
                  <div key={index} className=" p-2">
                    <div className="p-10 border border-warning rounded-xl">
                      <p className="text-4xl mb-8 border-b-2 border-warning">
                        {option.title}
                        {option.title === "Pro" && (
                          <span className="text-warning bg-clip-text text-xl mb-4 ml-2">
                            (Most Popular)
                          </span>
                        )}
                      </p>
                      <p className="mb-8">
                        <span className="text-5xl mt-6 mr-2">{option.price}</span>
                        <span className="text-neutral-400 tracking-tight">/Month</span>
                      </p>
                      <ul>
                        {option.features.map((feature, index) => (
                          <li key={index} className="mt-8 flex items-center">
                            <CheckCircle2 />
                            <span className="ml-2">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#"
                        className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-warning hover:text-black border border-warning rounded-full transition duration-200"
                      >
                        Subscribe
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center py-20 mx-auto">
              <span className="bg-neutral-900 text-warning rounded-full h-12 text-3xl font-medium px-6 py-3">
                Buy h3xCard
              </span>
              <p>Fun fact: Card is in 3D Space, you can move it around.</p>
              <div className="flex flex-wrap py-8 h-96">
                <Canvas className='w-screen h-screen bg-stone-900'>
                  <ambientLight intensity={100}/>
                  <OrbitControls enableZoom={false}/>
                  <H3xCard scale={[0.4, 0.4, 0.4]}/>
                </Canvas>
              </div>
              <button className='btn btn-warning rounded-full' onClick={() => scrollToSection(homeRef)}>Coming Soon...</button>
            </div>
          </div>
          <StarsCanvas />
      </div>
    



    
    </div>
    :
    <div className='h-full bg-black text-white' ref={homeRef}>
      <div className='h-full bg-black relative z-0'>
          <div className='flex flex-col pt-36 gap-36'>
            <div className='flex flex-col mx-auto text-center'>
              <h1 className='text-[96px]'>Welcome to h<span className='text-[#D69E2E]'>3</span>x<span className='text-[#888888]'>.</span>world</h1>
              <h1 className='text-2xl'>Web3 Social Media for creators, artists, and entrepreneurs.</h1>
            </div>
            <div className='flex flex-row mx-auto pr-3 gap-8'>
              <div className='flex flex-col gap-3 items-center justify-center'>
                {
                  addedToWaitlist ?

                  <h1  className='text-xl mx-auto pb-3'>Joined the h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>.</span>world beta waitlist. Thank you and see you soon!</h1>
                  :
                  <h1  className='text-xl mx-auto pb-3'>Join the h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>.</span>world beta waitlist.</h1>
                }
                <input type="text" placeholder="Email" className="input input-bordered text-lg text-black w-80" disabled={addedToWaitlist} value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button className='btn btn-warning w-80' onClick={() => addUserToWaitlist()} disabled={addedToWaitlist}>Join h3x.world</button>
                <div className='pt-10'><ArrowDown className='text-warning hover:cursor-pointer mx-auto' onClick={() => scrollToSection(featuresRef)}/></div>
              </div>
            </div>
            
          </div>
          <div className="relative mt-28 border-b border-neutral-800 pt-6" ref={featuresRef}>
            <div className="text-center">
              <span className="bg-neutral-900 text-warning rounded-full h-12 text-3xl font-medium px-6 py-3">
                Features
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl pt-8 tracking-wide">
                Easily build your 
                <span className='font-bold text-warning'> {text}</span>
                <span className='text-warning'><Cursor cursorStyle='|'/></span>
              </h2>
            </div>
            <div className="flex flex-wrap mt-10 lg:mt-20">
              {features.map((feature, index) => (
                <div key={index} className="sm:w-1/2 lg:w-1/3">
                  <div className="flex">
                    <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-warning justify-center items-center rounded-full">
                      {feature.icon}
                    </div>
                    <div className='w-8/12'>
                      <h5 className="mt-1 mb-1 text-xl border-b-2 border-warning">{feature.text}</h5>
                      <p className="text-md p-2 mb-20 text-white">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center ">
              <span className="bg-neutral-900 text-warning rounded-full h-12 text-3xl font-medium px-6 py-3">
                h3xPremium
              </span>
              <p className='pt-3'>for more storage (Free Tier 1GB)</p>
              <div className="flex flex-wrap pt-8">
                {pricingOptions.map((option, index) => (
                  <div key={index} className="w-1/4 p-2">
                    <div className="p-10 border border-warning rounded-xl">
                      <p className="text-4xl mb-8 border-b-2 border-warning">
                        {option.title}
                        {option.title === "Pro" && (
                          <span className="text-warning bg-clip-text text-xl mb-4 ml-2">
                            (Most Popular)
                          </span>
                        )}
                      </p>
                      <p className="mb-8">
                        <span className="text-5xl mt-6 mr-2">{option.price}</span>
                        <span className="text-neutral-400 tracking-tight">/Month</span>
                      </p>
                      <ul>
                        {option.features.map((feature, index) => (
                          <li key={index} className="mt-8 flex items-center">
                            <CheckCircle2 />
                            <span className="ml-2">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#"
                        className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-warning hover:text-black border border-warning rounded-full transition duration-200"
                      >
                        Subscribe
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center py-20 mx-auto">
              <span className="bg-neutral-900 text-warning rounded-full h-12 text-3xl font-medium px-6 py-3">
                Buy h3xCard
              </span>
              <p>Fun fact: Card is in 3D Space, you can move it around.</p>
              <div className="flex flex-wrap py-8 h-screen">
                <Canvas className='w-96 h-96 bg-stone-900'>
                  <ambientLight intensity={100}/>
                  <OrbitControls enableZoom={false}/>
                  <H3xCard scale={[0.4, 0.4, 0.4]}/>
                </Canvas>
              </div>
              <button className='btn btn-warning rounded-full' onClick={() => scrollToSection(homeRef)}>Coming Soon...</button>
            </div>
          </div>
          <StarsCanvas />
      </div>
    </div>
    }
    </>
  )
}

export default Home;
