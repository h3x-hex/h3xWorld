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

    useEffect(() => {
        const db = getDatabase();
        const postRef = ref(db, 'Posts/' + profileUser.username + 'Blog');
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            setPosts(data);
            console.log(data)
        });
    }, []);






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
                                    <div className='flex flex-row gap-8 pt-6'>
                                        <p className='text-xl font-bold pt-12'>{posts[post].postTitle}</p>
                                        <img className='pt-6 pl-6' src={posts[post].files}></img>
                                    </div>
                                    <p>{posts[post].postContent}</p>
                                    

                                </div>
                                
                            </div>
                            <div className='flex flex-row gap-3'>
                                <button className='btn btn-ghost' onClick={() => updateLike()}>{posts[post].likesCount}<img src={'/like.png'} width={24} height={24}/></button>
                                <button className='btn btn-ghost'>{posts[post].commentsCount}<img src={'/comment.png'} width={24} height={24}/></button>
                                <button className='btn btn-ghost'>{posts[post].commentsCount}<img src={'/postAward.png'} width={24} height={24}/></button>
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
                <div className='divider divider-warning my-0 w-4/12 mx-auto'></div>

            </div>
            <div className="flex flex-col w-4/12 mx-auto gap-3">
            
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
                                    <div className='flex flex-row gap-8 pt-6'>
                                        <p className='text-xl font-bold pt-12'>{posts[post].postTitle}</p>
                                        <img className='pt-6 pl-6' src={posts[post].files}></img>
                                    </div>
                                    <div>
                                        <ReactQuill 
                                            value={posts[post].postContent.substring(1,69)}
                                            readOnly={true}
                                            theme={'bubble'}
                                        />
                                    </div>
                                    

                                </div>
                                
                            </div>
                            <div className='flex flex-row gap-3'>
                                <button className='btn btn-ghost' onClick={() => updateLike()}>{posts[post].likesCount}<img src={'/like.png'} width={24} height={24}/></button>
                                <button className='btn btn-ghost'>{posts[post].commentsCount}<img src={'/comment.png'} width={24} height={24}/></button>
                                <button className='btn btn-ghost'>{posts[post].commentsCount}<img src={'/postAward.png'} width={24} height={24}/></button>
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
                    <div className='divider divider-warning my-0 w-4/12 mx-auto'></div>

                </div>
                    <p className='mx-auto text-center pt-12'>No posts yet...</p>
                </>

            
        

        }
        
        
    </>
    )
}