import React, {useEffect} from 'react';
import '../css/Home.css';
import Navbar from './Navbar';
import Products from './Products';
import { auth } from '../config/Config';
import { useNavigate } from 'react-router-dom';

const Home = ({user}) => {

    const navigate = useNavigate();
    // forcing user to login
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(!user){
                navigate('/login');
            }
        })
    })

    return (
        <div className='wrapper'>
            <Navbar user={user} />
            <Products />
        </div>
    );
}

export default Home;
