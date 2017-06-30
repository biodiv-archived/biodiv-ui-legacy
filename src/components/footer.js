import React, { Component} from 'react';
import mystyle from './style/footerstyle.css';

 const Footer =()=>{
  return (
      <footer className="container-fluid">
        <div className="row">
        <div className="col-xs-6 col-md-3">
          <ul className="list list-unstyled">
            <li className="list-item"><a href="#"><b>ALL SPECIES</b></a></li>
            <li className="list-item"><a href="#"><b>ALL MAPS</b></a></li>
            <li className="list-item"><a href="#"><b>ALL</b></a></li>
            <li className="list-item"><a href="#"><b>CHECKLISTS</b></a></li>
          </ul>
        </div>
        <div className="col-xs-6 col-md-3">
          <ul className="list list-unstyled">
            <li className="list-item"><a href="#"><b>THE PORTAL</b></a></li>
            <li className="list-item"><a href="#">Biodiversity in India</a></li>
            <li className="list-item"><a href="#">Technology</a></li>
            <li className="list-item"><a href="#">FAQ</a></li>


          </ul>
        </div>
        <div className="col-xs-6 col-md-3">
          <ul className="list list-unstyled">
            <li className="list-item"><a href="#"><b>PEOPLE</b></a></li>
            <li className="list-item"><a href="#">Partners</a></li>
            <li className="list-item"><a href="#">Donors</a></li>
            <li className="list-item"><a href="#">Fraternity</a></li>
            <li className="list-item"><a href="#">Team</a></li>
          </ul>
        </div>
        <div className="col-xs-6 col-md-3">
          <ul className="list list-unstyled">
            <li className="list-item"><a href="#"><b>POLICY</b></a></li>
            <li className="list-item"><a href="#">Data Sharing</a></li>
            <li className="list-item"><a href="#">Licenses</a></li>
            <li className="list-item"><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        </div>
        <hr />
      <div className="row">
                <div className="text-center">

                  <a href="http://facebook.com" className="btn btn-social-icon btn-facebook"><i className="fa fa-facebook"></i></a>
                  <a className="btn btn-social-icon btn-twitter"><i className="fa fa-twitter"></i></a>
                  <a className="btn btn-social-icon btn-google-plus"><i className="fa fa-google-plus"></i></a>
                </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm-3"></div>

        <div className="text-center col-sm-6">
        Best supported on Google Chrome, Firefox 3.0+, Internet Explorer 8.0+, Safari 4.0+, Opera 10+.
Powered by the open source <a href="">Biodiversity Informatics Platform.</a> Technology partner <a href="">Strand Life Sciences </a>
      </div>
        <div className="col-sm-3"></div>
      </div>
      </footer>
  )
}
export default Footer;
