
import { useEffect, useState } from 'react'
import StarsCanvas from '../../components/Stars'
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { useUserStore } from '../../stores/user-store'


export default function RegisterLinks({setPages, user, setUser}) {

    

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();

    const [linksCount, setLinksCount] = useState(16);
    const [linksPlatform, setLinksPlatform] = useState([]);
    const [linksURL, setLinksURL] = useState([]);


    const [imageUploaded, setImageUploaded ] = useState('false');

    function goNext(){
        //setUser({...user, socialLinksURL: linksURL, socialLinksPlatforms: linksPlatform})
        console.log(linksURL, user)
        console.log(linksPlatform)
        //setPages(3);
        //navigate(`/$`)
    }

    function removeLink(index)
    {   
        
        if (index > -1) 
        { 
            const result = linksPlatform;
            result.forEach((item) => {if(item === undefined)result.splice(result.indexOf(item))})
            result.splice(index, 1); 
            
            setLinksPlatform(result);
            //setLinksCount(linksCount-1);
        }
        console.log(index)
        //Delete Element by ID
    }

    function addLink()
    {   
        
        const result = linksPlatform;
        result.forEach((item) => {if(item === undefined)result.splice(result.indexOf(item))})
        setLinksPlatform(result);
        //setLinksCount(linksCount+1)
        console.log(linksCount)
    }

    const socialPlatforms = ['Facebook', 'Twitter', 'Instagram', 'Whatsapp', 'TikTok', 'Discord', 'LinkedIn', 'Threads', 'WeChat', 'Soundcloud', 'Spotify', 'YouTube', 'Telegram', 'Phone', 'Email', 'Browser']

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
            return "data:image/png;base64,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"
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

    return(
        <>
        {
                isMobile ?

                <>
                    <div className='h-full w-screen  bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]  from-gray-800 via-stone-900 to-stone-900 text-white pb-8'>
                        <div className='h-full relative z-0 '>
                            <div className='flex flex-col pt-8 gap-8 pl-3'>
                                <div className='absolute left-0 top-28'>
                                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning' onClick={() => setPages(1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                </div>
                                <div className='flex mx-auto'>
                                    <h1 className='text-5xl font-extralight'>Join h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
                                </div>
                                <div className='flex flex-col gap-3 text-center mx-auto pt-2'>
                                    <h1 className='text-2xl'>Social Links</h1>
                                    
                                    {
                                        socialPlatforms.map((elementInArray, index) => (
                                            <div id={`${index}`} className='flex flex-row w-full pr-2 gap-1 mb-0'>
                                                
                                                { 
                                                    socialPlatforms[index] ?

                                                    <div className="avatar pr-2 pt-1">
                                                        <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                            <img
                                                                src={addSocialLogo(elementInArray)}
                                                                className="object-fill"
                                                            />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='btn btn-ghost border-warning hover:border-warning w-12 h-12' onClick={() => {if(document) document.getElementById('linkPlatformModal').showModal()}}>
                                                    
                                                    </div>  

                                                }
                                                {
                                                    elementInArray === 'Phone' ?

                                                    <input className='input input-ghost input-bordered border-warning focus:bg-transparent focus:border-warning focus:text-white text-white w-64' placeholder='Phone Number' value={linksURL[index]} onChange={(e) => {setLinksURL((linksURL) => {const result = [...linksURL];result[index] = e.target.value;return result;})}}></input>

                                                    :

                                                    elementInArray === 'Email' ?

                                                    <input className='input input-ghost input-bordered border-warning focus:bg-transparent focus:border-warning focus:text-white text-white w-64' placeholder='Email Address' value={linksURL[index]} onChange={(e) => {setLinksURL((linksURL) => {const result = [...linksURL];result[index] = e.target.value;return result;})}}></input>
 
                                                    :

                                                    <input className='input input-ghost input-bordered border-warning focus:bg-transparent focus:border-warning focus:text-white text-white w-64' placeholder='Link URL' value={linksURL[index]} onChange={(e) => {setLinksURL((linksURL) => {const result = [...linksURL];result[index] = e.target.value;return result;})}}></input>

                                                } 
                                                

                                           
                                                
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                                <div className='flex mx-auto'>
                                    <button className='btn btn-warning border-none rounded-full w-64'  onClick={() => goNext()}>Next</button>
                                </div>
                                <StarsCanvas/>   
                            
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    
                    <div className='h-full w-screen  bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))]  from-gray-800 via-stone-900 to-stone-900 text-white'>
                        <div className='absolute left-3 top-16'>
                            <button className='btn btn-ghost bg-transparent text-white hover:text-warning' onClick={() => setPages(1)}><span className="material-symbols-outlined">arrow_back</span></button>
                        </div>
                        <div className='absolute right-8 top-8'>
                                    
                        </div>
                        <div className='h-full relative z-0 pb-8'>
                            <div className='flex flex-col pt-16 gap-16 pl-3'>
                                <div className='flex mx-auto'>
                                    <h1 className='text-5xl font-extralight'>Join h<span className='text-[#d69e2e]'>3</span>x<span className='text-[#888888]'>|</span>World</h1>
                                </div>
                                <div className='flex flex-col gap-3 text-center mx-auto pt-2'>
                                    <h1 className='text-2xl'>Social Links</h1>
                                    
                                    {
                                        socialPlatforms.map((elementInArray, index) => (
                                            <div id={`${index}`} className='flex flex-row w-full pr-2 gap-1 mb-0'>
                                                
                                                { 
                                                    socialPlatforms[index] ?

                                                    <div className="avatar pr-2 pt-1">
                                                        <div className="w-10 h-10  rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;})}}>
                                                            <img
                                                                src={addSocialLogo(elementInArray)}
                                                                className="object-fill"
                                                            />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='btn btn-ghost border-warning hover:border-warning w-12 h-12' onClick={() => {if(document) document.getElementById('linkPlatformModal').showModal()}}>
                                                    
                                                    </div>  

                                                }
                                                {
                                                    elementInArray === 'Phone' ?

                                                    <input className='input input-ghost input-bordered border-warning focus:bg-transparent focus:border-warning focus:text-white text-white w-64' placeholder='Phone Number' value={linksURL[index]} onChange={(e) => {setLinksURL((linksURL) => {const result = [...linksURL];result[index] = e.target.value;return result;})}}></input>

                                                    :

                                                    elementInArray === 'Email' ?

                                                    <input className='input input-ghost input-bordered border-warning focus:bg-transparent focus:border-warning focus:text-white text-white w-64' placeholder='Email Address' value={linksURL[index]} onChange={(e) => {setLinksURL((linksURL) => {const result = [...linksURL];result[index] = e.target.value;return result;})}}></input>
 
                                                    :

                                                    <input className='input input-ghost input-bordered border-warning focus:bg-transparent focus:border-warning focus:text-white text-white w-64' placeholder='Link URL' value={linksURL[index]} onChange={(e) => {setLinksURL((linksURL) => {const result = [...linksURL];result[index] = e.target.value;return result;})}}></input>

                                                } 
                                                

                                           
                                                
                                            </div>
                                        ))
                                    }
                                    
                                </div>
                                <div className='flex mx-auto'>
                                    <button className='btn btn-warning border-none rounded-full w-64'  onClick={() => goNext()}>Enter h3xWorld</button>
                                </div>   
                            
                            </div>
                            <StarsCanvas/>
                        </div>
                    </div>
                </>
            }
            <dialog id="linkPlatformModal" className="modal">
                <div className="modal-box bg-stone-800">
                    
                    <div className='flex flex-col mx-auto'>
                        <h1 className='text-white text-xl'>Select Link Platform</h1>
                        <div className='divider divider-warning mt-0'></div>
                        <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button id='closeModal' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white">✕</button>
                        </form>
                        {
                            isMobile ?

                            <div className='grid grid-cols-3 gap-3'>
                                {socialPlatforms.map((elementInArray, index) => (
                                    <div id={`${index}`} className='flex flex-row w-full pr-2 gap-1 mb-0'>
                                        <div className="btn avatar px-0.5 ">
                                            <div className="w-12 rounded ring ring-neutral ring-offset-base-100" onClick={(e) => {setLinksPlatform((linksPlatform) => {const result = [...linksPlatform];result[index] = elementInArray;return result;});{if(document)document.getElementById('closeModal').click()}}}>
                                                <img
                                                    src={addSocialLogo(elementInArray)}
                                                    className="object-fill"
                                                />
                                            </div>
                                        </div>                                      
                                    </div>
                                ))}
                            </div>
                            

                            :

                            <div className='grid grid-cols-6 gap-3'>
                                {socialPlatforms.map((elementInArray, index) => (
                                    <div id={`${index}`} className='flex flex-row w-full pr-2 gap-1 mb-0'>
                                        <div className="btn avatar px-0.5 ">
                                            <div className="w-12 rounded ring ring-neutral ring-offset-base-100">
                                                <img
                                                    src={addSocialLogo(elementInArray)}
                                                    className="object-fill"
                                                />
                                            </div>
                                        </div>                                      
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </dialog>
            <>
                
            </>
        </>
    )
}