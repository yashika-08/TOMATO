import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
const Footer = () => {
    return (
        <div className='footer' id="footer">
            <div className='footer-content'>
                <div className = 'footer-content-left'>
                <img src = {assets.logo} alt = ""/>
                <p>At Tomato, we believe great food brings people together. Whether you're craving a spicy street-style snack or a comforting home-cooked meal, our platform connects you with the best local kitchens and delivery partners to make every bite memorable. With a commitment to freshness, speed, and customer satisfaction, with one order at a time. From our kitchen to your doorstep, Tomato is here to serve flavor, convenience, and trust</p>
                <div className = 'footer-social-icons'>
                    <img src= {assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
                </div>
                <div className = 'footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                
                </div>
                <div className = 'footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-1234567890</li>
                    <li>contact@tomato.com</li>
                </ul>
                </div>

            </div>
            <hr/>
            <p className="footer-copyright">Copyright © 2025 Tomato.com. All rights reserved.</p>
        </div>
    )
}
export default Footer;