import { useState } from "react";
import { Modal, initMDB } from "mdb-ui-kit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

initMDB({ Modal });
const Registration = () => {
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
     
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        email: "",  
        password: "",
        phoneNumber : ''
       
      });
     
  
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        let userdata = {
          name : formData.name,
          email : formData.email,
          role  : formData.role,
         password : formData.password,
         phoneNumber : formData.phoneNumber,
       
  }
  console.log(userdata);
  try{
    const response = await fetch('http://localhost:5000/signup',
    {
      method:'POST' , 
      headers:{ 'Content-Type': 'application/json'},
      body:JSON.stringify(userdata)
    });
    
  const data = await response.json();
  if(data){
      console.log(data.message);
      if(data.message == "User created Successfully"){
        show_successmsg(data.message)
      }else{
        showToastMessage(data.message)

      }
    
  }else{
      alert("Error in registration");
  }
  }catch(err){
    console.error(err);
  }
        setFormData({
          name: "",
          role: "",
          email: "",  
          password: "",
          phoneNumber : ''
            
          });
      };

    return(
        <>
        
        <section className ="vh-100" style={{backgroundColor: '#eee'}}>
  <div className ="container h-100">
    <div className ="row d-flex justify-content-center align-items-center h-100">
      <div className ="col-lg-12 col-xl-11">
        <div className ="card text-black" style={{borderRadius: '25px'}}>
          <div className ="card-body p-md-5">
            <div className ="row justify-content-center">
              <div className ="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className ="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className ="mx-1 mx-md-4" onSubmit={handleSubmit}>

                  <div className ="d-flex flex-row align-items-center mb-4">
                    <i className ="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className ="form-outline flex-fill mb-0">
                      <input type="text" id="form2Example1c" className ="form-control" onChange={handleInputChange} name="name" value={formData.name}/>
                      <label className ="form-label" for="form3Example1c">Name</label>
                    </div>
                  </div>
                  <div className ="d-flex flex-row align-items-center mb-4">
                    <i className ="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div className ="form-outline flex-fill mb-0">
                      <select  onChange={handleInputChange} name = "role" value={formData.role}>
                        <option value="students">Students</option>
                        <option value="teacher">Teacher</option>
                        <option value="Institute">Institute</option>
                      </select>
                   <label className ="form-label" for="form3Example1c">Role</label>
                    </div>
                  </div>
                  <div className ="d-flex flex-row align-items-center mb-4">
                    <i className ="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className ="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3c" className ="form-control" onChange={handleInputChange} name = "email" value={formData.email}/>
                      <label className ="form-label" for="form3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div className ="d-flex flex-row align-items-center mb-4">
                    <i className ="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className ="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4c" className ="form-control" onChange={handleInputChange} name="password" value={formData.password}/>
                      <label className ="form-label" for="form3Example4c">Password</label>
                    </div>
                  </div>
                  <div className ="d-flex flex-row align-items-center mb-4">
                    <i className ="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className ="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example4c" className ="form-control" onChange={handleInputChange} name="phoneNumber" value={formData.phoneNumber}/>
                      <label className ="form-label" for="form3Example4c">PhoneNumber</label>
                    </div>
                  </div>
                  <div className ="d-flex flex-row align-items-center mb-4">
                    <input className ="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className ="form-check-label" for="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className ="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" className ="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className ="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className ="img-fluid" alt="Sample image"/>

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
export default Registration;