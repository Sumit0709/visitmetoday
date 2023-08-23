import React from 'react'
import { useNavigate } from 'react-router-dom';
import Base from './Base';

import page404 from './Page404.css'

const Page404 = () => {

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/',{replace: true})
    }

  return (
    <Base>
    
    <main className='main_404'>
        <div className="intro-text-container">
        <p className="intro-text">404 NOT FOUND</p>
        </div>
        <section className="container_404">
        <div className="Scarecrow" />
        <div className="error-message-container">
            <p className="error-heading">I have bad news for you</p>
            <p className="error-text">
            The Page You are looking for does not exist.
            </p>
            <div onClick={goToHomePage} className="text-center myButton cursor_pointer">
                Go to Home Page
            </div>
        </div>
        </section>
    </main>
    </Base>

  )
}

export default Page404;
