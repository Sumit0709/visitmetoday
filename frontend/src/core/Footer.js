import React from 'react'

import css from'./Footer.css'
import encryption from '../media/encryption2.png'
import india from '../media/India.png'

const Footer = () => {

  return (
    <footer className="padding_4x">
    <div className="flex">
        <section className="flex-content padding_1x">
        <h3>visitme.today</h3>
        <a href="#">About Us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms and conditions</a>
        <a href="#">Change Language</a>
        </section>
        <section className="flex-content padding_1x">
        {/* <h3>Features</h3> */}
        <img width={'80%'} src={encryption}/>
        <p>Copyright ©2023</p>
        <p>All rights reserved</p>
        <p></p>
        </section>
        <section className="flex-content padding_1x">
        {/* <h3>Resources</h3> */}
        <div className='india'>
            <img width={'50%'} style={{width:'50%', minWidth:'150px'}} src={india} />
        </div>
        <p href="#">100% Indian</p>
        <p href="#">Made in India</p>
        <p href="#">Made by Indians</p>
        </section>
        <section className="flex-content padding_1x">
        <h3>Quick Links</h3>
        
        <a href="#">Sitemap</a>
        <a href="#">Career</a>
        <a href="#">Blog</a>
        <a href="#">Contact Us</a>
        </section>
        {/* <section className="flex-content padding_1x">
        <h3>Newsletter</h3>
        <p>You can trust us. we only send promo offers,</p>
        <fieldset className="fixed_flex">
            <input type="email" name="newsletter" placeholder="Your Email Address"/>
            <button className="btn btn_2">Subscribe</button>
        </fieldset>
        </section> */}
    </div>
    <div className="">
        {/* <section className="flex-content padding_1x">
        <p>Copyright ©2023  || visitme.today</p>
        </section> */}
        {/* <section className="flex-content padding_1x">
        <a href="#"><i className="fa fa-facebook"></i></a>
        <a href="#"><i className="fa fa-twitter"></i></a>
        <a href="#"><i className="fa fa-dribbble"></i></a>
        <a href="#"><i className="fa fa-linkedin"></i></a>
        </section> */}
    </div>
    </footer>
  )
}

export default Footer
