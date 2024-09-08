import { getAuth } from 'firebase/auth';
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import StarsCanvas from '../components/Stars';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Create() {

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const [createSteps, setCreateSteps] = useState(1);
    const [postType, setPostType] = useState();

    const [content, setContent] = useState("");

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
    

    function postTypeSelect( type) {
        setPostType(type)
        setCreateSteps(2)
    }

    return(
        <>
            
            <div className='h-full relative z-0'> 
                <div className='flex pt-2'>
                    <h1 className='text-xl font-bold mx-auto'>Create new Post</h1>
                </div> 
                <div className='pt-8'>
                    {
                        createSteps == 1 ?
                        <>
                            <div className='flex flex-col gap-3 mx-auto'>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Portfolio')}>Create Portfolio Post</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Blog')}>Create Blog Post</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('h3xClusive')}>Create h3xClusive Post</button>
                            </div>
                        </>
                        :
                        createSteps == 2 ?
                        <>
                            {
                                postType == 'Portfolio' ?
                                <>  
                                    <div className='absolute left-0 top-0'>
                                        <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                    </div> 
                                    {
                                        isMobile ?

                                        <div className='flex flex-col'>
                                             
                                            <div className='w-72 h-72 cursor-pointer border-2 border-warning mx-auto'>
                                                <input 
                                                    type="file" 
                                                    multiple  
                                                    onChange={(e) => setPostFiles(e.target.files)}
                                                    className='invisible'
                                                />
                                            </div>
                                            <div className='flex w-72 mx-auto pt-3'>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={content}
                                                    onChange={setContent}
                                                    modules={modules}
                                                    formats={formats}
                                                    className='w-full h-96 text-white ql-description'
                                                /> 
                                            </div>
                                            <div className='flex w-72 pt-20 mx-auto items-end justify-end'>
                                                <button className='btn btn-warning w-72' onClick={() => uploadFiles}>Upload</button>
                                            </div>
                                        </div>
                                        :
                                        
                                            <div className='flex flex-col'>
                                                 
                                                <div className='flex flex-row gap-8'>
                                                    <div className='w-96 h-96 cursor-pointer border-2 border-warning '>
                                                        <input 
                                                            type="file" 
                                                            multiple  
                                                            onChange={(e) => setPostFiles(e.target.files)}
                                                            className='invisible'
                                                        />
                                                    </div>
                                                    <div className='flex w-96 h-96 pb-1'>
                                                        <ReactQuill
                                                            theme="snow"
                                                            value={content}
                                                            onChange={setContent}
                                                            modules={modules}
                                                            formats={formats}
                                                            className='w-full h-[20rem] text-white ql-description'
                                                        /> 
                                                    </div>
                                                </div>
                                                <div className='flex w-96 pt-8 mx-auto'>
                                                    <button className='btn btn-warning w-96' onClick={() => uploadFiles}>Upload</button>
                                                </div>
                                            </div>
                                        
                                    }
                                </>
                                :
                                postType == 'Blog' ?
                                <>
                                    <div className='absolute left-0 top-0'>
                                        <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                    </div>  
                                    {
                                        isMobile ?
                                        
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
                                                <div className='pl-1'>
                                                    <input placeholder='Blog Post Title' className='input bg-transparent input-bordered border-warning focus:border-warning w-80'></input>
                                                </div>
                                            </div>
                                            <div className='flex w-72 mx-auto pt-3'>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={content}
                                                    onChange={setContent}
                                                    modules={modules}
                                                    formats={formats}
                                                    className='w-full h-96 text-white ql-description'
                                                /> 
                                            </div>
                                            <div className='flex w-72 pt-20 mx-auto items-end justify-end'>
                                                <button className='btn btn-warning w-72' onClick={() => uploadFiles}>Upload</button>
                                            </div>
                                        </div>
                                        :
                                        
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
                                                        value={content}
                                                        onChange={setContent}
                                                        modules={modules}
                                                        formats={formats}
                                                        className='w-full h-[20rem] text-white ql-description'
                                                    /> 
                                                </div>
                                                <div className='flex w-96 pt-8 mx-auto'>
                                                    <button className='btn btn-warning w-96' onClick={() => uploadFiles}>Upload</button>
                                                </div>
                                            </div>
                                        
                                    }
                                </>
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
        </>
    )
}