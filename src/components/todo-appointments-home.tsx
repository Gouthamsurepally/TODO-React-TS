import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { AppointmentContract } from "../contracts/AppointmentContract";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

 
export function ToDoAppointmentsHome(){

    const[cookies,setCookie,removeCookie]=useCookies(['userId']);
    const[appointments,setAppointments]=useState<AppointmentContract[]>([]);
    const[toggleAdd,setToggleAdd]=useState({display:'none'});
    const[toggleEdit,setToggleEdit]=useState({display:'none'});
    const[editAppoint,setEditAppoint]=useState([{Id:0,Title:'',Date:'',Description:'',UserId:''}]);

    let navigate=useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/userappointments/${cookies['userId']}`)
        .then((response)=>{
            setAppointments(response.data);
        })
    },[]);

    function handleSignout(){
        removeCookie('userId');
        navigate('/login');
    }

    function handleRemoveClick(e:any){
        axios.delete(`http://127.0.0.1:4000/deletetask/${e.target.value}`);
        window.location.reload();
    }

    const formik=useFormik({
        initialValues:{
            Id:appointments.length+1,
            Title:"",
            // Date:new Date(),
            Date:new Date().toISOString().split('T')[0],
            Description:"",
            UserId:''

        },
        onSubmit:(appointment)=>{
            axios.post(`http://127.0.0.1:4000/addtask`,appointment)
            .then((response)=>{
                setAppointments([...appointments,response.data]);
                alert("appointment added successfully");
                window.location.reload();
            })
         
        }
        
    })

    function handleAddClick(){
        setToggleAdd({
            display:'block'
        });
        setToggleEdit({display:'none'});
    }

    function handleEditClick(id:any){
        setToggleAdd({display:'none'});
        setToggleEdit({display:'block'});
        axios.get(`http://127.0.0.1:4000/appointments/${id}`)
        .then((response)=>{
            console.log('Fetched appointment data:', response.data);
            const appointment = response.data;

            console.log('user id from cookies:', cookies['userId']);
            console.log('user id from fetched appointment:', appointment.UserId)

            if(appointment.UserId === cookies['userId'] || !appointment.UserId){
               setEditAppoint(appointment);
            }
            else{
                console.error("different data fetching")
            }
            
        })
       
    }

    const editFormik = useFormik({
        initialValues:{ 
            Id:editAppoint[0].Id,
            Title:editAppoint[0].Title,
            Date:editAppoint[0].Date,
            Description:editAppoint[0].Description,
            UserId:editAppoint[0].UserId

        },

        enableReinitialize:true,
        onSubmit:(appointment)=>{
            axios.put(`http://127.0.0.1:4000/edittask/${editAppoint[0].Id}`,appointment);
            alert("Appointment updated successfully");
            window.location.reload();

        }
    })

    return(
        <div className="container-fluid p-4">
            <div className="mt-4 p-3" aria-label="AddAppointments" style={toggleAdd}>
                <form className="w-50" onSubmit={formik.handleSubmit}>
                    
                    <h2 className="text-center">Add Appointments</h2>
                    
                    <dl>
                        <dt>Id</dt>
                        <dd><input type="text"  name="Id"  onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Title</dt>
                        <dd><input type="text" name="Title"  onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Date</dt>
                        <dd><input type="date" name="Date"   onChange={formik.handleChange} className="form-control" /></dd>
                        <dt>Description</dt>
                        <dd><input type="textarea"  name="Description" onChange={formik.handleChange} className="form-control"/></dd>
                        <dt>UserId</dt>
                        <dd><input type="text"  name="UserId"  onChange={formik.handleChange} className="form-control"/></dd>
                    </dl>
                    
                    <button type="submit" className="btn btn-primary">Add </button>
                </form>

            </div>

            <div aria-label="EditAppointments" className="mt-4 p-4" style={toggleEdit} >
                <form className="w-50" onSubmit={editFormik.handleSubmit}>
                  
                        <dl>
                        <dt>Id</dt>
                        <dd><input type="text" name="Id" value={editFormik.values.Id} onChange={editFormik.handleChange} className="form-control" /></dd>
                        <dt>Title</dt>
                        <dd><input type="text" name="Title" value={editFormik.values.Title} onChange={editFormik.handleChange} className="form-control" /></dd>
                        <dt>Date</dt>
                        <dd><input type="date" name="Date" value={editFormik.values.Date} onChange={editFormik.handleChange} className="form-control" /></dd>
                        <dt>Description</dt>
                        <dd><input type="text" name="Description" value={editFormik.values.Description} onChange={editFormik.handleChange} className="form-control" /></dd>
                        <dt>UserId</dt>
                        <dd><input type="text" name="UserId" value={editFormik.values.UserId} onChange={editFormik.handleChange} className="form-control" /></dd>
                    </dl>
                       
                    <button type="submit" className="btn btn-success">Update</button>
                </form>
               

            </div>

            <h4>Your Appointments - {cookies['userId']} <button onClick={handleSignout} className="btn btn-warning" >SignOut</button>

            </h4>
            <div className="mt-2 mb-2">
                <button onClick={handleAddClick} className="bi bi-calendar btn btn-light">Add Appointment</button>
             
            </div>
            <main>
            <div className="d-flex flex wrap">
                {
                   
                    appointments.map(appointment=>
                        <div key={appointment.Title} className="alert w-25 me-3 alert-success alert-dismissible p-2" >
                            <div className="card-header">
                                <h4>{appointment.Title}</h4>
                                <button value={appointment.Id} onClick={handleRemoveClick} className="btn btn-close" ></button>

                            </div>
                            <div className="card-body">
                                <p>{appointment.Description}</p>
                                <p className="text-end text-secondary">{new Date(appointment.Date).toLocaleDateString()}</p>

                            </div>
                            <div className="card-footer">
                                <div className="mb-3 text center">By:                                                                                                                                                                                                                                                                                               {appointment.UserId}</div>
                            <button onClick={()=>handleEditClick(appointment.Id) } className=" ms-4 bi bi-upload btn btn-dark" >Edit Appointment</button>
                            </div>

                        </div>
                        )
                        
                }
                </div>
            </main>
        </div>
    )
}