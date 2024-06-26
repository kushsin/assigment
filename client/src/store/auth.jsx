import { createContext,useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
const Authcontext = createContext();

 export const UseAuth = ({children}) => {
    const [getToken, setGetToken] = useState(localStorage.getItem('serverToken'));   
    const [storeformdata,setstoreformdata]  = useState('');
    const [regitrationData, setRegistrationData] = useState('');
    const [getContect, sectContect] = useState('');
    const [userEdit, setuserData] = useState('');
    // console.log("data of regi",regitrationData);
    const serverToken = (token) => {
        console.log(token);
        setGetToken(token);
       return localStorage.setItem("serverToken", token);  // get token from local storage if it              
    }
     const islogin = !getToken; 
     console.log(islogin);
     const LogoutToken = () => {
        setGetToken('');
       localStorage.removeItem("serverToken");         
    }

    
const UserAuthetication = async() => {
  try{
const res = await fetch('http://localhost:5000/userdata', {
  method:'GET',
  headers:{
    Authorization : `Bearer ${getToken}`
  }
});

if(res.ok){
  const data = await res.json();
  setstoreformdata(data);
}

  }catch(err){
    alert(err.message);
  }
}
// all registration data get api 
const AllregistrationData = async() => {
  try{
const res = await fetch('http://localhost:5000/userdata', {
  method:'GET',
  headers:{
    Authorization : `Bearer ${getToken}`
  }
});
if(res.ok){
  const data = await res.json();
  setRegistrationData(data);
}
  }catch(err){
    alert(err.message);
  }
}

//get all contect data..................................
const Allcontect = async() => {
  try{
      const res = await  fetch('http://localhost:5000/getcontectdata', {
          method:'GET',
          headers:{
              Authorization:getToken
              },
      })
      const data = await res.json();
      sectContect(data);
    console.log(data)
  }catch(err){
      console.log(err)
  }
}

const Deletecontect =  async(id) => {
  var confrim =  window.confirm("do you want to delete  this contact?") 
  if(confrim == true){
    const res = await fetch (`http://localhost:5000/delete/${id}`,{
      method:'DELETE',
          });
          var data = await res.json();
      
            if (res.ok){
              alert("Contect user deleted successfully");
  
      // window.confirm("Are you sure to delete this contact?") && window.location.reload(true)
              window.location.reload();
          
          }
        else{
              throw new Error ("user not deleted");
          }     
  }
       
}

///edit contect data.................................
const EditContect = (data) => {
  setuserData(data);
  console.log(data);
}

useEffect(() =>{
  UserAuthetication();
  AllregistrationData();
  Allcontect();
},[])
      return <Authcontext.Provider value = {{
        serverToken,
       LogoutToken,
       islogin,
       storeformdata,
       getToken,
       regitrationData,
         Deletecontect,
          getContect,
          EditContect,
           userEdit
           }}>
        {children}
      </Authcontext.Provider>
    }

    export const useAuth= ()=>{
     const authcontext =  useContext(Authcontext);   
     if(!authcontext){
       throw new Error("Use Auth must be used within the Auth Provider");                                        

     }
     return authcontext;


    }                              


