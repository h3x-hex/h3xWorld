import { getAuth } from 'firebase/auth';
import { useMediaQuery } from 'react-responsive';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import Create from '../Routes/Create';


export default function Navbar (){
    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const [postImageUploaded, setPostUploaded] = useState(false);
    const [postFiles, setPostFiles] = useState();
    const [postDownloadURL, setPostDownloadURL] = useState();

    async function uploadFiles () {

        const URLs = [];
        for(let i = 0; i < postFiles.length; i++)
        {
            console.log(i)
            const imageRef = ref(storage, `/Posts/${user.displayName}/${postFiles[i].name}`);

            await uploadBytes(imageRef, postFiles[i])
                .then(() => {
                    getDownloadURL(imageRef)
                    .then((url) => {
                        // Insert url into an <img> tag to "download"
                        URLs.push(url);
                    })
                    .catch((error) => {
                      // A full list of error codes is available at
                      // https://firebase.google.com/docs/storage/web/handle-errors
                      
                    });
                })
            .catch((error) => {
            console.log("error");
            });
        }
        setPostDownloadURL(URLs);
        console.log(URLs);
    }

    async function uploadPost() {
        


    }

    return (
        <div className="navbar bg-transparent">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl font-light"><p>h<span className="text-warning">3</span>xWorld</p></a>
            </div>
            <div className="flex-none gap-2">
                {   
                    isMobile ?

                    <div className="flex ">
                        <button className="btn btn-warning btn-outline rounded-full w-12" onClick={() => {if(document)document.getElementById('createPost').showModal()}}><span class="material-symbols-outlined">add</span></button>
                    </div>
                    :
                    <div className="flex ">
                        <button className="btn btn-warning btn-outline rounded-full w-36" onClick={() => {if(document)document.getElementById('createPost').showModal()}}>Create Post</button>
                    </div>
                }
                <div className="dropdown dropdown-end ">
                
                <div tabIndex={0} role="button" className="btn btn-outline border-warning hover:border-warning btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Profile Photo"
                        src={user.photoURL} />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-stone-900 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white gap-3">
                    <li className="">
                    <a className="justify-between">
                        Profile
                    </a>
                    </li>
                    <li><a>Edit Profile</a></li>
                    <div className='divider divider-warning my-0'></div>
                    <li><a><p>h<span className="text-warning">3</span>xStore</p></a></li>
                    <li><a><p>h<span className="text-warning">3</span>xCard</p></a></li>
                    <li><a><p>h<span className="text-warning">3</span>xPro</p></a></li>
                    <div className='divider divider-warning my-0'></div>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </div>
            </div>
            <dialog id="createPost" className="modal">
                {
                    isMobile?
                        <div className="modal-box bg-stone-900 max-w-none w-96">
                            <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            
                            <Create/>
                        </div>
                        :
                        <div className="modal-box bg-stone-900 max-w-none w-[48rem]">
                            <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            
                            <Create/>
                        </div>
                }
            </dialog>
        </div>
    )
}