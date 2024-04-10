import React from 'react';
import './Icons.css';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter, FaGithub } from 'react-icons/fa';

function Icons() {
  const openPaymentModal = () => {
    const options = {
      key: 'rzp_test_CTX1puiGnZAbrV', // Replace with your actual Razorpay API key
      amount: 10000, // Amount in paise (e.g., 10000 represents ₹100)
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for Service/Product',
      image: 'https://yourwebsite.com/logo.png', // URL of your company logo
      handler: function(response) {
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="social-icons">
      <a className="social-icon twitter" href="#" title="Twitter">
        <FaTwitter className="icon" />
        <span className="tooltip">Twitter</span>
      </a>
      <a className="social-icon dribbble" href="#" title="Whatsapp">
        <FaWhatsapp className="icon" />
        <span className="tooltip">Whatsapp</span>
      </a>
      <a className="social-icon facebook" href="#" title="Facebook">
        <FaFacebook className="icon" />
        <span className="tooltip">Facebook</span>
      </a>
      <a className="social-icon instagram" href="#" title="Instagram">
        <FaInstagram className="icon" />
        <span className="tooltip">Instagram</span>
      </a>
      <a className="social-icon github" href="#" title="Github">
        <FaGithub className="icon" />
        <span className="tooltip">Github</span>
      </a>
    </div>
  );
}

export default Icons;
