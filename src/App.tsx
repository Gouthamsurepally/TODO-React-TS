import React from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDoAppointmentsHome } from './components/todo-appointments-home';
import { ToDoLogin } from './components/todo-login';
import { ToDoRegister } from './components/todo-register';
import { ToDoError } from './components/todo-error';


function App() {
  return (
    <div className="container-fluid">
      <div className="shade">
        <header className='p-2 text-center bg-primary-subtle rounded rounded-3'>
          <h1>To-Do : Your Appointments </h1>
        </header>
        <section>
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<ToDoLogin></ToDoLogin>}></Route>
            <Route path='login' element={<ToDoLogin></ToDoLogin>}></Route>
            <Route path='appointments' element={<ToDoAppointmentsHome></ToDoAppointmentsHome>} />
            <Route path='register' element={<ToDoRegister></ToDoRegister>}></Route>
            <Route path='error' element={<ToDoError></ToDoError>}></Route>
          </Routes>
          </BrowserRouter>
        </section>

      </div>

    </div>
 
  );
}

export default App;
