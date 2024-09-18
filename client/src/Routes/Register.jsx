import { useState } from 'react'
import StarsCanvas from '../components/Stars'
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import { RegisterBasicDetails } from '../components/Register/RegisterBasicDetails'
import RegisterLinks from '../components/Register/RegisterLinks'
import RegisterStore from '../components/Register/RegisterStore'


export function Register () {
    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();

    const [pages, setPages] = useState(1);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        location: '',
        occupation: '',
        photoURL: '',
        bio: '',
        socialLinksPlatforms: [],
        socialLinksURL: [],
        createdAt: 0,
    })
    
    return(
        <>
            {
                pages == 1?

                <RegisterBasicDetails setPages={setPages} user={user} setUser={setUser}/>

                :

                pages == 2 ?


                <RegisterLinks setPages={setPages} user={user} setUser={setUser}/>

                :

                pages == 3 ?

                <RegisterStore setPages={setPages} user={user} setUser={setUser}/>

                :
                <></>
            }
        </>
    )
}

export default Register;