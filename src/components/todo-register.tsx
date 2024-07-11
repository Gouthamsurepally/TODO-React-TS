import React from "react";
import { UserContract } from "../contracts/userContract";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function ToDoRegister(){

    let navigate=useNavigate();
    const formik=useFormik<UserContract>({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Mobile:''
        },
        onSubmit : (values)=>{
            axios.post('http://127.0.0.1:4000/adduser',values);
            
               alert('Registered successfully..');
              navigate('/');
            
        }
    })
    return(
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:'100vh'}} >
            <form className="w-25 bg-success-subtle p-4 rounded rounded-4" onSubmit={formik.handleSubmit}>
                <h2 className="text-center">Register New User</h2>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Paassword</dt>
                    <dd><input type="password" name="Password" className="form-control" onChange={formik.handleChange} /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" className="form-control" onChange={formik.handleChange} /></dd>

                </dl>
                <button className="btn btn-primary w-100">Register</button>
                <Link to="/" className="btn btn-warning mt-2 w-100" >Existing User..? Login</Link>
            </form>
        </div>
    )
}