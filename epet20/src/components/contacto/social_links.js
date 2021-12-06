import React from 'react'
import { Subtitle } from '../text-styles/subtitle'

export const SocialLinks = () => {
    return (
        <div className="mt-4">

            <div className="mb-2"> <Subtitle text="Redes sociales" /></div>
            <div className="d-flex">
                <div className="col-xs-12 col-sm-12 col-md-2 col-xl-2 "><Subtitle text="Instagram" /></div>
                <a href="https://www.instagram.com/epet20educacion/" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 ">@epet20educacion</a>
            </div>
            <div className="d-flex">
                <div className="col-xs-12 col-sm-12 col-md-2 col-xl-2 "><Subtitle text="Facebook" /></div>
                <a href="https://www.facebook.com/EPET20" className="col-xs-12 col-sm-12  col-md-4 col-xl-4 uppercase">Epet 20</a>
            </div>
            <div className="d-flex">
                <div className="col-xs-12 col-sm-12 col-md-2 col-xl-2 "><Subtitle text="Twitter" /></div>
                <a href="https://twitter.com/epet20educacion" className="col-xs-12 col-sm-12  col-md-4 col-xl-4">@epet20educacion</a>
            </div>

        </div>
    )
}
