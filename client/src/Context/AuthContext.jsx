import { createContext,useState,useEffect } from "react";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import {fbconfig} from '../fbconfig'

export const Context = createContext();

export function AuthContext({children}){
   initializeApp(fbconfig);
 const auth = getAuth();
 const [user,setUser] = useState(null);
 const [loading,setLoading] = useState(true)

 useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setLoading(false)
        if(currentUser) setUser(currentUser)
        else{setUser(null)}
    });
    return () => {
        if(unsubscribe) unsubscribe();
    }
 },[])
 const values = {
    user: user,
    setUser: setUser
 }

return <Context.Provider value={values}>
   {!loading &&
    children
   }
</Context.Provider>
}