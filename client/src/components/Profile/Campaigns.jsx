import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Campaigns = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })


  return (
    <div>
        {
            isMobile? 

            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Campaigns</p>
                <div className='divider divider-warning my-0 w-5/12 mx-auto'></div>

            </div>
                <p className='mx-auto text-center pb-64'>No NFTs collected yet...</p>
            </>

            :

            <>
            <div className="mx-auto text-center">
                <p className="text-2xl font-bold pt-8">Campaigns</p>
                <div className='divider divider-warning my-0 w-2/12 mx-auto'></div>

            </div>
                <p className='mx-auto text-center pt-12'>No NFTs collected yet...</p>
            </>
        }
    </div>
  )
}

export default Campaigns