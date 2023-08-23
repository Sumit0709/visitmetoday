import React, { useEffect } from "react";
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'

import Home from "./core/home/Home"
import Signup from './user/Signup'
import Signin from './user/Signin'
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import UpdateBasicProfile from "./user/basicProfile/UpdateBasicProfile";
import UpdateProfilePhoto from "./user/profilePhoto/UpdateProfilePhoto";
import UpdateExtendedProfile from "./user/extendedProfile/UpdateExtendedProfile";
import ProfilePreview from "./user/ProfilePreview";
import UpdateCustomUrl from "./user/customUrl/UpdateCustomUrl";
import UsersList from "./admin/usersList/UsersList";
import AdminHome from "./admin/AdminHome";
import VerifyUser from "./admin/verification/VerifyUser";
import VerifyEmail from "./user/VerifyEmail";
import VerifyMobileNumber from "./user/VerifyMobileNumber";
import UpdatePassword from "./user/UpdatePassword";
import ForgetPassword from "./user/ForgotPassword";
import UpdateEmail from "./user/UpdateEmail";
import UpdateMobileNumber from "./user/UpdateMobileNumber";
import VerifyEmailAndMobile from "./user/VerifyEmailAndMobile";
import Homed from "./core/home/Homed";
import CardPage from "./user/CardPage";
import DummyEmailOtp from "./DummyEmailOtp";
import DummyMobileOtp from "./DummyMobileOtp";
import ScrollToTop from "./core/ScrollToTop";
import Payment from "./transaction/Payment";
import UpdatePaymentDetails from "./admin/transactions/UpdatePaymentDetails";
import Page404 from "./core/Page404";
import ValidatePayment from "./admin/transactions/ValidatePayment";
import CreateUserAccount from "./admin/createUserAccount/CreateUserAccount";
import UserAllDetail from "./admin/usersList/UserAllDetail";
import UpdateUser from "./admin/update/UpdateUser";
import Map from "./user/extendedProfile/Map";
import CreateProfessionalProfile from "./user/CreateProfessionalProfile";
import EditProfessionalProfile from "./user/EditProfessionalProfile";
import ProfessionalProfilePreview from "./user/ProfessionalProfilePreview";
import ProfessionalCardPage from "./user/ProfessionalCardPage";
import UpdateBasicProfessionalProfile from "./user/basicProfile/UpdateBasicProfessionalProfile";
import UpdateExtendedProfessionalProfile from "./user/extendedProfile/UpdateExtendedProfessionalProfile";
import UpdateCustomProfessionalUrl from "./user/customUrl/UpdateCustomProfessionalUrl";
import UpdateProfessionalProfilePhoto from "./user/profilePhoto/UpdateProfessionalProfilePhoto";
import CreateProfile from "./user/CreateProfile";
import ReferedToList from "./admin/referedToList/ReferedToList";
import UserHome from "./user/UserHome";
import ViewsAnalysis from "./user/ViewsAnalysis";
import UserCard from "./user/UserCard";

const MyRoutes = () => {
    
    // const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <BrowserRouter>
        <ScrollToTop/>
            <Routes>
                // exact is by default set to true 
                <Route path="/" exact element={<Homed/>}/>
                <Route path="/auth/signup" element={<Signup/>}/> 
                <Route path="/auth/signin" element={<Signin/>}/> 
                <Route path="/auth/verify" element={<VerifyEmailAndMobile/>}/> 
                <Route path="/auth/verify/email" element={<VerifyEmail/>}/> 
                <Route path="/auth/verify/mobileNumber" element={<VerifyMobileNumber/>}/> 
                <Route path="/forgot/password" element={<ForgetPassword/>}/>
                <Route path="/auth/payment" element={<Payment/>}/> 

                <Route path="/update/password" element={<UpdatePassword/>}/>
                <Route path="/update/email" element={<UpdateEmail/>}/>
                <Route path="/update/mobileNumber" element={<UpdateMobileNumber/>}/>

                {/* <Route path="/profile/edit" element={<EditProfile/>}/> */}
                <Route path="/:profileUrl" element={<ProfilePreview/>}/>
                <Route path="/:profileUrl/card" element={<UserCard/>}/>
                <Route path="/b/:profileUrl" element={<ProfessionalProfilePreview/>}/>
                <Route path='/user/home/' element={<UserHome/>}/>
                <Route path='/user/analysis/' element={<ViewsAnalysis/>}/>
                <Route path='/user/profile/edit' element={<EditProfile/>}/>
                <Route path='/user/profile/create' element={<CreateProfile/>}/>
                <Route path='/user/profile/b' element={<CreateProfessionalProfile/>}/>

                <Route path='/user/profile/b/edit' element={<EditProfessionalProfile/>}/>
                <Route path='/user/404' element={<Page404/>}/>
                <Route path='/user/profile/edit/basicProfile' element={<UpdateBasicProfile/>}/>
                <Route path='/user/profile/b/edit/basicProfile' element={<UpdateBasicProfessionalProfile/>}/>

                <Route path='/user/profile/edit/extendedProfile' element={<UpdateExtendedProfile/>}/>
                <Route path='/user/profile/b/edit/extendedProfile' element={<UpdateExtendedProfessionalProfile/>}/>
                
                <Route path='/user/profile/edit/profilePhoto' element={<UpdateProfilePhoto/>}/>
                <Route path='/user/profile/b/edit/profilePhoto' element={<UpdateProfessionalProfilePhoto/>}/>
                
                <Route path='/user/profile/edit/userName' element={<UpdateCustomUrl/>} />
                <Route path='/user/profile/b/edit/userName' element={<UpdateCustomProfessionalUrl/>} />

                {/* <Route path='/user/map'element={<Map/>}/> */}

                <Route path='/admin/home' element={<AdminHome/>}/>
                <Route path='/admin/users' element={<UsersList/>}/>
                <Route path='/admin/users/verify/:userId' element={<VerifyUser/>}/>
                <Route path='/admin/users/allDetails/:userId' element={<UserAllDetail/>}/>
                <Route path='/admin/users/update/:userId' element={<UpdateUser/>}/>
                
                <Route path='/admin/updatePaymentDetails' element={<UpdatePaymentDetails/>}/> 
                <Route path='/admin/validatePayment' element={<ValidatePayment/>}/> 
                <Route path='/admin/createUserAccount' element={<CreateUserAccount/>}/> 
                
                <Route path='/admin/referedToList' element={<ReferedToList/>}/> 
                

                <Route path='/user/card' element={<CardPage/>} />
                <Route path='/user/b/card' element={<ProfessionalCardPage/>} />
                {/* <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/profile" exact component={Profile}/> //empty profile (PUBLIC)
                <Route path="/profile/edit/:profileUrl" exact component={Profile}/> //profile with read and write ability (PROCTECTED)
                <Route path="/profile/:profileUrl" exact component={Profile}/> //profile with read only (PUBLIC) */}

                <Route path='/email/test' element={<DummyEmailOtp/>} />
                <Route path='/mobile/test' element={<DummyMobileOtp/>} />

                <Route path='*' element={<Page404/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes