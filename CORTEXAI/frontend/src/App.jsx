import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebase';
function App(){
  const googlelogin=async()=>{
   const data = await signInWithPopup(auth,googleProvider)
   console.log(data)
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={googlelogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
        Continue with Google
      </button>
    </div>
  )
}
export default App;