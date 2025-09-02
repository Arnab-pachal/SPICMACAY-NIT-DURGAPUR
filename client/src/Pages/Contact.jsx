import React, { useState } from 'react';

const ContactUsWithMap = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    if(formData.name === "" || formData.email === "" || formData.message === ""){
      alert("Please fill all the fields");
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch('https://spicmacay-nit-durgapur.onrender.com/valid/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-full">
        {/* Left Contact Info */}
        <div className="bg-red-500 text-white p-8 md:w-2/5 lg:w-1/2">
          <h1 className="text-3xl font-semibold mb-6">Contact Us</h1>
          <p className="text-md font-bold mb-4 mt-8">Our Friendly Team Will Love To Hear From You</p>
          <div className="space-y-4 text-sm mt-8">
            <div className="flex items-start space-x-3">
              <div>
                <b className='text-lg'>National Institute of Technology Durgapur</b><br /><br />
                <b>An Institute of National Importance under Government of India,
                  Ministry of Human Resource Development</b><br /><br />
                West Bengal, India<br />Pin: 713209
              </div>
            </div>
            <br />
            <br />
            <div className="flex items-start space-x-3">
              <span>📧   Gmail:</span>
              <div>spicmacay.nitd@gmail.com</div>
            </div>
            <div className="flex items-start space-x-3">
              <span>📠</span>
              <div>ananya - +91 9531611417</div>
            </div>
            <div className="flex items-start space-x-3">
              <span>📠</span>
              <div>ritayan - +91 91233 59208</div>
            </div>
          </div>
        </div>

        {/* Right Form and Map */}
        <div className="flex-1 p-8 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get in Touch</h2>
          <p className="text-sm text-gray-500 mb-6">Feel free to drop us a line below!</p>
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-md focus:outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-md focus:outline-none"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Typing your message here......"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-md focus:outline-none"
              style={{ color: "black" }}
            />
            <button
              type="submit"
              className="bg-red-500 text-black py-2 px-6 rounded-full shadow-md hover:bg-red-600 transition"
              onClick={handleSubmit}
            >
              SEND
            </button>
          </form>

          <div className="h-64 w-full rounded-lg overflow-hidden shadow">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.577948545365!2d87.29095021453448!3d23.547677702408144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f772081cede5e9%3A0x33fb9ccb243dfa5!2sNational+Institute+of+Technology!5e0!3m2!1sen!2sin!4v1541686389902"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsWithMap;
