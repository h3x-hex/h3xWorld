import { getAuth } from 'firebase/auth';
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { getDatabase, ref, onValue } from "firebase/database";


export default function Portfolio ({profileUser}) {

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const db = getDatabase();
        const postRef = ref(db, 'Posts/' + profileUser.username + 'Portfolio');
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            setPosts(data);
            
        });
    }, []);






    return (
        <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Portfolio</p>
                <div className='divider divider-warning my-0'></div>

            </div>
        
        {
            isMobile ?
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
                                    <div className='pt-12 mx-auto flex flex-col'>
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
                            </div>
                            <div className='divider divider-warning'></div>
                        </div>
                    )})
                }
                
                
            </div>


            :

            <div className="flex flex-col w-8/12 mx-auto gap-3">
            
                {
                    Object.keys(posts).map((post) => {
                        return (
                        <div key={post} className="card bg-transparent w-full shadow-xl">  
                            <div className="card-body  mx-auto">
                                <div>
                                    <div tabIndex={0} role="button" className="btn btn-outline border-warning hover:border-warning btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                        <img
                                            alt="Profile Photo"
                                            src={posts[post].userPhotoURL} />
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel w-64 mx-auto">
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
                                <h2 className="text-xl mx-auto">{posts[post].postContent}</h2>
                            </div>
                            <div className='divider divider-neutral w-6/12 mx-auto'></div>
                        </div>
                    )})
                }
        </div>
        }
    </>
    )
}