import { FaEdit,FaTrash } from "react-icons/fa";
import { useAuth } from "../store/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate,NavLink } from "react-router-dom";

import EditContectData from "./EditContectData";
const DashBord = () => {
    const [searcData, setSearchdata] = useState('');
    const [allUserdata, allsetUserData]  = useState();
    const [isdelete, setisdelete]  = useState(false);
    const {getToken,getContect,Deletecontect, EditContect } = useAuth();
    const navigater = useNavigate()
    console.log(isdelete);
    const {regitrationData, LogoutToken} = useAuth();
    console.log("registration data",regitrationData)
const Navigate = useNavigate();
const SearchAPI = async() =>{
    const res = await fetch(`http://localhost:5000/search/${searcData}`,{
        method : 'GET',
        headers:{
            'Authorization' : getToken
            }
    })
    const data = await res.json();
  
    allsetUserData(data);
}
const SearchSubmit = () => {
    SearchAPI()
}

const DeleteUser =  async(id) => {
    const res = await fetch (`http://localhost:5000/deleteuser/${id}`,{
        method:'DELETE',
            });
            var data = await res.json()
            if (res.ok){
                alert("user Deleted Successfully");
                window.location.reload();

                setisdelete(data.acknowledged)
            }else{
                throw new Error ("user not deleted");
            }
          
}
// useEffect(() => {
//     allsetUserData(regitrationData);
    
// },[]);

// if(allUserdata == ''){
//     LogoutToken()
//     Navigate('/login')
// }
    return(
        <>
 <div class="container">
    <div class="row">
        <div class="col-md-offset-1 col-md-10">
            <div class="panel">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col col-sm-3 col-xs-12">
                            <h4 class="title">Registration User Data  <span>List</span> :-</h4>
                        </div>
                        <div class="col-sm-9 col-xs-12 text-right">
                            <div class="btn_group">
                                <input type="text" class="form-control" placeholder="Search" onChange={(e) => setSearchdata(e.target.value) }/>
                                {/* //<i class="fa fa-sync-alt"></i> */}
                                <button class="btn btn-default" title="Reload" onClick={SearchSubmit}>Search</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-body table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th> Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>PhoneNumber</th>
                                <th>....</th>
                            </tr>
                        </thead>
                        <tbody>
                          
                            {regitrationData && regitrationData.map((ele,ind) => {
                                return(
                                    <>
                                <tr key={ind}>
                                <td>{ind}</td>
                                <td>{ele.name}</td>
                                <td>{ele.email}</td>
                                <td>{ele.role}</td>
                                <td>{ele.PhoneNumber}</td>
                                <td>
                                    <ul class="action-list">
                                        <li> <a href="#" class="card-link" onClick = {() => {
            EditContect(ele)
            navigater('/edit')
            }}><FaEdit/></a>
</li>
                                        <li><a href="#" data-tip="delete" onClick={() => DeleteUser(ele._id)}><FaTrash/></a></li>
                                    </ul>
                                </td>
                                </tr> 
                                    </>
                                )
                            })}
                               
                        
                        </tbody>
                    </table>
                </div>
              </div>
        </div>
    </div>
</div>
        </>
    )
}
export default DashBord;