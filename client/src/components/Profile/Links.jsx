import { getAuth } from 'firebase/auth';
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { getDatabase, ref, onValue } from "firebase/database";

export default function Links({profileUser})
{
    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

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
    
    return(

        <>
            {
            isMobile?
            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Links</p>
                <div className='divider divider-warning my-0 w-2/12 mx-auto'></div>
            </div>
            <div className="flex flex-col w-11/12 pl-4 gap-8 pt-8">
                <button className='btn btn-ghost bg-transparent rounded-full border-warning hover:border-warning items-start justify-start text-center'>
                    <img
                        src='/logo.png'
                        className='w-10 pt-1'
                    />
                    <p className='text-center pt-4 mx-auto pr-10'>Your key to the h3xav3rse</p>
                </button>
                <button className='btn btn-ghost bg-transparent rounded-full border-warning hover:border-warning items-start justify-start'>
                    <img
                        src='/logo.png'
                        className='w-10 pt-1'
                    />
                    <p className='text-center mx-auto pt-4 pr-10'>Join h3xWorld</p>
                </button>
                <button className='btn btn-ghost bg-transparent rounded-full border-warning hover:border-warning items-start justify-start'>
                    <img
                        src='/logo.png'
                        className='w-10 pt-1'
                    />
                    <p className='text-center pt-4 mx-auto pr-10'>Explore h3xMarketplace</p>
                </button>
                
            </div>
            
            </>

            :
            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Links</p>
                <div className='divider divider-warning my-0 w-2/12 mx-auto'></div>
            </div>
            <div className="flex flex-col w-4/12 mx-auto gap-8 pt-8">
                <button className='btn btn-ghost bg-transparent rounded-full border-warning hover:border-warning items-start justify-start text-center'>
                    <img
                        src='/logo.png'
                        className='w-10 pt-1'
                    />
                    <p className='text-center pt-4 mx-auto pr-10'>Your key to the h3xav3rse</p>
                </button>
                <button className='btn btn-ghost bg-transparent rounded-full border-warning hover:border-warning items-start justify-start'>
                    <img
                        src='/logo.png'
                        className='w-10 pt-1'
                    />
                    <p className='text-center mx-auto pt-4 pr-10'>Join h3xWorld</p>
                </button>
                <button className='btn btn-ghost bg-transparent rounded-full border-warning hover:border-warning items-start justify-start'>
                    <img
                        src='/logo.png'
                        className='w-10 pt-1'
                    />
                    <p className='text-center pt-4 mx-auto pr-10'>Explore h3xMarketplace</p>
                </button>
                
            </div>
            </>
        }
            
        
        </>
    )

}