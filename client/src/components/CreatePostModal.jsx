import { getAuth } from 'firebase/auth';
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import StarsCanvas from '../components/Stars';
import ReactQuill from "react-quill";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL  } from "firebase/storage";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

export default function CreatePostModal() {

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const [createSteps, setCreateSteps] = useState(1);
    const [postType, setPostType] = useState();

    const [content, setContent] = useState("");
    const [blogContent, setBlogContent] = useState("");

    const [fileObj, setFileObj] = useState([]);
    const [fileArray, setFileArray] = useState([]);

    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          [{ "code-block": true }],
          ["clean"],
        ],
      };
      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "indent",
        "code-block",
      ];

      const blogModules = {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "color", "image"],
          [{ "code-block": true }],
          ["clean"],
        ],
      };
      const blogFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "indent",
        "image",
        "code-block",
        "color",
      ];
    

    function postTypeSelect( type) {
        setPostType(type)
        setCreateSteps(2)
    }

    function setPostFiles(e){

        if(e.target.files)
        {
            let fObj = [];
            let fArr = [];

            if(fileArray.length > 0)
            {
                for(let i = 0; i < fileArray.length; i ++)
                {   
                    fObj.push(fileObj[0][i]);
                    fArr.push(fileArray[i]);
                }

                for(let i = 0; i < e.target.files.length; i++)
                {
                    fObj.push(e.target.files[i]);
                    fArr.push(URL.createObjectURL(fObj[i]));
                }
        
                
            }
            else 
            {
                
        
                for(let i = 0; i < e.target.files.length; i++)
                {
                    fObj.push(e.target.files[i]);
                    fArr.push(URL.createObjectURL(fObj[i]));
                }
            }

            

            setFileObj(fObj);
            setFileArray(fArr);
            console.log(fileObj, fObj);
            console.log(fileArray, fArr)
        }

    }

    function removeUploadedImage(fileURL)
    {
        let fArr = fileArray;
        let fObj = fileObj;
        console.log(fArr);
        fArr.splice(fArr.indexOf(fileURL), 1);
        fObj.splice(fArr.indexOf(fileURL), 1);
        setFileArray([...fArr]);
        setFileObj([...fObj])
        console.log(fArr);
    }

    async function uploadFiles(postType, postId)
    {
        
        return uploadFiles
    }

    async function uploadPost(postType) 
    {
        if(fileArray.length > 0 && user)
        {
            let uploadedFiles = [];
            const postTimestamp = new Date().getTime();
            const postId = user.displayName + postTimestamp;
            for(let i = 0; i < fileArray.length; i++)
            {
                const storage = getStorage();
                const storageBucketRef = storageRef(storage, `Posts/${user.username}/${postType}/${postId}`);
                
                uploadBytes(storageBucketRef, fileObj[i]).then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        uploadedFiles.push(downloadURL);

                        if(i === fileArray.length - 1)
                        {
                            const db = getDatabase();
                            set(ref(db, 'Posts/' + user.displayName + postType + `/${postId}`), {
                                postId: postId,
                                postContent: content,
                                files: uploadedFiles,
                                timestamp: postTimestamp,
                                likes: [],
                                likesCount: 0,
                                comments: [],
                                commentsCount: 0,
                                postUsername: user.displayName,
                                postUserPhotoURl: user.photoURL
                            })
                        }
                        }).catch((error) => {
                            // An error occurred
                            // ...
                            console.log(error)
                        });
                    });
                console.log(i)
            }

            
        }
        else
        {
            
        }
    }

    return(
        <>
        {
            isMobile?

            <div className="modal-box bg-stone-900 max-w-none w-96">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setCreateSteps(1)}>✕</button>
                </form>

                <div className='h-full relative z-0'> 
                <div className='flex flex-row'>
                    {
                        createSteps > 1 ?
                        
                        <>
                            <div className='my-0'>
                                <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                            </div>
                            <h1 className='text-2xl font-bold mx-auto pt-[6px] pr-[3.5rem]'>Create new Post</h1>
                        </>
                        :
                        <h1 className='text-2xl font-bold mx-auto '>Create new Post</h1>
                    }
                </div> 
                <div className='divider divider-warning my-0'></div>
                <div className='pt-3'>
                    {
                        createSteps == 1 ?
 
                            <div className='grid grid-cols-2 gap-3 mx-auto'>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Portfolio')}>Create Portfolio Post</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Blog')}>Create Blog Post</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Shop')}>Create Shop Product</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Links')}>Create Link</button>
                            </div>

                        :
                        createSteps == 2 ?
                        <>
                            {
                                postType == 'Portfolio' ?

                                    <div className='flex flex-col'>
                                            
                                            <div className='flex flex-col gap-8'>
                                                <div className='flex w-full h-96 pb-1'>
                                                    <textarea className='bg-transparent textarea text-lg resize-none w-full' placeholder='Write here...' value={content} onChange={(e) => setContent(e.target.value)}/>
                                                </div>
                                                <div className='grid border-[1px]  border-warning gap-3 overflow-x-scroll grow'>
                                                {
                                                    fileArray.map((url) => (
                                                        <div className='flex object-fill pt-1 w-full h-full'>
                                                            
                                                            <img src={url} key={url} width={256} height={256} className='w-full h-full'/>
                                                            <div>
                                                                <button className='relative top-0 right-6' onClick={() => removeUploadedImage(url)}>✕</button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                </div>
                                                <div className=''>
                                                
                                                <div className="tooltip" data-tip="Add Media">
                                                    <span className="material-symbols-outlined cursor-pointer text-4xl" onClick={() => {if(document)document.getElementById('portfolioFileUpload').click()}}>photo_library</span>
                                                </div>
                                                    <input 
                                                        id='portfolioFileUpload'
                                                        type="file" 
                                                        multiple  
                                                        onChange={(e) => setPostFiles(e)}
                                                        className='invisible'
                                                    />
                                                </div>
                                                
                                            </div>
                                            <div className='flex w-72 pt-8 mx-auto'>
                                                <button className='btn btn-warning w-72' onClick={() => uploadPost('Portfolio')}>Upload</button>
                                            </div>
                                        </div>
                                     
                                :
                                postType == 'Blog' ?
                                
                                <div className='flex flex-col'>
                                    <div className='flex flex-col pb-3 gap-3 '>
                                        <div className='w-36 h-36 cursor-pointer border-2 border-warning mx-auto'>
                                            <input 
                                                type="file" 
                                                multiple  
                                                onChange={(e) => setPostFiles(e.target.files)}
                                                className='invisible'
                                            />
                                            <p className='pl-4 pt-6'>Blog Thumbnail</p>
                                        </div>
                                        <div className=''>
                                            <input placeholder='Blog Post Title' className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]'></input>
                                        </div>
                                    </div>
                                    <div className='flex w-[22rem] pr-6'>
                                        <ReactQuill
                                            theme="snow"
                                            value={blogContent}
                                            onChange={setBlogContent}
                                            modules={blogModules}
                                            formats={blogFormats}
                                            className='w-full h-96 text-white ql-description'
                                        /> 
                                    </div>
                                    <div className='flex w-72 pt-20 mx-auto items-end justify-end'>
                                        <button className='btn btn-warning w-72' onClick={() => uploadPost('Blog')}>Upload</button>
                                    </div>
                                </div>
                                
                                :
                                postType == 'h3xClusive' ?
                                <>

                                </>
                                :
                                <>

                                </>
                            }
                        </>
                        : 
                        createSteps == 3 ?
                        <>
                        
                        </>
                        :
                        <>
                        
                        </>
                    }
                </div>
            </div>
            </div>

            :
            <div className="modal-box bg-stone-900 max-w-none w-[48rem]">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setCreateSteps(1)}>✕</button>
                </form>

                <div className='h-full relative z-0'> 
                    <div className='flex flex-row'>
                        {
                            createSteps > 1 ?
                            
                            <>
                                <div className='my-0'>
                                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                </div>
                                <h1 className='text-2xl font-bold mx-auto pt-[6px] pr-[3.5rem]'>Create new Post</h1>
                            </>
                            :
                            <h1 className='text-2xl font-bold mx-auto '>Create new Post</h1>
                        }
                    </div>  
                    
                    <div className='divider divider-warning my-0'></div>
                        <div className='pt-3'>
                        {
                            createSteps == 1 ?

                            <div className='w-5/12 mx-auto'>
                                <div className='grid grid-cols-2 gap-6'>
                                    <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Portfolio')}>Create Portfolio Post</button>
                                    <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Blog')}>Create Blog Post</button>
                                    <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('ShopCategory')}>Create Shop Category</button>
                                    <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('ShopProduct')}>Create Shop Product</button>
                                    <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Links')}>Create Link</button>
                                    <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Collection')}>Create NFT Collection</button>
                                </div>
                            </div>

                            :
                            createSteps == 2 ?
                            <>
                                {
                                    postType == 'Portfolio' ?
                                    
                                        <div className='flex flex-col'>
                                            
                                            <div className='flex flex-col gap-8'>
                                                <div className='flex w-full h-96 pb-1'>
                                                    <textarea className='bg-transparent textarea text-lg resize-none w-full' placeholder='Write here...'/>
                                                </div>
                                                <div className='grid border-[1px] border-warning gap-3 overflow-x-scroll grow'>
                                                {
                                                    fileArray.map((url) => (
                                                        <div className='flex object-fill pt-1 w-full h-full'>
                                                            
                                                            <img src={url} key={url} width={256} height={256} className='w-full h-full'/>
                                                            <div>
                                                                <button className='relative top-0 right-6' onClick={() => removeUploadedImage()}>✕</button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                </div>
                                                <div className=''>
                                                
                                                <div className="tooltip" data-tip="Add Media">
                                                    <span className="material-symbols-outlined cursor-pointer text-4xl" onClick={() => {if(document)document.getElementById('portfolioFileUpload').click()}}>photo_library</span>
                                                </div>
                                                    <input 
                                                        id='portfolioFileUpload'
                                                        type="file" 
                                                        multiple  
                                                        onChange={(e) => setPostFiles(e)}
                                                        className='invisible'
                                                    />
                                                </div>
                                                
                                            </div>
                                            <div className='flex w-96 pt-8 mx-auto'>
                                                <button className='btn btn-warning w-96' onClick={() => uploadPost('Portfolio')}>Upload</button>
                                            </div>
                                        </div>
                                    :
                                    postType == 'Blog' ?
                                    
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row pb-3 gap-3 '>
                                                <div className='w-36 h-36 cursor-pointer border-2 border-warning mx-auto'>
                                                    <input 
                                                        type="file" 
                                                        multiple  
                                                        onChange={(e) => setPostFiles(e.target.files)}
                                                        className='invisible'
                                                    />
                                                    <p className='pl-4 pt-6'>Blog Thumbnail</p>
                                                </div>
                                                <div className='pt-10'>
                                                    <input placeholder='Blog Post Title' className='input bg-transparent input-bordered border-warning focus:border-warning w-[35rem]'></input>
                                                </div>
                                            </div>
                                            <div className='flex  h-96 pb-1'>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={blogContent}
                                                    onChange={setBlogContent}
                                                    modules={blogModules}
                                                    formats={blogFormats}
                                                    className='w-full h-[20rem] text-white ql-description'
                                                /> 
                                            </div>
                                            <div className='flex w-96 pt-8 mx-auto'>
                                                <button className='btn btn-warning w-96' onClick={() => uploadPost('Blog')}>Upload</button>
                                            </div>
                                        </div>

                                    :
                                    postType == 'h3xClusive' ?
                                    <>

                                    </>
                                    :
                                    <>

                                    </>
                                }
                            </>
                            : 
                            createSteps == 3 ?
                            <>
                            
                            </>
                            :
                            <>
                            
                            </>
                                    

                        }
                        </div>
                    </div>
                </div>
            }     
        </>
    )
}