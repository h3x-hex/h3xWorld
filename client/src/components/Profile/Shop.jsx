import { getAuth } from 'firebase/auth';
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { getDatabase, ref, onValue } from "firebase/database";

export default function Shop({profileUser})
{
    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    const [product, setProduct] = useState('');

    useEffect(() => {
        if(profileUser)
        {
            const db = getDatabase();
            const productRef = ref(db, 'Shops/' + profileUser.username + 'Products');
            onValue(productRef, (snapshot) => {
                const data = snapshot.val();
                setProducts(data);
                console.log(data)
            });

            const categoryRef = ref(db, 'Shops/' + profileUser.username + 'Categories');
            onValue(categoryRef, (snapshot) => {
                const data = snapshot.val();
                setCategories(data);
                console.log(data)
            });
        }
    }, []);

    function showProduct(product)
    {
        {if(document)document.getElementById('productModal').showModal()}
        setProduct(product);
    }
    
    return(

        <>
            {
            isMobile?
            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Shop</p>
                <div className='divider divider-warning my-0 w-5/12 mx-auto'></div>

            </div>
            <div className="flex flex-col mx-auto gap-3 pl-12">
                    <p className="text-xl font-bold pt-8">Categories</p>
                    <div className='flex flex-col pr-8 gap-3'>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body mx-auto">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 pb-8'>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48">
                                            <div className="w-96">
                                            <img
                                                alt="Profile Photo"
                                                src={'/logo.png'} />
                                            </div>
                                            <p className='card-title'>h3xav3rse</p>
                                        </div>
                                       
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body hover:border-warning">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 '>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48">
                                            <div className="w-96">
                                            <img
                                                alt="Profile Photo"
                                                src={'/h3xWear.png'} />
                                            </div>
                                            <p className='card-title text-white'>h3xCatalogue</p>
                                        </div>
                                    </div>
                                    

                                </div>
                                
                            </div>
                            
                        </div>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 '>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48">
                                            <div className="w-full h-full">
                                            <img
                                                alt="Profile Photo"
                                                src={'/g3n3sis_obsidian.png'} 
                                                />
                                               
                                            </div>
                                            <p className='card-title'>h3xCollection</p>
                                        </div>
                                    </div>
                                   

                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    <p className="text-xl font-bold pt-8">Products</p>
                    <div className='flex flex-col pr-8 gap-3'>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 '>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48">
                                            <div className="w-96">
                                            <img
                                                alt="Profile Photo"
                                                src={'/logo.png'} />
                                            </div>
                                            <p className='card-title'>h3xKey</p>
                                        </div>
                                    </div>
                                    

                                </div>
                                
                            </div>
                            
                        </div>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 '>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48">
                                            <div className="w-96">
                                            <img
                                                alt="Profile Photo"
                                                src={'/h3xWear.png'} />
                                            </div>
                                            <p className='card-title'>h3xWear</p>
                                        </div>
                                    </div>
                                    

                                </div>
                                
                            </div>
                            
                        </div>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 pb-8'>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48">
                                            <div className="w-96">
                                            <img
                                                alt="Profile Photo"
                                                src={'/g3n3sis_obsidian.png'} />
                                            </div>
                                            <p className='card-title'>G3n3sis Obsidian</p>
                                        </div>
                                    </div>
                                    

                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
            </div>
            </>

            :
            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Shop</p>
                <div className='divider divider-warning my-0 w-2/12 mx-auto'></div>
            </div>
            <div className="flex flex-col w-7/12 mx-auto gap-3 pl-12">
                    
                    <p className="text-xl font-bold pt-8">Products</p>
                    <div className='grid grid-cols-3 pr-8 gap-3'>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 '>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48" onClick={() => showProduct('/logo.png')}>
                                            <div className="w-96">
                                            <img
                                                alt="Profile Photo"
                                                src={'/logo.png'} />
                                            </div>
                                            <p className='card-title'>h3xKey</p>
                                        </div>
                                    </div>
                                    

                                </div>
                                
                            </div>
                            
                        </div>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 '>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48" onClick={() => showProduct('/h3xWear.png')}>
                                            <div className="w-96">
                                            <img
                                                alt="Profile Photo"
                                                src={'/h3xWear.png'} />
                                            </div>
                                            <p className='card-title'>h3xWear</p>
                                        </div>
                                    </div>
                                    

                                </div>
                                
                            </div>
                            
                        </div>
                        <div key={'category'} className="card card-bordered bg-transparent w-64 shadow-xl hover:border-warning hover:border-2">  
                            <div className="card-body">
                                <div className='flex flex-col gap-1'>

                                    <div className='flex flex-row gap-2 pb-8'>
                                        <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent btn-square w-48 h-48" onClick={() => showProduct('/g3n3sis_obsidian.png')}>
                                            <div className="w-96">
                                            <img
                                                alt="Profile Photo"
                                                src={'/g3n3sis_obsidian.png'} />
                                            </div>
                                            <p className='card-title'>G3n3sis Obsidian</p>
                                        </div>
                                    </div>
                                    

                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
            </div>
            </>
        }
            
        <dialog id="productModal" className="modal">
            <div className="modal-box bg-stone-900">
                <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                    <img
                        src={product}
                        className="w-full"
                    />
            </div>
        </dialog>
        </>
    )

}