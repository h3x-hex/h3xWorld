import { useState } from 'react'
import StarsCanvas from '../components/Stars'
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { getDatabase, ref, set } from "firebase/database";


function Home() {
  const [count, setCount] = useState(0)
  const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [addedToWaitlist, setAddedToWaitlist] = useState(false);

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

      <div className='h-screen w-screen bg-stone-950 text-white'>
    <div className='h-screen relative z-0'>
    <div className='flex flex-col pt-16 gap-16 pl-3 '>
      <div className='flex flex-col mx-auto'>
        <h1 className='text-5xl'>Welcome to h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
        <h1 className='text-2xl'>Web3 Social Media</h1>
      </div>
      <div className='flex flex-col mx-auto pr-3 gap-3'>
        <div className='flex flex-col gap-3 items-center justify-center'>
          {
            addedToWaitlist ?

            <h1  className='text-xl mx-auto pb-3'>Joined the h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World beta waitlist. Thank you and see you soon!</h1>
            :
            <h1  className='text-xl mx-auto pb-3'>Join the h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World beta waitlist.</h1>
          }
          <input type="text" placeholder="Email" className="input input-bordered text-lg text-black w-80" disabled={addedToWaitlist} value={email} onChange={(e) => setEmail(e.target.value)}/>
          <button className='btn btn-warning w-80' onClick={() => addUserToWaitlist()} disabled={addedToWaitlist}>Join h3x|World</button>
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
        <div className='flex flex-col mx-auto text-center'>
          <h1 className='text-[96px]'>Welcome to h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
          <h1 className='text-2xl'>Web3 Social Media for creators, artists, and entrepreneurs.</h1>
        </div>
        <div className='flex flex-row mx-auto pr-3 gap-8'>
          <div className='flex flex-col gap-3 items-center justify-center'>
            {
              addedToWaitlist ?

              <h1  className='text-xl mx-auto pb-3'>Joined the h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World beta waitlist. Thank you and see you soon!</h1>
              :
              <h1  className='text-xl mx-auto pb-3'>Join the h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World beta waitlist.</h1>
            }
            <input type="text" placeholder="Email" className="input input-bordered text-lg text-black w-80" disabled={addedToWaitlist} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button className='btn btn-warning w-80' onClick={() => addUserToWaitlist()} disabled={addedToWaitlist}>Join h3x|World</button>
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
