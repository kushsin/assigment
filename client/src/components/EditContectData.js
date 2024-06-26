import { GiConsoleController } from "react-icons/gi";
import { useAuth } from "../store/auth"
import styled from "styled-components"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditContectData = () => {
    const {userEdit} = useAuth();
    console.log("auth", userEdit)
    const [editformData, setEditadata]  = useState({
        name : userEdit.name,
        Email : userEdit.email,
        role :userEdit.role,
        phoneNumber : userEdit.PhoneNumber,
    });

 
    const {getToken,getContect,Deletecontect, EditContect } = useAuth();
    const navigater = useNavigate();
    console.log(userEdit);
    const getdata = (e) => {
        const { name, value } = e.target;
        setEditadata((prevData) => ({
    ...prevData,
    [name]: value,
  }));
    }

    const handleSubmit = async(e) => {
    e.preventDefault();
    const contectdata  = {
        name :editformData.name,
        email : editformData.Email,
        PhoneNumber : editformData.phoneNumber,
        role : editformData.role
    }

    console.log("dl;sa;d;l",contectdata)
        const res = await fetch(`http://localhost:5000/userupdate/${userEdit._id}`,{
            method:'PATCH',
            headers: {    "Content-type": "application/json"  }, 
            body:  JSON.stringify(contectdata) 
                });
                var data = await res.json();
                if (res.ok){
                    alert("Contect user UPDATED successfully");
                     console.log(data)
                     window.location.reload(true)
                     navigater('/dash')
            // window.confirm("Are you sure to delete this contact?") && window.location.reload(true)
                    window.location.reload();
                }else{
                    throw new Error ("user not Updeted");
                } 
            }

      
    return(
        <>
        <Wrapper>
        <div className="container">
        <div className="contact-form">
          <form
           onSubmit={handleSubmit}
           
            className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="name"
              value={editformData.name}
              required
          
              onChange={getdata}
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
          
              required
              value={editformData.Email}
              onChange={getdata}
            />

<input
              type="text"
              name="phoneNumber"
              placeholder="phone Number"
          
              required
              value={editformData.phoneNumber}
              onChange={getdata}
            />
          
     <input
              type="text"
              name="role"
              placeholder="user Role"
          
              required
              value={editformData.role}
              onChange={getdata}
            />
            <input type="submit" value="Update" />
          </form>
        </div>
      </div>
      </Wrapper>
        </>
    )

}


const Wrapper = styled.section`
padding: 9rem 0 5rem 0;
text-align: center;

.container {
  margin-top: 6rem;

  .contact-form {
    max-width: 50rem;
    margin: auto;

    .contact-inputs {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      input[type="submit"] {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background-color: ${({ theme }) => theme.colors.white};
          border: 1px solid ${({ theme }) => theme.colors.btn};
          color: ${({ theme }) => theme.colors.btn};
          transform: scale(0.9);
        }
      }
    }
  }
}
`;
export default EditContectData;