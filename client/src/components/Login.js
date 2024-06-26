import { useState } from "react";
import { NavLink, Navigate, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Modal, initMDB } from "mdb-ui-kit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

initMDB({ Modal });
const Login  = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      }); 
      const [navigate, setNavigate] = useState(false);
      const navigater = useNavigate();
     const {serverToken} = useAuth();

     const showToastMessage = (data) => {
        toast.error(data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

          });
      };
      const show_successmsg = (data)  => {
        // Add a success message:
        toast.success(data, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
      }


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    let userdata = {email : formData.email,
    password : formData.password}
    try{
      const response = await fetch("http://localhost:5000/signin", {
        method : 'post',
        headers : {
            "Content-Type":"application/json"
        
        },
       body: JSON.stringify(userdata)
    })
    const res_data = await response.json();
    if(response.ok){
      serverToken(res_data.token)       
      console.log("res from server", res_data);
      console.log('Request Succeded ', response);
      show_successmsg(res_data.msg)
  navigater('/');
    }else{
      console.log(res_data.message);
      showToastMessage(res_data.message)
    //   alert("please fill the correct credential");
    };
    }
     catch (error){
        console.log('Failed ', error);
        
    };
    setFormData({email : " ",password : ""});
  };
 
    return(
        <>
          
        <section className ="vh-100" style={{backgroundColor: '#9A616D'}}>
  <div className ="container py-5 h-100">
    <div className ="row d-flex justify-content-center align-items-center h-100">
      <div className ="col col-xl-10">
        <div className ="card" style = {{borderRadius:'1rem'}}>
          <div className ="row g-0">
            <div className ="col-md-6 col-lg-5 d-none d-md-block">
              {/*https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp*/}
              <img src='https://online.maryville.edu/wp-content/uploads/sites/97/2020/07/software-engineer-at-work-1.jpg'
                alt="login form" className ="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
            </div>
            <div className ="col-md-6 col-lg-7 d-flex align-items-center">
              <div className ="card-body p-4 p-lg-5 text-black">

                <form onSubmit={handleSubmit}>

                  <div className ="d-flex align-items-center mb-3 pb-1">
                    <i className ="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                    <span className ="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 className ="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                  <div className ="form-outline mb-4">
                    <input type="email" id="form2Example17" className ="form-control form-control-lg" onChange={handleInputChange} name="email" value={formData.email}/>
                    <label className ="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div className ="form-outline mb-4">
                    <input type="password" id="form2Example27" className ="form-control form-control-lg" onChange={handleInputChange} name="password" value={formData.password}/>
                    <label className ="form-label" for="form2Example27">Password</label>
                  </div>

                  <div className ="pt-1 mb-4">
                    <button className ="btn btn-dark btn-lg btn-block" type="submit" >Login</button>
                  </div>
                  {/* <a  className ="small text-muted" data-mdb-ripple-init data-mdb-modal-init href="#exampleModalToggle1" role="button">Forgot password?</a> */}
                <a></a>  <NavLink className ="small text-muted" data-mdb-ripple-init data-mdb-modal-init href="#exampleModalToggle1" role="button" to = "/reset">Forgot password?</NavLink>
                  <p className ="mb-5 pb-lg-2" style={{color:' #393f81'}}>Don't have an account? <NavLink to="/regi"
                      style={{color: '#393f81'}}>Register here</NavLink></p>
                  <a href="#!" className ="small text-muted">Terms of use.</a>
                  <a href="#!" className ="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


        </>
    )
}

export default Login;