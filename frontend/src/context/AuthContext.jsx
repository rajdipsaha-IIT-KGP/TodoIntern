import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

const AuthContext = createContext()
export const AuthProvider = ({children}) => {
    const [isAuth ,setIsAuth] = useState(false)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const checkAuth = async()=>{
try{
  await axios.get("http://localhost:3000/api/todos/all")
  setIsAuth(true)
      }
      catch(err){
        setIsAuth(false)
      }
      finally{
setLoading(false)
      }
        }
        checkAuth()
      
    },[])
    async function logout() {
        try{
await axios.get("http://localhost:3000/api/auth/logoutUser")
setIsAuth(false)
toast.success("Succesfully Logout")
        }
        catch(err){
          console.log(err)
          toast.error(" Logout failed")
        }
    }
     return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);

