import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const Logout = () => {    
    const navigater = useNavigate();
    const {LogoutToken} = useAuth();
    useEffect(() => { 
    LogoutToken();
  },[LogoutToken])
  return navigater('/login')
}
export default Logout;