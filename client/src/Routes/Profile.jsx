import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
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

    const [tab, setTab] = useState(1);

    const [links, setLinks] = useState([]);
    const [linksURL, setLinksURL] = useState([]);

    const [createSteps, setCreateSteps] = useState(1 || 2 || 3 || 4);
    const [storeLayout, setStoreLayout] = useState("Default" || "Tree");
    const [imgURL, setImgURL] = useState('');
    const storeCoverImage = useRef();

    function handleChange(e) {
        console.log(e.target.files);
        setImgURL(URL.createObjectURL(e.target.files[0]));
    }

    function addStoreCoverImage(e) {
        tierImageCoverRef.current.click();
    }

    const chooseLayout = (stepNum, layout) => {

        setCreateSteps(stepNum);
        setStoreLayout(layout);

    }
  

    function addSocialLogo(socialPlatform) {
        if(socialPlatform == 'Facebook')
        {
            return "https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc"
        }
        else if (socialPlatform == 'Twitter')
        {
            return "https://duet-cdn.vox-cdn.com/thumbor/0x0:1600x1600/640x427/filters:focal(800x800:801x801):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/24805464/F1x5VdQX0AA9Sgt.jpeg"
        }
        else if (socialPlatform == 'Instagram')
        {
            return "https://cdn.pixabay.com/photo/2021/06/15/12/14/instagram-6338393_640.png"
        }
        else if (socialPlatform == 'Whatsapp')
        {
            return "https://static.vecteezy.com/system/resources/thumbnails/018/930/746/small/whatsapp-logo-whatsapp-icon-whatsapp-transparent-free-png.png"
        }
        else if (socialPlatform == 'TikTok')
        {
            return "https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338429_960_720.png"   
        }
        else if (socialPlatform == 'Discord')
        {
            return "https://static.vecteezy.com/system/resources/previews/006/892/625/original/discord-logo-icon-editorial-free-vector.jpg"
        }
        else if (socialPlatform == 'LinkedIn')
        {
            return "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
        }
        else if (socialPlatform == 'Threads')
        {
            return "https://freelogopng.com/images/all_img/1689074836instagram-threads-logo.png"   
        }
        else if (socialPlatform == 'WeChat')
        {
            return "https://static-00.iconduck.com/assets.00/wechat-icon-2048x2048-9xnya1me.png"
        }
        else if (socialPlatform == 'Soundcloud')
        {
            return "https://d21buns5ku92am.cloudfront.net/26628/images/419679-1x1_SoundCloudLogo_cloudmark-f5912b-large-1645807040.jpg"
        }
        else if (socialPlatform == 'Spotify')
        {
            return "https://developer.spotify.com/images/guidelines/design/icon3@2x.png"
        }
        else if (socialPlatform == 'YouTube')
        {
            return "https://static.vecteezy.com/system/resources/previews/023/986/704/non_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png"
        }
        else if (socialPlatform == 'Telegram')
        {
            return "https://static-00.iconduck.com/assets.00/telegram-icon-2048x2048-x902pktl.png"
        }
        else if (socialPlatform == 'Phone')
        {
            return "https://static.vecteezy.com/system/resources/thumbnails/007/873/184/small_2x/mobile-phone-icon-logo-illustration-suitable-for-web-design-logo-application-free-vector.jpg"   
        }
        else if (socialPlatform == 'Email')
        {
            return "https://media.istockphoto.com/id/1125279178/vector/mail-line-icon.jpg?s=612x612&w=0&k=20&c=NASq4hMg0b6UP9V0ru4kxL2-J114O3TaakI467Pzjzw="
        }
        else if (socialPlatform == 'Browser')
        {
            return 'https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg'
        }

    }


    const switchTab = (tab) => {

        console.log(tab);
    
        if(tab == "1"){
            if (document) {
    
                (document.getElementById('profileTab1')).className = "tab bg-warning font-bold";
                (document.getElementById('profileTab2')).className = "tab cursor-pointer text-white ";
                (document.getElementById('profileTab3')).className = "tab cursor-pointer text-white ";
                setTab(tab);
            }
        }
        if(tab == "2"){
            if (document) {
    
                (document.getElementById('profileTab2')).className = "tab bg-warning font-bold";
                (document.getElementById('profileTab1')).className = "tab cursor-pointer text-white " ;
                (document.getElementById('profileTab3')).className = "tab cursor-pointer text-white ";
                setTab(tab);
            }
        }
        if(tab == "3"){
            if (document) {
    
                (document.getElementById('profileTab3')).className = "tab bg-warning font-bold";
                (document.getElementById('profileTab2')).className = "tab cursor-pointer text-white ";
                (document.getElementById('profileTab1')).className = "tab cursor-pointer text-white ";
                setTab(tab);
            }
        }
    
    }

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, `Users/${username}`);
        onValue(userRef, (snapshot) => {
            setProfileUser(snapshot.val());
            console.log(snapshot.val())
            setLinks(snapshot.val().socialLinksPlatforms);
            setLinksURL(snapshot.val().socialLinksURL)
            

        });
      }, []);
    
    

    return(
        <>
            {
                isMobile ?

                <div className='h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]  from-gray-800 via-stone-900 to-stone-900 text-white '>
                    <Navbar/>
                    <div className='h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]  from-gray-800 via-stone-900 to-stone-900 relative z-0'>
                        <div className='flex flex-col gap-3'>
                            <div className="avatar mx-auto">
                                <div className="w-36 rounded-full ring ring-offset-2">
                                    <img src={profileUser.photoURL} />
                                </div>
                            </div>
                            <div className='flex mx-auto text-white'>
                                <h1 className='text-white text-3xl font-semibold'>{profileUser.firstName} {profileUser.lastName}</h1>
                            </div>
                            <div className='flex mx-auto text-white'>
                                <h1 className='text-white text-xl '>@{profileUser.username}</h1>
                            </div>
                            <div className='flex flex-row mx-auto gap-6'>
                                <div className='flex flex-row text-white'>
                                    <div className=''>
                                        <span class="material-symbols-outlined">location_on</span>
                                    </div>
                                    
                                    <p className='text-white text-lg font-light'>{profileUser.location}</p>
                                
                                </div>

                                <div className='flex flex-row text-white gap-1'>
                                    <div className='pt-[2px]'>
                                        <span class="material-symbols-outlined">work</span>
                                    </div>
                                    
                                    <p className='text-white text-lg font-light'>{profileUser.occupation}</p>
                                
                                </div>
                            </div>
                            <div className='flex flex-col mx-auto px-3'>
                                <p className='font-bold mx-auto'>About Me</p>
                                <p>{profileUser.bio}</p>
                            </div>
                            
                            {   

                                links ?
                                    

                                links.length === 1 ?
                                    <div className='flex pl-2 mx-auto'>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    :
                                    links.length === 2 ?

                                    <div className='grid gap-3 pt-8 items-center justify-center grid-cols-2 mx-auto'>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length >= 3 ?

                                    <div className="grid gap-12 pt-8 pl-2 items-center justify-center grid-cols-3 mx-auto">
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    <>
                                        
                                    </>

                                    :
                                    <></>
                                }
                                <div className='pt-8'>
                                    <div role="tablist" className="tabs tabs-boxed bg-transparent text-white w-[84%] mx-auto ">
                                        <a id='profileTab1' role="tab" className="tab bg-warning font-bold" >Store</a>
                                        
                                    </div>
                                </div>
                                <div className=''>
                                    {
                                        profileUser.username === user.displayName ?

                                        tab === 1 ?

                                        <>
                                            {
                                                profileUser.storeName === '' ?

                                                <div className="flex flex-col items-center justify-center mx-auto ">
                                                    <div className="modal-box bg-transparent border-warning border-2 text-white">
                                                        <h3 className="font-bold text-xl">Create your h<span className="text-warning">3</span>xStore</h3>
                                                        <p className="py-4 text-lg">Launch your digital business right here on h<span className="text-warning">3</span>xWorld and start earning.</p>
                                                        <div className="mx-auto pt-8">
                                                            <button className="btn btn-outline btn-warning w-36" onClick={() => navigate(`/dashboard`)}>Create</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                            }
                                        </>
                                        :

                                        tab === 2 ?

                                        <>
                                            {
                                                profileUser.h3xClusiveName === '' ?

                                                <div className="flex flex-col items-center justify-center mx-auto ">
                                                    <div className="modal-box bg-transparent border-warning border-2 text-white">
                                                        <h3 className="font-bold text-xl">Create your h<span className="text-warning">3</span>xClusive page</h3>
                                                        <p className="py-4 text-lg">Launch your digital business right here on h<span className="text-warning">3</span>xWorld and start earning.</p>
                                                        <div className="mx-auto pt-8">
                                                            <button className="btn btn-outline btn-warning w-36" onClick={() => navigate(`/dashboard`)}>Create</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                </>
                                            }
                                        </>
                                        :

                                        tab === 3 ?

                                        <>
                                            <div className=''>
                                                <div className="flex flex-col items-center justify-center mx-auto ">
                                                    <div className="modal-box bg-transparent border-warning border-2 text-white">
                                                        <h3 className="font-bold text-xl">h3xSpaces Launching soon</h3>
                                                        <p className="py-4 text-lg">Until then sneak a peek at h<span className="text-warning">3</span>xClub.</p>
                                                        <div className="mx-auto pt-8">
                                                            <button className="btn btn-outline btn-warning w-36" onClick={() => navigate(`/dashboard`)}>Visit h3x.club</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <></>

                                        :

                                        tab === 1 ?

                                        <>
                                            {
                                                profileUser.storeName === '' ?

                                                <div className="pb-32">
                                                    
                                                </div>
                                                :
                                                <></>
                                            }
                                        </>
                                        :

                                        tab === 2 ?

                                        <>
                                            {
                                                profileUser.h3xClusiveName === '' ?

                                                <div className="pb-32">
                                                    
                                                </div>
                                                :
                                                <>
                                                </>
                                            }
                                        </>
                                        :

                                        tab === 3 ?

                                        <>
                                            <div className=''>
                                                <div className="flex flex-col items-center justify-center mx-auto ">
                                                    <div className="modal-box bg-transparent border-warning border-2 text-white">
                                                        <h3 className="font-bold text-xl">h3xSpaces Launching soon</h3>
                                                        <p className="py-4 text-lg">Until then sneak a peek at h<span className="text-warning">3</span>xClub.</p>
                                                        <div className="mx-auto pt-8">
                                                            <button className="btn btn-outline btn-warning w-36" onClick={() => navigate(`/dashboard`)}>Visit h3x.club</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                        
                                        </>
                                    }
                                </div>
                        </div>
                        <StarsCanvas />
                    </div>
                </div>

                :

                <div className='h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]  from-gray-800 via-stone-900 to-stone-900 text-white pb-32'>
                    <Navbar/>
                    <div className='h-full  relative z-0 pb-64'>
                        <div className='flex flex-col  mx-auto gap-3'>
                            <div className="avatar mx-auto pb-8">
                                <div className=" w-48 rounded-full ring ring-offset-2">
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
                            

                                {   

                                links ?
                                    

                                 links.length === 1 ?
                                    <div className='flex pl-2 mx-auto'>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    :
                                    links.length === 2 ?

                                    <div className='grid gap-3 pt-8 items-center justify-center xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mx-auto'>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 3 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-3 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 4 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-4 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 5 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-5 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 6 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-6 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 7 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-7 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 8 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-8 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 9 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-9 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 10 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-10 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 11 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-11 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    links.length === 12 ?

                                    <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-12 mx-auto`}>
                                        {(links).map((item, index) => (
                                            <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                    <img
                                                        src={addSocialLogo(item)}
                                                        className="object-fill tooltip"
                                                        data-tip={item}
                                                    
                                                    />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                    :
                                    <>
                                        <div className={`grid gap-3 pt-8 pl-2 items-center justify-center grid-cols-12 mx-auto`}>
                                            {(links).map((item, index) => (
                                                <a className="avatar pr-2 pt-1" href={linksURL[index]}>
                                                    <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                        <img
                                                            src={addSocialLogo(item)}
                                                            className="object-fill tooltip"
                                                            data-tip={item}
                                                        />
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </>

                                    :
                                    <></>
                                }
                                <div className='pt-8'>
                                    <div role="tablist" className="tabs tabs-boxed bg-transparent w-[24.5%] mx-auto">
                                        <a id='profileTab1' role="tab" className="tab bg-warning font-bold">Store</a>
                                    </div>
                                </div>
                                <div className='pb-8'>
                                    {
                                        profileUser.username === user.displayName ?

                                        
                                            tab === 1 ?
    
                                            <>
                                                {
                                                    profileUser.storeName === '' ?
    
                                                    <div className="flex flex-col items-center justify-center mx-auto ">
                                                        <div className="modal-box bg-transparent border-warning border-2 text-white">
                                                            <h3 className="font-bold text-xl">Create your h<span className="text-warning">3</span>xStore</h3>
                                                            <p className="py-4 text-lg">Launch your digital business right here on h<span className="text-warning">3</span>xWorld and start earning.</p>
                                                            <div className="mx-auto pt-3">
                                                                <button className="btn btn-outline btn-warning w-36" onClick={() => document.getElementById('addStore').showModal()}>Create</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </>
                                            :
    
                                            tab === 2 ?
    
                                            <>
                                                {
                                                    profileUser.h3xClusiveName === '' ?
    
                                                    <div className="flex flex-col items-center justify-center mx-auto ">
                                                        <div className="modal-box bg-transparent border-warning border-2 text-white">
                                                            <h3 className="font-bold text-xl">Create your h<span className="text-warning">3</span>xClusive page</h3>
                                                            <p className="py-4 text-lg">Launch your digital business right here on h<span className="text-warning">3</span>xWorld and start earning.</p>
                                                            <div className="mx-auto pt-3">
                                                                <button className="btn btn-outline hover:bg-warning btn-warning w-36" onClick={() => navigate(`/dashboard`)}>Create</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                    </>
                                                }
                                            </>
                                            :
    
                                            tab === 3 ?
    
                                            <>
                                                <div className=''>
                                                    <div className="flex flex-col items-center justify-center mx-auto ">
                                                        <div className="modal-box bg-transparent border-warning border-2 text-white">
                                                            <h3 className="font-bold text-xl">h3xSpaces Launching soon</h3>
                                                            <p className="py-4 text-lg">Until then sneak a peek at h<span className="text-warning">3</span>xClub.</p>
                                                            <div className="mx-auto pt-8">
                                                                <button className="btn btn-outline btn-warning w-36" onClick={() => navigate(`/dashboard`)}>Visit h3x.club</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <></>
                                        

                                        :

                                        <></>
                                    }
                                </div>
                            </div>
                        <StarsCanvas />
                    </div>
                </div>
            }
            <dialog id="addStore" className="modal">
                <div className="modal-box flex w-8/12 max-w-none bg-stone-800 opacity-100">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
                    </form>
                    
                    <div className='mx-auto flex flex-col'>
                    <h1 className='text-6xl text-white font-bold pb-3 mx-auto'>Create  h<span className='text-warning'>3</span>xStore</h1>
                    {
                        createSteps == 1 ?
                        <div className='flex mx-auto flex-col'>

                        <ul className="steps pt-3 text-white mx-auto ">
                            <li className="step step-warning">Choose Layout</li>
                            <li className="step">Customize Storefront</li>
                            <li className="step">Add Categories and Products</li>
                            <li className="step">Review</li>
                        </ul>
                        <div className='absolute left-3 top-20'>
                            <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => navigate(`/${user.displayName}`)}><span className="material-symbols-outlined">arrow_back</span></button>
                        </div>  
                        <div className='flex flex-row gap-16 pt-8'>
                            <div className='flex flex-col'>
                            <p className='pb-3 text-2xl font-bold text-white'>Classic Store</p>
                            <div className="card card-bordered border-warning bg-zinc-800 h-[38rem] w-[32rem] shadow-xl hover:w-[33rem] hover:border-4">
                                <div className="avatar placeholder pl-36">
                                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                                    <span>Logo</span>
                                </div>
                                <p className='text-lg text-white pl-8 pt-3'>Store Name</p>
                                </div>
                                <div className='items-start justify-start'>
                                <p className='text-lg text-white font-bold py-3'>Categories</p>
                                </div>
                                <div className='flex flex-row gap-3 pl-6'>
                                <div className='h-32 w-32 bg-transparent border-warning border-solid border-2 border-opacity-65 rounded-lg cursor-pointer items-center justify-center' onClick={addStoreCoverImage}>
                                    <p className='text-white pt-12 hover:font-bold'>Category</p>
                                </div>
                                <div className='h-32 w-32 bg-transparent border-warning border-solid border-2 border-opacity-65 rounded-lg cursor-pointer items-center justify-center' onClick={addStoreCoverImage}>
                                    <p className='text-white pt-12 hover:font-bold'>Category</p>
                                </div>
                                <div className='h-32 w-32 bg-transparent border-warning border-solid border-2 border-opacity-65 rounded-lg cursor-pointer items-center justify-center' onClick={addStoreCoverImage}>
                                    <p className='text-white pt-12 hover:font-bold'>Category</p>
                                </div>
                                </div>
                                <div className='items-start justify-start'>
                                <p className='text-lg text-white font-bold py-6'>Products</p>
                                </div>
                                <div className='flex flex-row gap-3 pl-6'>
                                <div className='h-32 w-32 bg-transparent border-warning border-solid border-2 border-opacity-65 rounded-lg cursor-pointer items-center justify-center' onClick={addStoreCoverImage}>
                                    <p className='text-white pt-12 hover:font-bold'>Product</p>
                                </div>
                                <div className='h-32 w-32 bg-transparent border-warning border-solid border-2 border-opacity-65 rounded-lg cursor-pointer items-center justify-center' onClick={addStoreCoverImage}>
                                    <p className='text-white pt-12 hover:font-bold'>Product</p>
                                </div>
                                <div className='h-32 w-32 bg-transparent border-warning border-solid border-2 border-opacity-65 rounded-lg cursor-pointer items-center justify-center' onClick={addStoreCoverImage}>
                                    <p className='text-white pt-12 hover:font-bold'>Product</p>
                                </div>
                                </div>
                                <div className="card-actions items-center justify-center pt-10">
                                <button className="btn btn-outline rounded-full btn-warning w-36"  onClick={() => chooseLayout(2, 'Default')}>Choose</button>
                                </div>
                            </div>
                            </div>

                            <div className='flex flex-col'>
                            <p className='pb-3 text-2xl font-bold text-white'>Store Tree</p>
                            <div className="card card-bordered border-warning bg-zinc-800 h-[38rem] w-[32rem] shadow-xl hover:w-[33rem] hover:border-4">
                                <div className="avatar placeholder pl-36">
                                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                                    <span>Logo</span>
                                    </div>
                                    <p className='text-lg text-white pl-8 pt-3'>Store Name</p>
                                </div>
                                
                                <div className="card-body">
                                <div className='items-start justify-start'>
                                    <p className='text-lg text-white font-bold '>Category 1</p>
                                </div>
                                <div className='pt-3'>
                                    <button className="btn rounded-full btn-neutral w-full">Custom Link 1</button>
                                </div>
                                <div className='pt-3'>
                                    <button className="btn rounded-full btn-neutral w-full">Custom Link 2</button>
                                </div>
                                <div className='items-start justify-start pt-3'>
                                    <p className='text-lg text-white font-bold '>Category 2</p>
                                </div>
                                <div className='pt-3'>
                                    <button className="btn rounded-full btn-neutral w-full">Custom Link 3</button>
                                </div>
                                <div className='pt-3'>
                                    <button className="btn rounded-full btn-neutral w-full">Custom Link 4</button>
                                </div>
                                <div className="card-actions items-center justify-center pt-8">
                                    <button className="btn btn-outline rounded-full btn-warning w-36"  onClick={() => chooseLayout(2, 'Tree')}>Choose</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                        :

                        createSteps == 2 ?

                        <>
                        <ul className="steps pt-3 text-white">
                            <li className="step step-warning">Choose Layout</li>
                            <li className="step step-warning">Customize Storefront</li>
                            <li className="step">Add Categories and Products</li>
                            <li className="step">Review</li>
                        </ul>
                        <div className='absolute left-3 top-20'>
                            <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps - 1)}><span className="material-symbols-outlined">arrow_back</span></button>
                        </div>  
                            <div className='flex flex-col'>
                            <div className='flex flex-row gap-16'>
                                <div className="avatar pt-12 placeholder">
                                <div className="w-36 rounded-full ring ring-offset-2 cursor-pointer">
                                    <span className="text-lg text-white hover:font-bold">Click to add logo</span>
                                </div>
                                </div>
                                <div className='flex flex-col w-full pt-2 items-start justify-start'>
                                <p className='text-3xl font-bold text-white pt-8 pb-3 '>Store Name</p>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered input-warning w-full h-16 text-3xl" />
                                </div>
                            </div>
                            <div className='flex flex-col items-start justify-start pt-8'>
                                <h3 className="font-bold text-3xl py-3 text-white">Store Cover Image</h3>
                                <div className='h-64 w-full bg-transparent border-warning border-solid border-2 border-opacity-65 rounded-lg cursor-pointer items-center justify-center' onClick={addStoreCoverImage}>
                                    <p className='text-white pt-28 hover:font-bold'>Click to add Image</p>
                                    <input 
                                            type="file" 
                                            accept="image/*" 
                                            style={{display: 'none'}}
                                            className="file-input file-input-bordered w-full" 
                                            onChange={handleChange}
                                            ref={storeCoverImage}
                                    />
                                    {imgURL? <img src={imgURL} width={'100%'} height={'100%'} className='h-full w-full'/> : <></>}
                                </div>
                            </div>                
                            
                            <div className='pt-8'>
                                <button className="btn btn-warning btn-outline rounded-full w-48 h-16 mx-auto text-md !border-warning  !hover:text-black" onClick={() => setCreateSteps(3)}>Next</button>
                            </div>

                            </div>
                        </>

                        :

                        createSteps == 3?

                        <div>
                        <div className='absolute left-3 top-20'>
                            <button className='btn btn-ghost bg-transparent text-white hover:text-warning' onClick={() => setCreateSteps(createSteps - 1)}><span className="material-symbols-outlined">arrow_back</span></button>
                        </div>
                        <ul className="steps pt-3 text-white">
                            <li className="step step-warning">Choose Layout</li>
                            <li className="step step-warning">Customize Storefront</li>
                            <li className="step step-warning">Add Categories and Products</li>
                            <li className="step">Review</li>
                        </ul>

                        <div className='pt-16 mx-auto flex flex-row hover:text-warning'>
                            <button className='btn btn-circle btn-ghost text-white hover:text-warning' onClick={() => {if (document) document.getElementById('addCategory').showModal()}}><span class="material-symbols-outlined text-5xl">add_circle</span></button>
                            <p className='text-2xl pt-[6px] pl-3 text-white cursor-pointer'>Add Category</p>
                        </div>

                        <div className='divider divider-warning py-6'></div>

                        <div className='mx-auto flex flex-row hover:text-warning'>
                            <button className='btn btn-circle btn-ghost text-white hover:text-warning' onClick={() => {if (document) document.getElementById('addProduct').showModal()}}><span class="material-symbols-outlined text-5xl">add_circle</span></button>
                            <p className='text-2xl pt-[6px] pl-3 text-white cursor-pointer'>Add Product</p>
                        </div>

                        <div className='pt-8'>
                            <button className="btn btn-warning btn-outline rounded-full w-48 h-16 mx-auto text-md !border-warning  !hover:text-black" onClick={() => setCreateSteps(4)}>Next</button>
                        </div>
                        </div>

                        :

                        createSteps == 4? 

                        <div>
                        <div className='absolute left-3 top-20'>
                            <button className='btn btn-ghost bg-transparent text-white hover:text-warning' onClick={() => setCreateSteps(createSteps - 1)}><span className="material-symbols-outlined">arrow_back</span></button>
                        </div>  

                        <div className='pt-8'>
                            <button className="btn btn-warning btn-outline rounded-full w-48 h-16 mx-auto text-md !border-warning  !hover:text-black" onClick={() => setCreateSteps(4)}>Next</button>
                        </div>
                        </div>

                        :

                        <></>
                        
                    }
                    </div>
                    </div>
            </dialog>
        
        </>
    )
}