import React from 'react';
import certificate1 from '../../assets/images/certificate/certificate-1.jpg';
import certificate2 from '../../assets/images/certificate/certificate-2.jpg';
import certificate3 from '../../assets/images/certificate/certificate-3.jpg';
import certificate4 from '../../assets/images/certificate/certificate-4.jpg';
import certificate5 from '../../assets/images/certificate/certificate-5.jpg';
import backgroundImage from "../../assets/images/certificate/relief-plaster-wall.jpg";
import "./Home.css";
const CertificationSection = () => {
    return (
        <>
           <section class="certificate-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <h2> ACCREDITATION </h2>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="certicate-images-services">
                        <img class="certificate-img img-fluid" src={certificate1} alt="Certificate 1"/>
                        <img class="certificate-img img-fluid" src={certificate2} alt="Certificate 2"/>
                        <img class="certificate-img img-fluid" src={certificate3} alt="Certificate 3"/>
                        <img class="certificate-img img-fluid" src={certificate4} alt="Certificate 4"/>
                        <img class="certificate-img img-fluid" src={certificate5} alt="Certificate 5"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

        </>
    );
}

export default CertificationSection;
