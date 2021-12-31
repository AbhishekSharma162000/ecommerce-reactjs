import React, { useState } from 'react';
import { auth, db } from '../config/Config';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    // defining state using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const Signup = (e) => {
        e.preventDefault();
        // console.log('form submitted');
        // console.log(name, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((cred)=>{
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(()=>{
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                navigate('/login');
            }).catch(err=>setError(err.message));
        }).catch(err=>setError(err.message));
    }

    return (
        <div className='container'>
            <br />
            <center><span style={{fontSize:30}}>🔐</span></center>
            <h2 style={{textAlign: "center"}}>Sign Up</h2>
            <br />
            <form autoComplete='off' className='form-group' onSubmit={Signup}>
                <label htmlFor="Name">Name</label>
                <br />
                <input type="text" className="form-control" required 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                 />
                <br />
                <label htmlFor="Email">Email address</label>
                <br />
                <input type="email" className="form-control" required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                <br />
                <label htmlFor="Password">Password</label>
                <br />
                <input type="password" className="form-control" required 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
                <br />
                <div className="d-flex justify-content-center">
                <button type='submit' className="btn btn-success">REGISTER</button>
            </div>
            </form>
            {error && <div className='error-mssg'>{error}</div>}
            <br/>
            <span>Already have an account? Login{' '} 
                <Link to="/login">Here</Link>
            </span>
        </div>
    );
}

export default Signup;
