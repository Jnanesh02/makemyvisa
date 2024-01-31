import React from 'react';
import certificate1 from '../../assets/images/certificate/certificate-1.jpg';
import certificate2 from '../../assets/images/certificate/certificate-2.jpg';
import certificate3 from '../../assets/images/certificate/certificate-3.jpg';
import certificate4 from '../../assets/images/certificate/certificate-4.jpg';
import certificate5 from '../../assets/images/certificate/certificate-5.jpg';
import backgroundImage from "../../assets/images/certificate/relief-plaster-wall.jpg";
import "./HomeStyles/Home.css";
const CertificationSection = () => {
    return (
        <>
           <section className="certificate-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <h2> ACCREDITATION </h2>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="certicate-images-services">
                        <img className="certificate-img img-fluid" src={certificate1} alt="Certificate 1"/>
                        <img className="certificate-img img-fluid" src={certificate2} alt="Certificate 2"/>
                        <img className="certificate-img img-fluid" src={certificate3} alt="Certificate 3"/>
                        <img className="certificate-img img-fluid" src={certificate4} alt="Certificate 4"/>
                        <img className="certificate-img img-fluid" src={certificate5} alt="Certificate 5"/>
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
