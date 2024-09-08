import { useState, useRef } from 'react'
import StarsCanvas from '../../components/Stars'
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { useUserStore } from '../../stores/user-store'
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL  } from "firebase/storage";

export function RegisterBasicDetails({setPages, user, setUser}) {


    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();


    const [file, setFile] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [imageUploaded, setImageUploaded ] = useState(false);
    const fileUploadRef = useRef()

    const [password, setPassword] = useState('');

    function handleChange(e) {
        console.log(e.target.files);
        setFile(e.target.files[0]);
        setImgURL(URL.createObjectURL(e.target.files[0]));
        setImageUploaded(true)
    }

    function uploadImage(){
        document.getElementById("fileUpload").click()
    }

   
    function addDetails(){
        console.log(user)

        //Check Fields

            console.log(user)
            const auth = getAuth();
            const createdAt = new Date().getTime()
            createUserWithEmailAndPassword(auth, user.email, password)
            .then((userCredential) => {
                // Signed up 
                if(imageUploaded)
                {
                    const storage = getStorage();
                    const storageBucketRef = storageRef(storage, `Users/${user.username}`);
                    
                    uploadBytes(storageBucketRef, file).then((snapshot) => {
                        console.log('Uploaded a blob or file!');
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            setUser({...user, photoURL: downloadURL, createdAt: createdAt})
                            updateProfile(auth.currentUser, {
                                displayName: user.username,
                                photoURL: downloadURL,
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
                        });
                    })
                }

                else
                {
                    setUser({...user, createdAt: createdAt})
                    updateProfile(auth.currentUser, {
                        displayName: user.username,
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
                }
                
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
                            <div className='absolute left-0 top-36'>
                                <button className='btn btn-ghost bg-transparent text-white hover:text-warning' onClick={() => navigate('/login')}><span className="material-symbols-outlined">arrow_back</span></button>
                            </div>
                            <div className='flex flex-col pt-16  pl-3 '>
                                
                                <div className='flex mx-auto'>
                                    <h1 className='text-5xl font-light'>Join h<span className='text-[#F0B90B]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
                                </div>
                                <div className="flex flex-col items-center pt-6">
                                <h1 className='text-xl py-5'>Enter Profile Details</h1>
                                    <div className="avatar ">
                                        <div className="w-48 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2" onClick={() => uploadImage()}>
                                            <img src={imgURL ? imgURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} width={256} height={256}/>
                                        </div>
                                    </div>
            
                                    <div className="">
                                    <input 
                                        id='fileUpload'
                                        type="file" 
                                        accept="image/*" 
                                        fileName={imgURL}
                                        className="file-input file-input-bordered w-80 invisible" 
                                        onChange={handleChange}
                                        ref={fileUploadRef}
                                    />
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
                            <div className='absolute left-96 top-16'>
                                <button className='btn btn-ghost bg-transparent text-white hover:text-warning' onClick={() => navigate('/login')}><span className="material-symbols-outlined">arrow_back</span></button>
                            </div>
                            <div className='flex flex-col pt-16 gap-3  mx-auto'>
                                <div className='flex mx-auto pb-8'>
                                    <h1 className='text-5xl'>Join h<span className='text-[#F0B90B]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
                                </div>
                                <div className="avatar mx-auto cursor-pointer">
                                    <div className="w-48 rounded-full ring ring-neutral ring-offset-base-100 ring-offset-2" onClick={() => uploadImage()}>
                                        <img src={imgURL ? imgURL : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} width={256} height={256}/>
                                    </div>
                                    
                                </div>
                                <div className="">
                                    <input 
                                        id='fileUpload'
                                        type="file" 
                                        accept="image/*" 
                                        fileName={imgURL}
                                        className="file-input file-input-bordered w-80 invisible" 
                                        onChange={handleChange}
                                        ref={fileUploadRef}
                                    />
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