import { useState } from 'react'
import StarsCanvas from '../components/Stars'
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'


function Home() {
  const [count, setCount] = useState(0)
  const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
  const navigate = useNavigate();

  return (
    <>
    {
      isMobile ?

      <div className='h-screen w-screen bg-stone-950 text-white'>
    <div className='h-screen relative z-0'>
    <div className='flex flex-col pt-16 gap-16 pl-3 '>
      <div className='flex mx-auto'>
        <h1 className='text-5xl'>Welcome to h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
      </div>
      <div className='flex flex-col mx-auto pr-3 gap-3'>
        <div className='flex flex-col gap-3 items-center justify-center'>
          <h1  className='text-xl mx-auto pb-3'>Join h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
          <label className="input-group">
            <span className='text-xl'>h3x.world/</span>
            <input type="text" placeholder="username" className="input input-bordered text-lg text-black" />
          </label>
          <button className='btn btn-warning w-80'>Join h3x|World</button>
        </div>
        <div className='divider divider-warning'></div>
        <div className='flex flex-col gap-3'>
          <input type="text" placeholder="Username" className="input input-bordered text-lg w-80" />
          <input type="password" placeholder="Password" className="input input-bordered text-lg w-80" />
          <button className='btn btn-warning w-80' onClick={() => navigate('/register')}>Enter h3x|World</button>
        </div>
      </div>
    </div>
          <StarsCanvas />
    </div>
    



    
    </div>
    :
    <div className='h-screen bg-stone-950 text-white'>
      <div className='h-screen relative z-0'>
      <div className='flex flex-col pt-36 gap-36 '>
        <div className='flex mx-auto'>
          <h1 className='text-[96px]'>Welcome to h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
        </div>
        <div className='flex flex-row mx-auto pr-3 gap-8'>
          <div className='flex flex-col gap-3'>
            <h1  className='text-3xl mx-auto pb-3'>Join h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
            <label className="input-group">
              <span className='text-2xl'>h3x.world/</span>
              <input type="text" placeholder="username" className="input input-bordered text-2xl text-black" />
            </label>
            <button className='btn btn-warning'>Join h3x|World</button>
          </div>
          <div className='divider divider-warning divider-horizontal'></div>
          <div className='flex flex-col gap-3'>
            <input type="text" placeholder="Username" className="input input-bordered text-2xl w-96" />
            <input type="password" placeholder="Password" className="input input-bordered text-2xl w-96" />
            <button className='btn btn-warning'>Enter h3x|World</button>
          </div>
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
