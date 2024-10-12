import { getAuth } from 'firebase/auth';
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import StarsCanvas from '../components/Stars';
import ReactQuill from "react-quill";
import { useUserStore } from '../stores/user-store';
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL  } from "firebase/storage";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

export default function CreatePostModal({}) {

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' });
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const { currentUser, addCurrentUser } = useUserStore((state) => {
        return {currentUser: state.user, addCurrentUser: state.addToUser};
    });

    const [createSteps, setCreateSteps] = useState(1);
    const [postType, setPostType] = useState();

    const [content, setContent] = useState("");
    const [blogContent, setBlogContent] = useState("");
    const [blogThumbnailUploaded, setBlogThumbnailUploaded] = useState(false);
    const [blogThumbnailObj, setBlogThumbnailObj] = useState();
    const [blogThumbnailURL, setBlogThumbnailURL] = useState();
    const [blogTitle, setBlogTitle] = useState('');

    const [category, setCategory] = useState("");
    const [categoryThumbnailUploaded, setCategoryThumbnailUploaded] = useState(false);
    const [categoryThumbnailObj, setCategoryThumbnailObj] = useState();
    const [categoryThumbnailURL, setCategoryThumbnailURL] = useState();

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productURL, setProductURL] = useState("");
    const [productCurrency, setProductCurrency] = useState("");
    const [productThumbnailUploaded, setProductThumbnailUploaded] = useState(false);
    const [productThumbnailObj, setProductThumbnailObj] = useState();
    const [productThumbnailURL, setProductThumbnailURL] = useState();

    const [linkTitle, setLinkTitle] = useState("");
    const [linkURL, setLinkURL] = useState("");
    const [linkThumbnailUploaded, setLinkThumbnailUploaded] = useState(false);
    const [linkThumbnailObj, setLinkThumbnailObj] = useState();
    const [linkThumbnailURL, setLinkThumbnailURL] = useState();

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
        console.log(currentUser.userField.firstName)
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
                const storageBucketRef = storageRef(storage, `Posts/${user.displayName}` + 'Portfolio/' + postId);
                
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
                                postUserFullName: currentUser.userField.firstName + currentUser.userField.lastName,
                                postUsername: user.displayName,
                                postUserPhotoURL: user.photoURL,
                                postAwards: 0,
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

    function addBlogThumbnail() 
    {
        if(document)
        {
            document.getElementById('blogThumbnail').click();
        }
    }

    function setBlogThumbnail(thumbnail)
    {
        setBlogThumbnailUploaded(true);
        setBlogThumbnailObj(thumbnail);
        setBlogThumbnailURL(URL.createObjectURL(thumbnail))
    }

    async function uploadBlogPost(postType) 
    {
            console.log("Uploading Blog post")
            const postTimestamp = new Date().getTime();
            const postId = user.displayName + postTimestamp;

            const storage = getStorage();
            const storageBucketRef = storageRef(storage, `Posts/${user.username}/${postType}/${postId}`);
            
            uploadBytes(storageBucketRef, blogThumbnailObj).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    let uploadedFile = downloadURL;

                    const db = getDatabase();
                    set(ref(db, 'Posts/' + user.displayName + postType + `/${postId}`), {
                        postId: postId,
                        postContent: blogContent,
                        files: uploadedFile,
                        timestamp: postTimestamp,
                        postTitle: blogTitle,
                        likes: [],
                        likesCount: 0,
                        comments: [],
                        commentsCount: 0,
                        postUserFullName:  currentUser.userField.firstName + currentUser.userField.lastName,
                        postUsername: user.displayName,
                        postUserPhotoURL: user.photoURL,
                        postAwards: 0,
                    })

                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error)
                });
            });

            

            

    }

    async function createShopCategory() 
    {
        console.log("Uploading Shop Category")
        const storage = getStorage();
        const storageBucketRef = storageRef(storage, `Shops/${user.displayName}/Categories/${category}`);
        
        uploadBytes(storageBucketRef, categoryThumbnailObj).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                let uploadedFile = downloadURL;

                const db = getDatabase();
                set(ref(db, 'Shops/' + user.displayName + 'Categories' + `/${category}`), {
                    category: category,
                    categoryThumbnail: uploadedFile,
                })

            }).catch((error) => {
                // An error occurred
                // ...
                console.log(error)
            });
        });

    }

    function addCategoryThumbnail() 
    {
        if(document)
        {
            document.getElementById('categoryThumbnail').click();
        }
    }

    function setCategoryThumbnail(thumbnail)
    {
        setCategoryThumbnailObj(thumbnail);
        setCategoryThumbnailURL(URL.createObjectURL(thumbnail))
        setCategoryThumbnailUploaded(true);
    }
    
    async function createShopProduct() 
    {
        console.log("Uploading Shop Product")
        const storage = getStorage();
        const storageBucketRef = storageRef(storage, `Shops/${user.displayName}/Products/${productName}`);
        
        uploadBytes(storageBucketRef, productThumbnailObj).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                let uploadedFile = downloadURL;

                const db = getDatabase();
                set(ref(db, 'Shops/' + user.displayName + 'Products' + `/${productName}`), {
                    productName: productName,
                    productDescription: productDescription,
                    productCurrency: productCurrency,
                    productPrice: productPrice,
                    productLink: productURL,
                })

            }).catch((error) => {
                // An error occurred
                // ...
                console.log(error)
            });
        });
    }

    function addProductThumbnail() 
    {
        if(document)
        {
            document.getElementById('productThumbnail').click();
        }
    }

    function setProductThumbnail(thumbnail)
    {
        setProductThumbnailUploaded(true);
        setProductThumbnailObj(thumbnail);
        setProductThumbnailURL(URL.createObjectURL(thumbnail))
    }

    async function createLink() 
    {
        console.log("Uploading Link")
        const postTimestamp = new Date().getTime();
        const postId = user.displayName + postTimestamp;

        const storage = getStorage();
        const storageBucketRef = storageRef(storage, `Links/${user.displayName}/${postId}`);
        
        uploadBytes(storageBucketRef, linkThumbnailObj).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                let uploadedFile = downloadURL;

                const db = getDatabase();
                set(ref(db, 'Links/' + user.displayName + `/${postId}`), {
                    linkTitle: linkTitle,
                    linkThumbnail: uploadedFile,
                    linkURL: linkURL,
                })

            }).catch((error) => {
                // An error occurred
                // ...
                console.log(error)
            });
        });
    }

    function addLinkThumbnail() 
    {
        if(document)
        {
            document.getElementById('linkThumbnail').click();
        }
    }

    function setLinkThumbnail(thumbnail)
    {
        setLinkThumbnailUploaded(true);
        setLinkThumbnailObj(thumbnail);
        setLinkThumbnailURL(URL.createObjectURL(thumbnail))
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
                            <h1 className='text-2xl font-bold mx-auto pt-[6px]'>Create</h1>
                        </>
                        :
                        <h1 className='text-2xl font-bold mx-auto '>Create</h1>
                    }
                </div> 
                <div className='divider divider-warning my-0'></div>
                <div className='pt-3'>
                    {
                        createSteps == 1 ?
 
                            <div className='grid grid-cols-2 gap-3 mx-auto'>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Portfolio')}>Create Portfolio Post</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Blog')}>Create Blog Post</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('ShopCategory')}>Create Shop Category</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('ShopProduct')}>Create Shop Product</button>
                                <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Post')}>Create h3xClusive Post</button>
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
                                    <div className='flex flex-col pb-3 gap-3'>
                                        <div className='flex mx-auto pl-24'>
                                            <button className='btn btn-ghost border-warning w-36 h-36'  onClick={() => addBlogThumbnail()}>
                                                {
                                                    blogThumbnailUploaded ?

                                                    <img src={blogThumbnailURL} width={156} height={156}/>

                                                    :

                                                    <p className=''>Blog Thumbnail</p>
                                                }
                                            </button>
                                            <input 
                                                id='blogThumbnail'
                                                type="file" 
                                                onChange={(e) => setBlogThumbnail(e.target.files[0])}
                                                className='invisible'
                                            />
                                            
                                        </div>
                                        <div className=''>
                                            <input
                                                placeholder='Blog Post Title' 
                                                className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]' 
                                                value={blogTitle}
                                                onChange={(e) => setBlogTitle(e.target.value)}
                                            ></input>
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
                                        <button className='btn btn-warning w-72' onClick={() => uploadBlogPost('Blog')}>Upload</button>
                                    </div>
                                </div>
                                
                                :
                                postType == 'ShopCategory' ?
                                <>
                                
                                    <div className='flex flex-col'>
                                        <div className='flex flex-col pb-3 gap-3'>
                                            <div className='flex mx-auto pl-24'>
                                                <button className='btn btn-ghost border-warning w-36 h-36'  onClick={() => addCategoryThumbnail()}>
                                                {
                                                    categoryThumbnailUploaded ?

                                                    <img src={categoryThumbnailURL} width={156} height={156}/>

                                                    :

                                                    <p className=''>Category Thumbnail</p>
                                                }
                                                </button>
                                                <input 
                                                    id='categoryThumbnail'
                                                    type="file" 
                                                    onChange={(e) => setCategoryThumbnail(e.target.files[0])}
                                                    className='invisible w-0'
                                                />
                                                
                                            </div>
                                            <div className=''>
                                                <input
                                                    placeholder='Blog Post Title' 
                                                    className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]' 
                                                    value={blogTitle}
                                                    onChange={(e) => setBlogTitle(e.target.value)}
                                                ></input>
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
                                            <button className='btn btn-warning w-72' onClick={() => uploadBlogPost('Blog')}>Upload</button>
                                        </div>
                                    </div>
                                
                                
                                </>
                                :
                                postType == 'ShopProduct' ?
                                <>
                                
                                    <div className='flex flex-col'>
                                        <div className='flex flex-col pb-3 gap-3'>
                                            <div className='flex mx-auto pl-24'>
                                                <button className='btn btn-ghost border-warning w-36 h-36'  onClick={() => addBlogThumbnail()}>
                                                    {
                                                        blogThumbnailUploaded ?

                                                        <img src={blogThumbnailURL} width={156} height={156}/>

                                                        :

                                                        <p className=''>Blog Thumbnail</p>
                                                    }
                                                </button>
                                                <input 
                                                    id='blogThumbnail'
                                                    type="file" 
                                                    onChange={(e) => setBlogThumbnail(e.target.files[0])}
                                                    className='invisible'
                                                />
                                                
                                            </div>
                                            <div className=''>
                                                <input
                                                    placeholder='Blog Post Title' 
                                                    className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]' 
                                                    value={blogTitle}
                                                    onChange={(e) => setBlogTitle(e.target.value)}
                                                ></input>
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
                                            <button className='btn btn-warning w-72' onClick={() => uploadBlogPost('Blog')}>Upload</button>
                                        </div>
                                    </div>
                                
                                
                                </>
                                :
                                postType == 'Links' ?
                                <>
                                
                                    <div className='flex flex-col'>
                                        <div className='flex flex-col pb-3 gap-3'>
                                            <div className='flex mx-auto pl-24'>
                                                <button className='btn btn-ghost border-warning w-36 h-36'  onClick={() => addBlogThumbnail()}>
                                                    {
                                                        blogThumbnailUploaded ?

                                                        <img src={blogThumbnailURL} width={156} height={156}/>

                                                        :

                                                        <p className=''>Blog Thumbnail</p>
                                                    }
                                                </button>
                                                <input 
                                                    id='blogThumbnail'
                                                    type="file" 
                                                    onChange={(e) => setBlogThumbnail(e.target.files[0])}
                                                    className='invisible'
                                                />
                                                
                                            </div>
                                            <div className=''>
                                                <input
                                                    placeholder='Blog Post Title' 
                                                    className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]' 
                                                    value={blogTitle}
                                                    onChange={(e) => setBlogTitle(e.target.value)}
                                                ></input>
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
                                            <button className='btn btn-warning w-72' onClick={() => uploadBlogPost('Blog')}>Upload</button>
                                        </div>
                                    </div>
                                
                                
                                </>
                                :
                                postType == 'Post' ?
                                <>
                                
                                    <div className='flex flex-col'>
                                        <div className='flex flex-col pb-3 gap-3'>
                                            <div className='flex mx-auto pl-24'>
                                                <button className='btn btn-ghost border-warning w-64 h-64'  onClick={() => addBlogThumbnail()}>
                                                    {
                                                        blogThumbnailUploaded ?

                                                        <img src={blogThumbnailURL} width={156} height={156}/>

                                                        :

                                                        <p className=''>Collection Media</p>
                                                    }
                                                </button>
                                                <input 
                                                    id='blogThumbnail'
                                                    type="file" 
                                                    onChange={(e) => setBlogThumbnail(e.target.files[0])}
                                                    className='invisible'
                                                />
                                                
                                            </div>
                                            <div className=''>
                                                <input
                                                    placeholder='Collection Name' 
                                                    className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]' 
                                                    value={blogTitle}
                                                    onChange={(e) => setBlogTitle(e.target.value)}
                                                ></input>
                                            </div>
                                        </div>
                                        
                                        <div className='flex w-72 pt-20 mx-auto items-end justify-end'>
                                            <button className='btn btn-warning w-72' onClick={() => uploadBlogPost('Blog')}>Upload</button>
                                        </div>
                                    </div>
                                
                                
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
                        <div className='pt-3'>
                        {
                            createSteps == 1 ?  
                            <>
                                <div className='flex flex-row'>
                                    
                                    <h1 className='text-2xl font-bold mx-auto pt-[6px] '>Create</h1>
                                    
                                </div>
                                <div className='divider divider-warning mt-0'></div>
                                <div className='w-5/12 mx-auto'>
                                    <div className='grid grid-cols-2 gap-6'>
                                        <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Portfolio')}>Create Portfolio Post</button>
                                        <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Blog')}>Create Blog Post</button>
                                        <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('ShopCategory')}>Create Shop Category</button>
                                        <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('ShopProduct')}>Create Shop Product</button>
                                        <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Post')}>Create h3xClusive Post</button>
                                        <button className='btn btn-outline btn-warning btn-square w-36 h-36 mx-auto' onClick={() => postTypeSelect('Links')}>Create Link</button>
                                    </div>
                                </div>
                            </>
                            

                            :
                            createSteps == 2 ?
                            <>
                                {
                                    postType == 'Portfolio' ?
                                    
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row'>
                                                <div className='my-0'>
                                                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                                </div>
                                                <h1 className='text-2xl font-bold mx-auto'>Create new Portfolio Post</h1>
                                                
                                            </div>
                                            <div className='divider divider-warning my-0'></div>
                                            
                                            <div className='flex flex-col gap-8'>
                                                <div className='flex w-full h-96 pb-1'>
                                                    <textarea className='bg-transparent textarea text-lg resize-none w-full' placeholder='Write here...' value={content} onChange={(e) => setContent(e.target.value)}/>
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
                                            <div className='flex flex-row'>
                                                <div className='my-0'>
                                                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                                </div>
                                                <h1 className='text-2xl font-bold mx-auto'>Create new Blog Post</h1>
                                                
                                            </div>
                                            <div className='divider divider-warning my-0'></div>
                                            
                                            <div className='flex flex-col pb-3 '>
                                                <div className='flex flex-row'>
                                                    <button className='btn btn-ghost border-warning w-36 h-36'  onClick={() => addBlogThumbnail()}>
                                                        {
                                                            blogThumbnailUploaded ?

                                                            <img src={blogThumbnailURL} width={156} height={156}/>

                                                            :

                                                            <p className=''>Blog Thumbnail</p>
                                                        }
                                                    </button>
                                                    <input 
                                                        id='blogThumbnail'
                                                        type="file" 
                                                        onChange={(e) => setBlogThumbnail(e.target.files[0])}
                                                        className='invisible w-3'
                                                    />
                                                    <div className='pt-10'>
                                                        <input 
                                                            placeholder='Blog Post Title' 
                                                            className='input bg-transparent input-bordered border-warning focus:border-warning w-[35rem]'
                                                            value={blogTitle}
                                                            onChange={(e) => setBlogTitle(e.target.value)}
                                                            />
                                                    </div>
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
                                                <button className='btn btn-warning w-96' onClick={() => uploadBlogPost('Blog')}>Upload</button>
                                            </div>
                                        </div>

                                    :
                                    postType == 'ShopCategory' ?
                                    <>
                                    
                                        <div className='flex flex-col'>
                                        <div className='flex flex-row'>
                                                <div className='my-0'>
                                                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                                </div>
                                                <h1 className='text-2xl font-bold mx-auto'>Create new Shop Category</h1>
                                                
                                            </div>
                                        <div className='divider divider-warning my-0'></div>
                                            <div className='flex flex-col pb-3 gap-3'>
                                                <div className='flex mx-auto '>
                                                    <button className='btn btn-ghost border-warning w-96 h-96'  onClick={() => addCategoryThumbnail()}>
                                                        {
                                                            categoryThumbnailUploaded ?

                                                            <img src={categoryThumbnailURL} width={512} height={512}/>

                                                            :

                                                            <p className=''>Category Thumbnail</p>
                                                        }
                                                    </button>
                                                    <input 
                                                        id='categoryThumbnail'
                                                        type="file" 
                                                        onChange={(e) => setCategoryThumbnail(e.target.files[0])}
                                                        className='invisible w-0'
                                                    />
                                                    
                                                </div>
                                                <div className='flex mx-auto'>
                                                    <input
                                                        placeholder='Category' 
                                                        className='input bg-transparent input-bordered border-warning focus:border-warning w-96' 
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                    ></input>
                                                </div>
                                            </div>
                                            
                                            <div className='flex w-72 pt-20 mx-auto items-end justify-end'>
                                                <button className='btn btn-warning w-72' onClick={() => createShopCategory('Category')}>Add Category</button>
                                            </div>
                                        </div>
                                    
                                    
                                    </>
                                    :
                                    postType == 'ShopProduct' ?
                                    <>
                                    
                                        <div className='flex flex-col'>
                                        <div className='flex flex-row'>
                                                <div className='my-0'>
                                                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                                </div>
                                                <h1 className='text-2xl font-bold mx-auto'>Create new Shop Product</h1>
                                                
                                            </div>
                                        <div className='divider divider-warning my-0'></div>
                                            <div className='flex flex-row pb-3 gap-3 pt-12'>
                                                <div className='flex mx-auto'>
                                                    <button className='btn btn-ghost border-warning w-96 h-96'  onClick={() => addProductThumbnail()}>
                                                        {
                                                            productThumbnailUploaded ?

                                                            <img src={productThumbnailURL} width={512} height={512}/>

                                                            :

                                                            <p className=''>Product Thumbnail</p>
                                                        }
                                                    </button>
                                                    <input 
                                                        id='productThumbnail'
                                                        type="file" 
                                                        onChange={(e) => setProductThumbnail(e.target.files[0])}
                                                        className='invisible w-0'
                                                    />
                                                    
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <input
                                                        placeholder='Product Name' 
                                                        className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]' 
                                                        value={productName}
                                                        onChange={(e) => setProductName(e.target.value)}
                                                    ></input>
                                                    <textarea
                                                        placeholder='Product Description' 
                                                        className='textarea bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem] h-48' 
                                                        value={productDescription}
                                                        onChange={(e) => setProductDescription(e.target.value)}
                                                    ></textarea>
                                                    <input
                                                        placeholder='Product URL' 
                                                        className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]' 
                                                        value={productURL}
                                                        onChange={(e) => setProductURL(e.target.value)}
                                                    ></input>
                                                    <div className='flex flex-row gap-3'>
                                                        <select className="select bg-transparent select-bordered border-warning w-24 max-w-xs focus:border-warning " value={productCurrency} onChange={(e) => setProductCurrency(e.target.value)}>
                                                            <option disabled selected className='bg-transparent'>Select Currency</option>
                                                            <option  className='bg-transparent'>USD</option>
                                                            <option  className='bg-transparent'>GBP</option>
                                                            <option  className='bg-transparent'>EUR</option>
                                                            <option  className='bg-transparent'>INR</option>
                                                            <option  className='bg-transparent'>AED</option>
                                                        </select>
                                                        <input
                                                            placeholder='Price ' 
                                                            className='input bg-transparent input-bordered border-warning focus:border-warning w-40' 
                                                            value={productPrice}
                                                            onChange={(e) => setProductPrice(e.target.value)}
                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className='flex w-72 pt-8 mx-auto items-end justify-end'>
                                                <button className='btn btn-warning w-72' onClick={() => createShopProduct('Product')}>Add Product</button>
                                            </div>
                                        </div>
                                    
                                    
                                    </>
                                    :
                                    postType == 'Links' ?
                                    <>
                                    
                                        <div className='flex flex-col'>
                                        <div className='flex flex-row'>
                                                <div className='my-0'>
                                                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                                </div>
                                                <h1 className='text-2xl font-bold mx-auto'>Create new Link</h1>
                                                
                                            </div>
                                        <div className='divider divider-warning my-0'></div>
                                            <div className='flex flex-row pb-3 gap-3'>
                                                <div className='flex mx-auto pt-20'>
                                                    <button className='btn btn-ghost border-warning w-36 h-36 rounded-full'  onClick={() => addLinkThumbnail()}>
                                                        {
                                                            linkThumbnailUploaded ?

                                                            <img src={linkThumbnailURL} width={156} height={156}/>

                                                            :

                                                            <p className=''>Link Thumbnail</p>
                                                        }
                                                    </button>
                                                    <input 
                                                        id='linkThumbnail'
                                                        type="file" 
                                                        onChange={(e) => setLinkThumbnail(e.target.files[0])}
                                                        className='invisible w-0'
                                                    />
                                                    
                                                </div>
                                                <div className='pt-24 flex flex-col gap-3'>
                                                    <input
                                                        placeholder='Link Title' 
                                                        className='input bg-transparent input-bordered border-warning focus:border-warning w-96 rounded-full' 
                                                        value={linkTitle}
                                                        onChange={(e) => setLinkTitle(e.target.value)}
                                                    ></input>
                                                    <input
                                                        placeholder='Link URL' 
                                                        className='input bg-transparent input-bordered border-warning focus:border-warning w-96 rounded-full' 
                                                        value={linkURL}
                                                        onChange={(e) => setLinkURL(e.target.value)}
                                                    ></input>
                                                </div>
                                            </div>
                                            
                                            <div className='flex w-72 pt-20 mx-auto items-end justify-end'>
                                                <button className='btn btn-warning w-72' onClick={() => createLink('Link')}>Upload</button>
                                            </div>
                                        </div>
                                    
                                    
                                    </>
                                    :
                                    postType == 'Collection' ?
                                    <>
                                    
                                        <div className='flex flex-col'>
                                        <div className='flex flex-row'>
                                                <div className='my-0'>
                                                    <button className='btn btn-ghost bg-transparent text-white hover:text-warning'  onClick={() => setCreateSteps(createSteps-1)}><span className="material-symbols-outlined">arrow_back</span></button>
                                                </div>
                                                <h1 className='text-2xl font-bold mx-auto'>Create new NFT Collection</h1>
                                                
                                            </div>
                                        <div className='divider divider-warning my-0'></div>
                                            <div className='flex flex-col pb-3 gap-3 mx-auto'>
                                                <div className='flex mx-auto '>
                                                    <button className='btn btn-ghost border-warning w-64 h-64'  onClick={() => addBlogThumbnail()}>
                                                        {
                                                            blogThumbnailUploaded ?

                                                            <img src={blogThumbnailURL} width={156} height={156}/>

                                                            :

                                                            <p className=''>Collection Media</p>
                                                        }
                                                    </button>
                                                    <input 
                                                        id='blogThumbnail'
                                                        type="file" 
                                                        onChange={(e) => setBlogThumbnail(e.target.files[0])}
                                                        className='invisible'
                                                    />
                                                    
                                                </div>
                                                <div className=''>
                                                    <input
                                                        placeholder='Collection Name' 
                                                        className='input bg-transparent input-bordered border-warning focus:border-warning w-[20.5rem]' 
                                                        value={blogTitle}
                                                        onChange={(e) => setBlogTitle(e.target.value)}
                                                    ></input>
                                                </div>
                                            </div>
                                            <div className='flex  pr-6'>
                                                <select className="select bg-transparent select-bordered border-warning w-24 max-w-xs focus:border-warning " value={productCurrency} onChange={(e) => setProductCurrency(e.target.value)}>
                                                    <option disabled selected className='bg-transparent'>Select Chain</option>
                                                    <option  className='bg-transparent'>ETH</option>
                                                    <option  className='bg-transparent'>MATIC</option>
                                                    <option  className='bg-transparent'>SOL</option>
                                                </select>
                                            </div>
                                            <div className='flex w-72 pt-20 mx-auto items-end justify-end'>
                                                <button className='btn btn-warning w-72' onClick={() => uploadBlogPost('Blog')}>Upload</button>
                                            </div>
                                        </div>
                                    
                                    
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