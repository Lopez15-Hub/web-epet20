import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Subtitle } from '../text-styles/subtitle';
export const SingleContact = ({ personName, email, linkedlnURL, instagramURL }) => {
    return (
        <>
            <div className="font-bold mt-2 mb-2">
                <Subtitle text={personName} />
            </div>
            <div className="d-flex">

                <div className="row">
                    <div className="col-1 mt-1"><FaGoogle className="main-color"/></div>
                    <div className="col-3">
                        <a href={`mailto:${email}`} className="col-xs-12 col-sm-12  col-md-4 col-xl-4 text-center  ">Email</a>
                    </div>
                    <div className="col-1 mt-1"><FaLinkedin className="main-color" /></div>
                    <div className="col-4">

                        <a href={linkedlnURL} className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ml-2">Linkedln</a>
                    </div>
                    <div className="col-1 mt-1"><FaInstagram className="main-color" /></div>
                    <div className="col-2">
                        <a href={instagramURL} className="col-xs-12 col-sm-12  col-md-4 col-xl-4  ml-2">Instagram</a>
                    </div>
                </div>

            </div>
        </>
    )
}
