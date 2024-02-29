import React from "react";
import { Link } from "react-router-dom";
import "./service.css";
import Bgservices from "../assets/images/servicesImages/bg-services.png";
import services1 from "../assets/images/servicesImages/1.png";
import services2 from "../assets/images/servicesImages/2.png";
import services3 from "../assets/images/servicesImages/3.png";
import services4 from "../assets/images/servicesImages/4.png";
import services5 from "../assets/images/servicesImages/5.png";
import services6 from "../assets/images/servicesImages/6.png";
import services11 from "../assets/images/servicesImages/11.png";
import services12 from "../assets/images/servicesImages/12.png";
import services13 from "../assets/images/servicesImages/13.png";
import services14 from "../assets/images/servicesImages/14.png";
import servicesmain1 from "../assets/images/services-main-images/1-1.png";
import servicesmain2 from "../assets/images/services-main-images/2-1.png";
import servicesmain3 from "../assets/images/services-main-images/3-1.png";
import servicesmain4 from "../assets/images/services-main-images/4-1.png";
import servicesmain5 from "../assets/images/services-main-images/5-1.png";
import servicesmain6 from "../assets/images/services-main-images/6-1.png";
import servicesmain11 from "../assets/images/services-main-images/11-1.png";
import servicesmain12 from "../assets/images/services-main-images/12-1.png";
import servicesmain13 from "../assets/images/services-main-images/13-1.png";
import servicesmain14 from "../assets/images/services-main-images/14-1.png";
const Service = () => {
  return (
    <>



      <button
        type="button"
        className="btn btn-primary btn-sidenavbar-b"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Services
      </button>

      <div
        className="modal modal-em-m"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundImage: `url(${Bgservices})` }}
          >
            <div className="modal-body">
              <button
                type="button"
                className="services-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i
                  className="fa-solid fa-xmark"
                  style={{ color: "#fe5141" }}
                ></i>
              </button>

              <div
                id="carouselExample"
                className="carousel slide carousal-slider-services"
              >
                <div className="clients-cricle-section">

                <div class="myDIV active"> 
                <a target="blank" href="https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-pexels-photo.jpg">
                <img src={services1}/>
                </a>
                </div>

                <div class="hidee"> 
                <img src={services1}/> 
                <p>
                   Forex Services
                </p>
                 </div>         
                <div class="myDIVsecond"> 
                <img src={services2}/>
                </div>
                <div class="hideesecond"> 
                <img src={services2}/>
                <p>
                   Visa Assistance
                </p>
                   </div>     
                <div class="myDIVthree"> 
                <img src={services3}/>
                </div>
                <div class="hideethree"> 
                <img src={services3}/>  
                <p>
                   Ticketing
                </p>
                </div>   
                <div class="myDIVfour"> 
                <img src={services4}/>
                </div>
                <div class="hideefour"> 
                <img src={services4}/> 
                <p>
                   Hotel Reservation
                </p>
                 </div>   

                <div class="myDIVfive"> 
                <img src={services5}/>
                </div>
                <div class="hideefive">  
                
                 <img src={services5}/>
                 <p>
                   Travel Health
                </p>
                  </div>   

                <div class="myDIVsix"> 
                <img src={services6}/>
                </div>
                <div class="hideesix">  
                <img src={services6}/> 
                <p>
                  Immigration Advice
                </p>
                </div>   
                
                <div class="myDIVsixextra"> 
                <img src={services11}/>
                </div>
                <div class="hideesixextra"> 
                
                 <img src={services11}/> 
                 <p> Apostille & Attestation </p>
                 </div>   
                
                <div class="myDIVseven"> 
                <img src={services12}/>
                </div>
                <div class="hideeseven">
                  
                   <img src={services12}/> 
                   <p>
                    Translation & Notary
                   </p>
                   </div>   

                <div class="myDIVeight"> 
                <img src={services13}/>
               
                </div>
                <div class="hideeeight">
                    <img src={services13}/>
                    <p>
                       Courier, Pickup & Drop 
                    </p>
                     </div>   

                <div class="myDIVnine"> 
                <img src={services14}/>
                </div>
                <div class="hideenine">   
                 <img src={services14}/> 
                 <p>
                   Student Accommodation 
                 </p>
                 </div>   

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Service;
