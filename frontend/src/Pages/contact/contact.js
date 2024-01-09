import React from 'react'
import contactus from '../../assets/images/contactus.avif';
import backgroundImage from '../../assets/images/OJO4YQ0.jpg'
import "./contact.css"

function contact() {
  return (
    <div className='contact'>
    <div className='contact-container'>
      <img className='contactus' src={contactus}></img>
      <div class="contact-center">Contact Us</div>
    

    </div>
    <div>
    <section
          className="contact-section"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></section>
    </div>
    </div>

  )
}

export default contact
