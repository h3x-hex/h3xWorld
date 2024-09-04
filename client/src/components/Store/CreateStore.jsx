


export default function CreateStore() {


    return (

        <>
            
            <div className='flex items-center justify-center pt-20'>  
                <div className=''>
                <h1 className='text-6xl text-white font-bold pb-3'>Create  h<span className='text-warning'>3</span>xStore</h1>
                
                {
                    createSteps == 1 ?
                    <div>

                    <ul className="steps pt-3 text-white">
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
        </>

    )

}