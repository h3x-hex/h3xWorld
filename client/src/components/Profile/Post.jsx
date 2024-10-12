import { getAuth } from 'firebase/auth';
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { getDatabase, ref, onValue } from "firebase/database";


export default function Post ({profileUser}) {

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [posts, setPosts] = useState([])
    const [postMedia, setPostMedia] = useState(null);
    const [postAwardType, setPostAwardType] = useState('')
    const [postAwardSteps, setPostAwardSteps] = useState(0);

    useEffect(() => {
        const db = getDatabase();
        const postRef = ref(db, 'Posts/' + profileUser.username + 'Portfolio');
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            setPosts(data);
            
        });
    }, []);


    function showPostMedia(postImg)
    {
        if(document){document.getElementById('viewPortfolioPhotoModal').showModal()}
        setPostMedia(postImg);
    }

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
            isMobile ?
            <>
                <div className="mx-auto text-center">
                    <p className="text-2xl font-bold pt-8">Posts</p>
                    <div className='divider divider-warning my-0 w-5/12 mx-auto'></div>
                </div>
                <div className="flex flex-col mx-auto px-3 gap-3 pb-8">
                    {
                        Object.keys(posts).map((post) => {
                            console.log(post)
                            return (
                                <>
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
                                        <div className='pt-12 mx-auto flex flex-col '>
                                            <h2 className="text-xl mx-auto">{posts[post].postContent}</h2>
                                        </div>
                                        <div className="carousel w-64 mx-auto pt-12">
                                            {   
                                                posts[post].files.map((postImg) => {
                                                    {console.log(postImg)}
                                                    return(<div className="carousel-item w-full h-full">
                                                        <img
                                                            src={postImg}
                                                            className="w-full"
                                                            alt={posts[post].postContent}
                                                        />
                                                    </div>
                                                )})
                                            }                                    
                                        </div>

                                    </div>
                                    
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <button className='btn btn-ghost' onClick={() => updateLike()}>{posts[post].likesCount}<img src={'/like.png'} width={24} height={24}/></button>
                                    <button className='btn btn-ghost'>{posts[post].commentsCount}<img src={'/comment.png'} width={24} height={24}/></button>
                                    <button className='btn btn-ghost'>{posts[post].commentsCount}<img src={'/postAward.png'} width={24} height={24}/></button>
                                </div>
                            </div>
                            
                            </>
                        )})
                    }
                </div>
            </>

            :
            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Posts</p>
                <div className='divider divider-warning my-0 w-2/12 mx-auto'></div>

            </div>
            <div className="flex flex-col w-4/12 mx-auto gap-3">
            
            {
                    Object.keys(posts).map((post) => {
                        return (
                            <>
                            <div key={post} className="card bg-transparent w-full shadow-xl">  
                                <div className="card-body">
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
                                        <div className='pt-16'>
                                            <h2 className="text-xl ">{posts[post].postContent}</h2>
                                        </div>
                                        <div className="carousel w-64 mx-auto pt-12">
                                            {   
                                                posts[post].files.map((postImg) => {
                                                    {console.log(postImg)}
                                                    return(<div className="carousel-item w-full h-full cursor-pointer">
                                                        <img
                                                            src={postImg}
                                                            className="w-full"
                                                            alt={posts[post].postContent}
                                                            onClick={() => showPostMedia(postImg)}
                                                        />
                                                    </div>
                                                )})
                                                
                                            }                                    
                                        </div>

                                    </div>
                                    
                                </div>
                                <div className='flex flex-row gap-3 pl-3'>
                                    <div className='flex flex-row'>
                                        <button className='btn btn-ghost w-1'>{posts[post].likesCount}</button>
                                        <button className='btn btn-ghost' onClick={() => updateLike()}><img src={'/like.png'} width={24} height={24}/></button>
                                    </div>
                                    <div className='flex flex-row'>
                                        <button className='btn btn-ghost w-1'>{posts[post].commentsCount}</button>
                                        <button className='btn btn-ghost' onClick={() => updateLike()}><img src={'/comment.png'} width={24} height={24}/></button>
                                    </div>
                                    <div className='flex flex-row'>
                                        <button className='btn btn-ghost w-1'>{posts[post].postAwards}</button>
                                        <button className='btn btn-ghost' onClick={() => {if(document)document.getElementById('postAwardModal').showModal()}}><img src={'/postAward.png'} width={24} height={24}/></button>
                                    </div>
                                </div>
                                
                            </div>
                        
                        </>
                    )})
                }
        </div>
        <dialog id="viewPortfolioPhotoModal" className="modal">
            <div className="modal-box bg-stone-900">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <>
                    <div className="carousel-item w-full h-full cursor-pointer">
                        <img
                            src={postMedia}
                            className="w-full"
                            onClick={() => {if(document){document.getElementById('viewPortfolioPhotoModal').showModal()}}}
                        />
                    </div>
                </>                                 
            </div>
        </dialog>
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

                    <>
                    </>

                    : 

                    <></>
                }                                
            </div>
        </dialog>
        </>
        }
    </>
    )
}