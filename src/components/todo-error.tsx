import React from "react";
import { Link } from "react-router-dom";


export function ToDoError(){
    return(
        <div className="container-fluid">
            <h2 className="text-danger text-center">Invalid-Credentials</h2>
            <Link to="/">Try Again</Link>

        </div>
    )
}