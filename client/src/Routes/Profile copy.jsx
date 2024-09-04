import * as React from 'react';
import { useState, useEffect } from 'react'
import StarsCanvas from '../components/Stars'
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";


export default function Profile () {

    let { username } = useParams();
    const auth = getAuth();
    const user = auth.currentUser;

    const [profileUser, setProfileUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        location: '',
        occupation: '',
        bio: '',
        socialLinksPlatforms: [],
        socialLinksURL: [],
        storeName: '',
        h3xClusiveName: '',
        profileViews: '',
        createdAt: 0,
    })

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();

    const [tab, setTab] = useState('1');

    const switchPostTab = (tab) => {

        console.log(tab);
    
        if(tab == "1"){
            if (document) {
    
                (document.getElementById('profileTab1')).className = "tab cursor-pointer tab-active text-white text-xl [--tab-border-color:warning]";
                (document.getElementById('profileTab2')).className = "tab cursor-pointer text-white text-lg";
                (document.getElementById('profileTab3')).className = "tab cursor-pointer text-white text-lg";
                setWalletTabs(tab);
            }
        }
        if(tab == "2"){
            if (document) {
    
                (document.getElementById('profileTab2')).className = "tab cursor-pointer tab-active text-white text-xl [--tab-border-color:warning]";
                (document.getElementById('profileTab1')).className = "tab cursor-pointer text-white text-lg" ;
                (document.getElementById('profileTab3')).className = "tab cursor-pointer text-white text-lg";
                setAssetsTab(tab);
            }
        }
        if(tab == "3"){
            if (document) {
    
                (document.getElementById('profileTab3')).className = "tab cursor-pointer tab-active text-white text-xl [--tab-border-color:warning]";
                (document.getElementById('profileTab2')).className = "tab cursor-pointer text-white text-lg";
                (document.getElementById('profileTab1')).className = "tab cursor-pointer text-white text-lg";
                setAssetsTab(tab);
            }
        }
    
    }

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, `Users/${username}`);
        onValue(userRef, (snapshot) => {
            setProfileUser(snapshot.val());
            
        });
      }, []);
    

    return(
        <>
            {
                isMobile ?

                <div className='h-full bg-stone-900 text-white'>
                    <Navbar/>
                    <div className='h-full relative z-0 pb-12'>
                        <div className='flex flex-col gap-3'>
                            <div className="avatar mx-auto">
                                <div className="w-36 rounded-full ring ring-offset-2">
                                    <img src="/logo.png" />
                                </div>
                            </div>
                            <div className='flex mx-auto text-white'>
                                <h1 className='text-white text-3xl font-semibold'>{profileUser.firstName} {profileUser.lastName}</h1>
                            </div>
                            <div className='flex mx-auto text-white'>
                                <h1 className='text-white text-2xl font-semibold'>@{profileUser.username}</h1>
                            </div>
                            <div className='flex flex-row mx-auto gap-6'>
                                <div className='flex flex-row text-white'>
                                    <div className='pt-1'>
                                        <span class="material-symbols-outlined">location_on</span>
                                    </div>
                                    
                                    <p className='text-white text-lg font-semibold'>{profileUser.location}</p>
                                
                                </div>

                                <div className='flex flex-row text-white gap-1'>
                                    <div className='pt-1'>
                                        <span class="material-symbols-outlined">work</span>
                                    </div>
                                    
                                    <p className='text-white text-lg font-semibold'>{profileUser.occupation}</p>
                                
                                </div>
                            </div>
                            <div className='flex flex-col mx-auto px-3'>
                                <p className='font-bold mx-auto'>About Me</p>
                                <p>{profileUser.bio}</p>
                            </div>
                            <div className='flex flex-row gap-[2.6rem] pl-[1px] mx-auto pb-3'>
                                <div className=''>
                                    <img src='/store.png' width={48} height={24} className='cursor-pointer' onClick={() => navigate('/store/ronald')}></img>
                                </div>
                                <div className=''>
                                    <img src='/token.png' width={48} height={24} className='cursor-pointer' onClick={() => navigate('/spaces/ronald')}></img>
                                </div>
                                <div className=''>
                                <img src='/h3xclusive.png' width={48} height={24} className='cursor-pointer' onClick={() => navigate('/h3xClusive/ronald')}></img>
                                </div>
                            </div>
                            <div className='grid gap-3 grid-cols-3 pl-12 py-8'>
                                <button className='btn btn-square btn-neutral tooltip' data-tip="facebook.com">
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral tooltip' data-tip="facebook.com">
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral tooltip' data-tip="facebook.com">
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                            </div>
                            
                            <div className='w-full mx-auto'>
                                <div role="tablist" className="tabs tabs-bordered tabs-warning text-white">
                                    <a id='profileTab1' role="tab" className="tab tab-active text-white text-xl" onClick={() => switchPostTab(1)}>Portfolio</a>
                                    <a id='profileTab2' role="tab" className="tab text-white text-lg" onClick={() => switchPostTab(2)}>Blog</a>
                                    <a id='profileTab3' role="tab" className="tab text-white text-lg" onClick={() => switchPostTab(3)}>Convos</a>
                                </div>
                            </div>
                        </div>
                        <StarsCanvas />
                    </div>
                </div>

                :

                <div className='h-full bg-stone-950 text-white'>
                    <Navbar/>
                    <div className='h-full relative z-0 pb-64'>
                        <div className='flex flex-col  mx-auto gap-3'>
                            <div className="avatar mx-auto pb-8">
                                <div className=" w-48 rounded-full ring ring-offset-2">
                                    <img src="/logo.png" />
                                </div>
                            </div>
                            <div className='flex mx-auto text-white'>
                                <h1 className='text-white text-3xl font-semibold'>FirstName LastName</h1>
                            </div>
                            <div className='flex mx-auto text-white'>
                                <h1 className='text-white text-2xl font-semibold'>@Username</h1>
                            </div>
                            <div className='flex flex-row mx-auto gap-6'>
                                <div className='flex flex-row text-white'>
                                    <div className='pt-1'>
                                        <span class="material-symbols-outlined">location_on</span>
                                    </div>
                                    
                                    <p className='text-white text-lg font-semibold'>Location</p>
                                
                                </div>

                                <div className='flex flex-row text-white gap-1'>
                                    <div className='pt-1'>
                                        <span class="material-symbols-outlined">work</span>
                                    </div>
                                    
                                    <p className='text-white text-lg font-semibold'>Occupation</p>
                                
                                </div>
                            </div>
                            <div className='flex flex-col mx-auto px-3'>
                                <p className='font-bold mx-auto'>About Me</p>
                                <p>I am x3nfs I am x3nfs I am x3nfs I am x3nfs I am x3nfs I am x3nfs I am x3nfsI am x3nfs I am x3nfs I am x3nfs </p>
                            </div>
                            <div className='flex flex-row gap-[2.6rem] pl-[1px] mx-auto pt-8'>
                                <div className=''>
                                    <img src='/store.png' width={48} height={24} className='cursor-pointer' onClick={() => navigate('/store/ronald')}></img>
                                </div>
                                <div className=''>
                                    <img src='/token.png' width={48} height={24} className='cursor-pointer' onClick={() => navigate('/spaces/ronald')}></img>
                                </div>
                                <div className=''>
                                    <img src='/h3xclusive.png' width={48} height={24} className='cursor-pointer' onClick={() => navigate('/h3xClusive/ronald')}></img>
                                </div>
                            </div>
                            <div className='grid gap-3 pt-8 items-center justify-center xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-3 mx-auto'>
                                <button className='btn btn-square btn-neutral tooltip' data-tip="facebook.com">
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral tooltip' data-tip="facebook.com">
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral tooltip' data-tip="facebook.com">
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                                <button className='btn btn-square btn-neutral'>
                                <img className='rounded-md' src='https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc'/>
                                </button>
                            </div>
                            
                            <div className='w-5/12 mx-auto pt-12'>
                                <div role="tablist" className="tabs tabs-bordered tabs-warning text-white">
                                    <a id='profileTab1' role="tab" className="tab tab-active text-xl text-white" onClick={() => switchPostTab(1)}>Portfolio</a>
                                    <a id='profileTab2' role="tab" className="tab text-lg text-white" onClick={() => switchPostTab(2)}>Blog</a>
                                    <a id='profileTab3' role="tab" className="tab text-lg text-white" onClick={() => switchPostTab(3)}>Convos</a>
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