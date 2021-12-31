import React, {useState} from 'react';
import { auth } from '../config/Config';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(()=>{
            setEmail('');
            setPassword('');
            setError('');
            navigate('/');
        }).catch(err=>setError(err.message));
    }

    return (
        <div className='container'>
        <br />
        <center><span style={{fontSize:30}}>🔑</span></center>
        <h2 style={{textAlign: "center"}}>Login</h2>
        <br />
        <form autoComplete='off' className='form-group' onSubmit={login}>
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
        <span>Don't have an account? Register{' '} 
            <Link to="/signup">Here</Link>
        </span>
    </div>
    );
}

export default Login;
