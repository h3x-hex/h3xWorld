import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'

export default function Navbar (){
    const isMobile = useMediaQuery({ query: '(max-width: 520px)' })
    const navigate = useNavigate();

    return (
        <div className="navbar bg-transparent">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl font-light"><p>h<span className="text-warning">3</span>xWorld</p></a>
            </div>
            <div className="flex-none gap-2">
                {   
                    isMobile ?

                    <div className="flex ">
                        <button className="btn btn-warning btn-outline rounded-full w-12"><span class="material-symbols-outlined">add</span></button>
                    </div>
                    :
                    <div className="flex ">
                        <button className="btn btn-warning btn-outline rounded-full w-36">Create Post</button>
                    </div>
                }
                <div className="dropdown dropdown-end ">
                
                <div tabIndex={0} role="button" className="btn btn-outline border-warning hover:border-warning btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="/logo.png" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-stone-900 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white gap-3">
                    <li className="">
                    <a className="justify-between">
                        Profile
                    </a>
                    </li>
                    <li><a>Edit Profile</a></li>
                    <div className='divider divider-warning my-0'></div>
                    <li><a><p>h<span className="text-warning">3</span>xStore</p></a></li>
                    <li><a><p>h<span className="text-warning">3</span>xCard</p></a></li>
                    <li><a><p>h<span className="text-warning">3</span>xPro</p></a></li>
                    <div className='divider divider-warning my-0'></div>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    )
}