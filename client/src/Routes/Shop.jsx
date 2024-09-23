import { useParams } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import {useNavigate} from 'react-router-dom'
import StoreComponent from "../components/Store/StoreComponent";
import CreateStore from "../components/Store/CreateStore";


export default function Shop () {

    let { storeName } = useParams();

    const isMobile = useMediaQuery({ query: '(max-width: 520px)' });
    const navigate = useNavigate();

    return (

        <>
            {
                storeName = "" ? 

                <>
                    <CreateStore/>
                </>

                :


                <>
                    <StoreComponent/>
                </>
            }
        </>
    )
}