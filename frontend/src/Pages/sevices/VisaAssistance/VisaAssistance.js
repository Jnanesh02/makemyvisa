import React, { useState, useEffect } from "react";
import axios from "axios";
import './VisaAssistance.css'
const VisaAssistance = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    visaExperts: "",
    country: "",
    destination: "",
    
    
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/submit', formData);
      console.log(response.data);
     
    } catch (error) {
      console.error('Error submitting form:', error);
 
    }
  };

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
       <div style={{
  backgroundImage: "url('https://hsconsultants.net/assets/images/student-visa-assistance-header.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}}>
  <h2 className="text-center" style={{color:"#fe5141",fontSize:"60px"}}>Visa Assistance</h2>
</div>

    <div className="VisaAssistance__box p-5 d-flex justify-content-around" 
    
    
    style={{
      backgroundImage: "url('')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
      
    }}>

      

    <div className="VisaAssistance__Content w-50" style={{ margin: '0 auto', maxWidth: '600px'}}>
      <h3 className="VisaAssistance__title" style={{ textTransform: 'capitalize' }}>Visa Assistance</h3>
      <p style={{ wordSpacing: '2px', letterSpacing: '1px', textAlign: 'justify' }}>
        {showFullText ?
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente minus vero cupiditate placeat quam soluta aliquam doloribus reiciendis molestias dolorum consequuntur commodi, possimus optio nihil maiores, voluptatem quaerat. Necessitatibus debitis minima molestias veritatis hic voluptas nisi ex magni asperiores fugit corrupti amet, veniam, tenetur unde iste aperiam voluptates quaerat. Mollitia quam impedit, veniam architecto dignissimos ullam, accusamus nulla aliquam, totam porro voluptatem odio maxime dolorum velit nobis fuga iure itaque veritatis aliquid. Quibusdam provident quas odio. Deleniti id temporibus, voluptatibus qui dolore nisi dignissimos ipsa omnis voluptas excepturi quibusdam ullam consequuntur distinctio aut perferendis placeat, ratione repellendus obcaecati magni reiciendis?"
          :
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente minus vero cupiditate placeat quam soluta aliquam doloribus reiciendis molestias dolorum consequuntur commodi, possimus optio nihil maiores, voluptatem quaerat. Necessitatibus debitis minima molestias veritatis hic voluptas nisi ex magni asperiores fugit corrupti amet, veniam, tenetur unde iste aperiam voluptates quibusdam."}
      </p>
      <button className="btn btn-link" onClick={toggleText}>
        {showFullText ? "Read Less" : "Read More"}
      </button>
    </div>
      <div className="VisaAssistance__FormApplication card p-3" >
      <div className="VisaAssistance__Form">
          <h3 className="VisaAssistance__Form--title">
            Request a call back from our Visa Assistance experts
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              
              <input type="text" className="form-control" id="FullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="Email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="Email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
              </div>
              <div className="col">
                <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                <input type="tel" className="form-control" id="phonenumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="VisaExperts" className="form-label">Please explain your situation to our Visa Assistance Experts</label>
              <textarea className="form-control" id="VisaExperts" name="visaExperts" value={formData.visaExperts} onChange={handleChange} rows="3"></textarea>
            </div>
            <div className="row mb-3">
              <div className="col">
                
                <select className="form-select" id="country" name="country" value={formData.country} onChange={handleChange}>
                  <option value="">Choose your country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
              <div className="col">
                
                <select className="form-select" id="destination" name="destination" value={formData.destination} onChange={handleChange}>
                  <option value="">Choose your destination</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
            
            
            <button type="submit" className="btn btn-danger mx-auto d-block">Submit</button>

          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VisaAssistance;
