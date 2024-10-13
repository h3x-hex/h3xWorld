import React from 'react'
import { useMediaQuery } from 'react-responsive'


const H3xClusive = () => {

  const isMobile = useMediaQuery({ query: '(max-width: 520px)' })

  return (
    <div>
      {
            isMobile? 

            <>
              <div className="mx-auto text-center pb-32">
                  <p className="text-2xl font-bold pt-8">x3nDant3's Realm</p>
                  <div className='divider divider-warning mb-0 w-2/12 mx-auto pb-8'></div>
                  <button className='btn btn-warning'>Enter x3nDant3's Realm for $6.9/month</button>
              </div>
            </>

            :

            <>
              <div className="mx-auto text-center pb-32">
                  <p className="text-2xl font-bold pt-8">x3nDant3's Realm</p>
                  <div className='divider divider-warning mb-0 w-2/12 mx-auto pb-8'></div>
                  <button className='btn btn-warning'>Enter x3nDant3's Realm for $6.9/month</button>
              </div>
            </>
        }
       
    </div>
  )
}

export default H3xClusive