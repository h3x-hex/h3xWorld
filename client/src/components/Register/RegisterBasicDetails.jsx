import { useState } from 'react'
import StarsCanvas from '../../components/Stars'
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { useUserStore } from '../../stores/user-store'
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


export function RegisterBasicDetails({setPages, user, setUser}) {


    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();

    const [imageUploaded, setImageUploaded ] = useState('false');

    const [password, setPassword] = useState('');

    function addDetails(){
        console.log(user)

        //Check Fields

            console.log(user)
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, password)
            .then((userCredential) => {
                // Signed up 
                setUser({...user, createdAt: new Date().getTime()})
                updateProfile(auth.currentUser, {
                    displayName: user.username
                  }).then(() => {
                    // Profile updated!
                    const db = getDatabase();
                    set(ref(db, `Users/${user.username}`), user);
                    setPages(2);
                  }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error)
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                alert(errorCode)
            });
        
    }

    return(
        <>
        {
                isMobile ?

                <>
                    <div className='h-full w-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]  from-gray-800 via-stone-800 to-stone-900 text-white'>
                        <div className='h-full relative z-0 '>
                            <div className='flex flex-col pt-16 gap-16 pl-3 '>
                                <div className='flex mx-auto'>
                                    <h1 className='text-5xl'>Join h<span className='text-[#F0B90B]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
                                </div>
                                <div className="avatar mx-auto ">
                                    <div className="ring-[#F0B90B] btn bg-transparent text-white  w-48 h-48 rounded-full ring">
                                        {
                                        
                                            imageUploaded ?

                                            <p className='pl-1 pt-[5.5rem] hover:cursor-pointer'>Click to add image</p>
                                            :
                                            <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'></img>
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 '>
                                    <div className='flex flex-row w-full pr-2 gap-1 mb-0'>
                                        <input type="text" placeholder="First Name" value={user.firstName} onChange={(e) => (setUser({...user, firstName: e.target.value}))} className="text-white w-3/6 input bg-transparent border-[#F0B90B] focus:border-warning focus:bg-transparent rounded-full" />
                                        <input type="text" placeholder="Last Name" value={user.lastName} onChange={(e) => (setUser({...user, lastName: e.target.value}))}  className="text-white w-3/6 input bg-transparent border-[#F0B90B]  focus:border-warning focus:bg-transparent rounded-full" />
                                    </div>
                                    <div className='flex flex-col mt-0 gap-3 pr-2 pb-8'>
                                        <input type="text" placeholder="Username" value={user.username} onChange={(e) => (setUser({...user, username: e.target.value}))} className=" input bg-transparent border-warning text-white focus:border-warning focus:bg-transparent rounded-full w-full" />
                                        <input type="text" placeholder="Email" value={user.email} onChange={(e) => (setUser({...user, email: e.target.value}))}  className="input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full w-full" />
                                        <input type="password" placeholder="Password" value={password} onChange={(e) => (setPassword(e.target.value))}  className="input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full w-full" />
                                        <div className='flex flex-row w-full  gap-1 mb-0'>
                                            <input type="text" placeholder="Location" value={user.location} onChange={(e) => (setUser({...user, location: e.target.value}))}  className="w-3/6 input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full" />
                                            <input type="text" placeholder="Ocuupation" value={user.occupation} onChange={(e) => (setUser({...user, occupation: e.target.value}))}  className="w-3/6 input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full" />
                                        </div>    
                                        <textarea className="textarea textarea-warning bg-transparent h-36 rounded-3xl" value={user.bio} onChange={(e) => (setUser({...user, bio: e.target.value}))} placeholder="Bio"></textarea>
                                        <button className='btn btn-warning border-none rounded-full ' onClick={() => addDetails()}>Next</button>
                                    </div> 
                                </div>                               
                            </div>
                            <StarsCanvas />
                        </div>
                    </div>
                </>
                :
                <>
                    <div className='h-full w-screen  bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]  from-gray-800 via-stone-900 to-stone-900 text-white items-center justify-center'>
                        <div className='h-full relative z-0 mx-auto '>
                            <div className='flex flex-col pt-16 gap-16 pl-3 mx-auto'>
                                <div className='flex mx-auto'>
                                    <h1 className='text-5xl'>Join h<span className='text-[#F0B90B]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
                                </div>
                                <div className="avatar mx-auto ">
                                    <div className="ring-[#F0B90B] btn bg-transparent hover:bg-transparent hover:text-lg text-white  w-48 h-48 rounded-full ring">
                                        {
                                        
                                            imageUploaded ?

                                            <p className='pl-1 pt-20 hover:cursor-pointer'>Click to add image</p>
                                            :
                                            <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'></img>
                                        }
                                    </div>
                                </div>
                                <div className='flex flex-col gap-3 w-2/6 mx-auto'>
                                    <div className='flex flex-row w-full pr-2 gap-1 mb-0'>
                                        <input type="text" placeholder="First Name" value={user.firstName} onChange={(e) => (setUser({...user, firstName: e.target.value}))} className="w-3/6 input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full" />
                                        <input type="text" placeholder="Last Name" value={user.lastName} onChange={(e) => (setUser({...user, lastName: e.target.value}))} className="w-3/6 input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full" />
                                    </div>
                                    <div className='flex flex-col mt-0 gap-3 pr-2 pb-8'>
                                        <input type="text" placeholder="Username"  value={user.username} onChange={(e) => (setUser({...user, username: e.target.value}))} className=" input bg-transparent border-warning text-white focus:border-warning focus:bg-transparent rounded-full w-full" />
                                        <input type="text" placeholder="Email" value={user.email} onChange={(e) => (setUser({...user, email: e.target.value}))} className="input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full w-full" />
                                        <input type="password" placeholder="Password" value={password} onChange={(e) => (setPassword(e.target.value))} className="input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full w-full" />
                                        <div className='flex flex-row w-full  gap-1 mb-0'>
                                            <input type="text" placeholder="Location"  value={user.location} onChange={(e) => (setUser({...user, location: e.target.value}))} className="w-3/6 input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full" />
                                            <input type="text" placeholder="Ocuupation" value={user.occupation} onChange={(e) => (setUser({...user, occupation: e.target.value}))} className="w-3/6 input bg-transparent border-[#F0B90B] text-white focus:border-warning focus:bg-transparent rounded-full" />
                                        </div>    
                                        <textarea className="textarea textarea-warning bg-transparent h-36 rounded-3xl" value={user.bio} onChange={(e) => (setUser({...user, bio: e.target.value}))} placeholder="Bio"></textarea>
                                        <button className='btn btn-warning border-none rounded-full '  onClick={() => addDetails()}>Next</button>
                                    </div> 
                                </div>     
                            </div>
                            <StarsCanvas />
                        </div>
                    </div>
                </>
            }
        </>
    )
}