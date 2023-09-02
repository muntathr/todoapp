import React, { useEffect } from 'react'
import AppHeader from '../components/AppHeader';
import AppContent from '../components/AppContent';

const Home = () => {
    let isAuth = localStorage.getItem('auth');

    useEffect(()=>{
        if(!isAuth){
            window.location.href = '/auth';
            console.log('is not auth')
        }
    }, [isAuth])
    return (
        <div className='row'>
            <div className='col-12 col-md-2 col-xl-1'>
                <AppHeader />
            </div>
            <div className='col-12 col-md-10 col-xl-11'>
                <div className='container'>
                    <AppContent />
                </div>
            </div>
        </div>
    )
}

export default Home;