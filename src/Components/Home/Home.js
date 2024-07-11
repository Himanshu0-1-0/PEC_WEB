import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate("/Dashboard");
  }
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to PECWeb</h1>
          <p>Your portal to connect and engage within the PEC community.</p>
          <button className="cta-button" onClick={handleClick}>Get Started</button>
        </div>
        <div className="hero-image">
          <img src="/Slider31_0.jpg" alt="Bg_Img.." />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <div className="feature-card">
          <h3>-------</h3>
          <p>Connect with fellow students and faculty through our interactive platform.</p>
        </div>
        <div className="feature-card">
          <h3>-------</h3>
          <p>Stay updated with the latest news and events happening on campus.</p>
        </div>
        <div className="feature-card">
          <h3>-------</h3>
          <p>Access resources and tools to help you succeed in your studies.</p>
        </div>
        {/* Add more feature cards as needed */}
      </section>

      {/* About Us Section */}
      <section className="about">
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            PECWeb is dedicated to enhancing the student experience at PEC University. 
            Our platform provides a seamless way to connect with peers, faculty, and 
            stay informed about campus activities. We strive to create a vibrant and 
            supportive community that fosters learning, collaboration, and growth.
          </p>
        </div>
        <div className="about-image">
          <img src="/PEC_WEB.png" alt="About PECWeb" />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: himanshumehta8104@gmail.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <p><>Facebook</></p>
            <p><>Twitter</></p>
            <p><>Instagram</></p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <p><>Home</></p>
            <p><>About</></p>
            <p><>Services</></p>
            <p><>Contact</></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 PECWeb. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
