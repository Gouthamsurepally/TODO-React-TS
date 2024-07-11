import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserContract } from "../contracts/userContract";

export function ToDoLogin(){
    const[cookies,setCookie,removeCookie]=useCookies(['userId']);

    let navigate=useNavigate();
    const formik=useFormik<UserContract>({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(values)=>{
            axios.get('http://127.0.0.1:4000/users')
            .then((response)=>{
                let user:UserContract|undefined =response.data.find((item:any)=>item.UserId==values.UserId);
                if(user){
                    if(user.UserId===values.UserId && user.Password===values.Password){
                        setCookie('userId',values.UserId);
                        navigate('/appointments');
                        
                    }else{
                        navigate('/error');
                    }
                }else{
                    navigate('/error');
                }
            })
        }
    })
    
    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <form className="w-25 bg-primary-subtle rounded rounded-4 p-4" onSubmit={formik.handleSubmit} >
               <h2 className="text-center">User Login</h2>
               <dl>
                <dt>User Id</dt>
                <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                <dt>Password</dt>
                <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
               </dl>
               <button className="btn btn-primary w-100">Login</button>
               <Link to='register' className="btn btn-light w-100 mt-2">New User|Register</Link>


            </form>
          
        </div>
    )
}