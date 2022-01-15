import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
export const SocialLinks = () => {
    return (
        <>

            <div className="container " >

                <div className='row text-center'>
                    <a href="https://www.instagram.com/epet20educacion/" className="d-flex  col-sm-12 col-md-2 "><FaInstagram className="main-color" />  @epet20educacion</a>
                    <a href="https://www.facebook.com/EPET20" className=" uppercase d-flex  col-sm-12 col-md-2">   <FaFacebook className="main-color" />Epet 20</a>
                    <a href="https://twitter.com/epet20educacion" className="d-flex  col-sm-12 col-md-2"> <FaTwitter className="main-color" />@epet20educacion</a>

                </div>
            </div>
        </>
    )
}
