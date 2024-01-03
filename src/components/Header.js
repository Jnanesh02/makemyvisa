import React from 'react'
import Logo from "../assets/images/logo.png";
import avatar from "../assets/images/avatar.png";
import {Link} from "react-router-dom"
import "../index.css"

function Header() {
  return (
    <main class="content">
      <header>
        <section class="header-section">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-2 col-sm-4 col-md-4 col">
                        <img class="header-logo" src={Logo} />
                    </div>
                    <div class="col-lg-10 col-sm-8 col-md-8  nav-cont-b">
                        <nav class="navbar navbar-expand-lg bg-body-tertiary navbar-section">
                            <div class="container-fluid">
                              
                              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                              </button>
                              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0 navbar-list">
                                  <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#"> Visa </a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" href="#"> Travel ItineraryInsurance</a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" href="#"> Apostille & Attestation </a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" href="#"> Study/Admission </a>
                                  </li>
                                  <li class="nav-item">
                                    <a class="nav-link" href="#"> Contact Us </a>
                                  </li>
                               
                                </ul>
                                <div class="dropdown drp-navbar">
                                  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={avatar}/>
                                  </button>
                                  <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                  </ul>
                                </div>
                                
                              </div>
                            </div>
                          </nav>
                          
                    </div>
                </div>
            </div>
        </section>
    </header>
    {/* <div class="header-form" id="myHeader">
            <div class="slider-form">
              <h4 class="mb-3 form-heading"> Query Form </h4>
          <form>
              <div class="mb-4 form-inputs-controls">
                <input type="text" placeholder="Name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div class="mb-4 form-inputs-controls">
                <input type="password" class="form-control" placeholder="Phone no" id="exampleInputPassword1"/>
              </div>
              <div class="mb-4 form-inputs-controls">
                  <input type="password" class="form-control" placeholder="Email" id="exampleInputPassword1"/>
                </div>
                <select class="form-select mb-4 form-inputs-controls" aria-label="Default select example">
                  <option selected> Service Type </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                <select class="form-select mb-4 form-inputs-controls" aria-label="Default select example">
                  <option selected> Visa </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
           
              <button type="submit" class="btn btn-primary submit form-control-btn">Submit</button>
            </form>
          </div>
          </div> */}
    </main>
    
  )
}

export default Header
