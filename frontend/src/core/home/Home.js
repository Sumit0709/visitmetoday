import React, { useEffect, useState } from "react";
import { getCounter } from "../../apiCalls/counter";
import Base from "../Base";

// import homeCard from '../media/home.svg'
// import logo from '../media/LogoTransparent.png'

import home from './Home.css'
import Review from "./Review";
import cs from '../../media/cs.png'
import dmc from '../../media/dmc.jpeg'

import jagmohan from '../../media/jagmohan.jpeg'
import poojan from '../../media/poojan.jpeg'

import Counter from "./Counter";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../apiCalls/authUser";

import pay from '../../media/pay.png'
import WaitingList from "./WaitingList";

const Home = ({props}) => {
    
    

    const navigate = useNavigate();
    const authresult =  isAuthenticated()

    const [counters, setCounters] = useState({
        signup : 0,
        signin: 0,
        profileCreated: 0, 
        profileVisited: 0, 
        extendedProfiles: 0, 
        totalActiveTime: 0, 
        averageActiveTime: 0
    })

    const onGetCounter = () => {
        getCounter()
            .then(data => {
                if(data.success){
                    setCounters(data.counter);
                }
            })
    }

    useEffect(() => {
        onGetCounter();
    },[])

    const onSignup = (e) => {
        e.preventDefault();
        if(!authresult)
            navigate('/auth/signup')
        else navigate('/user/home')
    }

    return <div>
        <div className="sticky-background"></div>
        
        <div className="home_hero">
            <div className="hero_container">
                <div className="hero-text">
                    <h2 className="hero-welcome-text">Welcome To</h2>
                    <h1 className="hero-hostName"><span style={{color:'#45CFDD'}}>visitme</span>.<span style={{color:'red'}}>today</span></h1>
                    <p className="hero-text-description">Revolution in Visiting Cards</p>
                    {/* <button className="explore-btn">Explore</button> */}
                </div>
                <div className="home_register text-center">
                    <h4>Don't have an account?</h4>
                    <button onClick={onSignup} className="home_btn ">Register now!</button>

                    <div className="hero_link_div cursor_pointer"><a href="https://www.youtube.com/@visitmetoday" target='_blank' className='hero_link'>{`Show me how to create my E-Visiting Card ->`}</a></div>
                    <div className="cursor_pointer"><a href="https://www.youtube.com/@visitmetoday" target='_blank' className='hero_link'>{`Benefits of having E-Visiting card ->`}</a></div>
                    {/* <div>visitme.today is for Students, Travellers, Party Lovers, Employed and Job Seekers.</div> */}
                </div>
            </div>

            <div className="home_review">
            <div className="col-md mt-5 width80" style={{width:'80%', maxWidth:'380px' }}>
                <h2 className="text-center" style={{color: '#45CFDD', marginBottom:'20px'}}>Invite Only</h2>
                <p>- Registration on this website is Invite Only</p>
                <h6>- For invite code please contact us <a style={{color:'red'}} target="_blank" href="https://visitme.today/b/visitmetoday">here</a></h6>

            </div>

            <div className="col-md mt-5 width80" style={{width:'80%', maxWidth:'380px' }}>
                <h2 className="text-center" style={{color: '#45CFDD', marginBottom:'20px'}}>{`Benefits :)`}</h2>
                <h6>- All of your social profiles at <span style={{color:'#6C63FF'}}>one place</span>.</h6>
                <h6>- <span style={{color:'#6C63FF'}}>Control view</span> of your profiles visibility anytime.</h6>
                <h6>- Never loose your's / anyone's visitng card.</h6>
                <h6>- <span style={{color:'#6C63FF'}}>Update</span> your card <span style={{color:'#6C63FF'}}>anytime</span> and everyone gets update.</h6>
                <h6>- Know how many people are searching for you</h6>
                
            </div>
            </div>

            {/* <div className="text-center mt-5 width80">
                <h3 style={{color: 'red'}}>Pricing</h3>
                <h5>SWAG is never free</h5>
                <h4>Share your profile at a nominal fee of <span style={{color:'#875'}}>Rs. 100 per Year</span></h4>
                <img style={{width:'80%', maxWidth:'500px'}} src={pay}/>

                <h6>We accept UPI Payment only</h6>
                <h6>You can get details of UPI Id after Successful Registration</h6>
            </div> */}


            
            

            <div className="text-center" style={{marginTop: '80px'}}><button style={{ width:'80%', maxWidth:'500px'}} className="title_button">Listen to what our user says</button></div>
            {/* <div className="text-center mt-2 text-muted" style={{}}>Trusted by 100s of IIT, IIM, IAS, IPS, IFS, IRS, DU Students & Alumni, Facebook, Google, Amazon, Apple, Netflix, Linkedin, Twitter Employees</div> */}
            <div className="home_review" >
                <Review imgUrl={jagmohan} message={'I love to travel and it is easiest way to networking. I use it to communicate and make friends.'} name={'Jagmohan'} companyName={'Facebook'}/>
                <Review imgUrl={poojan} 
                message={'No need to search on all website, just visitme.today and you will find all my social links there.'} name={'Poojan'} companyName={'Expedia'}/>
            </div>

            <div className='createdBy text-center mt-5'>
                <button className="title_button" style={{fontSize: '20px', width:'80%', maxWidth:'500px'}}>This website is created by</button>
                
                <div className='developer mt-5'>
                    <div className='developer_cs'>
                        <img style={{height:"180px", width:"180px", objectFit:"cover", borderRadius: "50% 50%"}} src={cs}/>
                        <div style={{fontWeight:700, fontSize:'30px', color:'#875', marginTop:'15px'}}>cs</div>
                    </div>
                    <div className='developer_dmc'>
                        <img style={{height:"180px", width:"180px", objectFit:"cover", borderRadius: "50% 50%"}} src={dmc}/>
                        <div style={{fontWeight:700, fontSize:'27px', color:'#875', marginTop:'15px'}}>{`<src>`}</div>

                    </div>
                </div>
            </div>
            <hr/>
            <Counter/>
        </div>

    </div>

}

export default Home