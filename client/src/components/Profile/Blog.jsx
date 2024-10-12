import { getAuth } from 'firebase/auth';
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { getDatabase, ref, onValue } from "firebase/database";
import ReactQuill from 'react-quill';


export default function Blog ({profileUser}) {

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [posts, setPosts] = useState([])
    const [postAwardType, setPostAwardType] = useState('')
    const [postAwardSteps, setPostAwardSteps] = useState(0);

    useEffect(() => {
        const db = getDatabase();
        const postRef = ref(db, 'Posts/' + profileUser.username + 'Blog');
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            setPosts(data);
            console.log(data)
        });
    }, []);


    function setPostAward(awardType)
    {
        if (awardType === 'Fiat')
        {
            setPostAwardType('Fiat');
            setPostAwardSteps(1);
        }
        else
        {
            setPostAwardType('Crypto');
            setPostAwardSteps(1);
        }
    }



    return (
        <>
        {
            posts ?
            isMobile ?
            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Blog</p>
                <div className='divider divider-warning my-0 w-5/12 mx-auto'></div>

            </div>
            <div className="flex flex-col mx-auto px-1 gap-3 pb-8">
                
                {
                    Object.keys(posts).map((post) => {
                        return (
                        <div key={post} className="card bg-transparent w-full shadow-xl">  
                            <div className="card-body mx-auto">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 absolute left-3'>
                                        <div tabIndex={0} role="button" className="btn btn-outline border-warning hover:border-warning btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                            <img
                                                alt="Profile Photo"
                                                src={posts[post].postUserPhotoURl} />
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-3'>
                                            <p className='text-lg font-bold'>{posts[post].postUserFullName}</p>
                                            <p className='text-md pt-[2px]'>@{posts[post].postUsername}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-row'>
                                        <div className='flex flex-col gap-8 pt-6'>
                                            <p className='text-xl font-bold pt-12'>{posts[post].postTitle}</p>
                                            <ReactQuill 
                                                value={posts[post].postContent.substring(4,128)}
                                                readOnly={true}
                                                theme={'bubble'}
                                            />
                                        </div>
                                        <div className='h-48 w-48'>
                                            <img className='pt-32 pl-6' src={posts[post].files}></img>
                                        </div>
                                        
                                    </div>
                                    

                                </div>
                                
                            </div>
                            <div className='flex flex-row gap-3'>
                                <button className='btn btn-ghost' onClick={() => updateLike()}>{posts[post].likesCount}<img src={'/like.png'} width={24} height={24}/></button>
                                <button className='btn btn-ghost'>{posts[post].commentsCount}<img src={'/comment.png'} width={24} height={24}/></button>
                                <button className='btn btn-ghost' onClick={() => {if(document)document.getElementById('postAwardModal').showModal()}}   >{posts[post].commentsCount}<img src={'/postAward.png'} width={24} height={24}/></button>
                            </div>
                            <div className='divider divider-warning'></div>
                        </div>
                    )})
                }
                
                
            </div>
            </>

            :
            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Blog</p>
                <div className='divider divider-warning my-0 w-2/12 mx-auto'></div>

            </div>
            <div className="flex flex-col w-6/12 mx-auto gap-3">
            
            {
                    Object.keys(posts).map((post) => {
                        return (
                        <div key={post} className="card bg-transparent w-full shadow-xl">  
                            <div className="card-body mx-auto">
                            <div className='flex flex-col gap-1'>

                                <div className='flex flex-row gap-2 absolute left-3'>
                                    <div tabIndex={0} role="button" className="btn btn-outline border-warning hover:border-warning btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                        <img
                                            alt="Profile Photo"
                                            src={posts[post].postUserPhotoURL} />
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <p className='text-lg font-bold'>{posts[post].postUserFullName}</p>
                                        <p className='text-md pt-[2px]'>@{posts[post].postUsername}</p>
                                    </div>
                                </div>
                                <div className='flex flex-row'>
                                    <div className='flex flex-col gap-8 pt-6'>
                                        <p className='text-xl font-bold pt-12'>{posts[post].postTitle}</p>
                                        <ReactQuill 
                                            value={posts[post].postContent.substring(4,128)}
                                            readOnly={true}
                                            theme={'bubble'}
                                        />
                                    </div>
                                    <div className='h-48 w-48'>
                                        <img className='pt-8 pl-6' src={posts[post].files}></img>
                                    </div>
                                    
                                </div>


                                </div>
                                    
                                </div>
                                    
                            <div className='flex flex-row gap-3'>
                                <button className='btn btn-ghost' onClick={() => updateLike()}>{posts[post].likesCount}<img src={'/like.png'} width={24} height={24}/></button>
                                <button className='btn btn-ghost'>{posts[post].commentsCount}<img src={'/comment.png'} width={24} height={24}/></button>
                                <button className='btn btn-ghost' onClick={() => {if(document)document.getElementById('postAwardModal').showModal()}}>{posts[post].commentsCount}<img src={'/postAward.png'} width={24} height={24}/></button>
                            </div>
                        </div>
                    )})
                }
            </div>
            </>
            :
            
                isMobile? 

                <>
                <div className="mx-auto text-center">
                    <p className="text-2xl font-bold pt-8">Blog</p>
                    <div className='divider divider-warning my-0 w-5/12 mx-auto'></div>

                </div>
                    <p className='mx-auto text-center pb-64'>No posts yet...</p>
                </>

                :

                <>
                <div className="mx-auto text-center">
                    <p className="text-2xl font-bold pt-8">Blog</p>
                    <div className='divider divider-warning my-0 w-2/12 mx-auto'></div>

                </div>
                    <p className='mx-auto text-center pt-12'>No posts yet...</p>
                </>

            
        

        }
        
        <dialog id="postAwardModal" className="modal">
            <div className="modal-box bg-stone-900">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className='flex flex-row justify-center'>
                    {
                        postAwardSteps > 0 ?

                        <>
                            <button className='btn btn-ghost bg-transparent text-white hover:text-warning absolute left-0'  onClick={() => setPostAwardSteps(postAwardSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                            <p className='text-2xl text-center'>Post Award</p> 
                        </>

                        :
                        <>
                            <p className='text-2xl text-center'>Post Award</p> 
                        </>
                    }
                </div>
                <div className='divider divider-warning mb-0'></div>
                {
                    postAwardSteps === 0 ?

                    <div className='flex flex-row gap-3 items-center justify-center pt-3'> 
                        <button className='btn btn-warning border-warning bg-transparent text-white hover:text-black w-48' onClick={() => setPostAward('Fiat')}>Fiat Post Award</button>
                        <button className='btn btn-warning border-warning bg-transparent text-white hover:text-black w-48' onClick={() => setPostAward('Crypto')}>Crypto Post Award</button>
                    </div> 

                    :

                    postAwardSteps === 1?

                    <div className='flex flex-col gap-6 pt-3'>
                        <div className='flex flex-row gap-3 items-center justify-center'>
                            <select className='select select-bordered select-warning bg-stone-900 w-3/12'>
                                <option disabled selected className='bg-transparent'>Select Currency</option>
                                {
                                    postAwardType === 'Fiat' ?

                                    <>
                                        <option className='bg-transparent'>USD</option>
                                        <option>GBP</option>
                                        <option>INR</option>
                                        <option>AED</option>
                                    </>
                                    
                                    :
                                    
                                    <>
                                        <option>ETH</option>
                                        <option>MATIC</option>
                                        <option>SOL</option>
                                        <option>XRP</option>
                                    </>
                                }
                            </select>
                            <input className='input input-bordered input-warning bg-transparent w-full' placeholder='Post Award Amount'></input>
                        </div>
                        <button className='btn btn-warning w-full'>Confirm</button>
                    </div>


                    : 

                    <></>
                }                                
            </div>
        </dialog>
    </>
    )
}