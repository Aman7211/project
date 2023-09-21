import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
       
        e.preventDefault();
        
        const response = await fetch("https://webcam-srkc.onrender.com/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: credentials.name, 
                email: credentials.email, 
                password: credentials.password })

        });
        
        const output = await response.json();
        if (!output.success) {
            alert("Enter Valid Credentials ")
        }
        navigate("/login");
    }
const onchange=(event)=>{
    setcredentials({...credentials,[event.target.name]:event.target.value})
}
    
    return (
        <>
            <div className="container" style={{"marginBottom":"10px", "marginTop":"20px"}}>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" 
                        className="form-control" 
                        name='name' 
                        value={credentials.name} 
                        onChange={onchange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        name='email' 
                        value={credentials.email} 
                        onChange={onchange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        name='password' 
                        value={credentials.password} 
                        onChange={onchange}/>
                    </div>

                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
                </form>
            </div>
        </>
    )
}
