import React from 'react'
import { Subtitle } from '../text-styles/subtitle'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
export const SocialLinks = () => {
    return (
        <>
      
            <div className=" d-flex text-center" >


                <div className="d-flex p-2">

                    <FaInstagram className="main-color" />
                    <a href="https://www.instagram.com/epet20educacion/" className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  ">  @epet20educacion</a>
                </div>
                <div className="d-flex p-2">


                    <FaFacebook className="main-color" />
                    <a href="https://www.facebook.com/EPET20" className="col-xs-12 col-sm-12  col-md-9 col-lg-9 col-xl-9 ml-1 uppercase">Epet 20</a>
                </div>
                <div className="d-flex p-2">

                    <FaTwitter className="main-color" />
                    <a href="https://twitter.com/epet20educacion" className="col-xs-12 col-sm-12   col-md-4 col-lg-4 col-xl-4 ">@epet20educacion</a>
                </div>

            </div>
        </>
    )
}
