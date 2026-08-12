import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
import Home from './pages/Home';
import {useDispatch} from "react-redux"
import { setUserdata } from './redux/userSlice';
function App(){
  const dispatch=useDispatch();
  useEffect(()=>{
    const getUser=async()=>{
     const data= await getCurrentUser()
     dispatch(setUserdata(data));
    }
    getUser();
  },[])
  return (
    <>
    <Home/>
    </>
  )
}
export default App;