import React from 'react'
import { CardText, CardTitle } from 'reactstrap';


export const Anuncio = () => {
    return <>
        <div className='border rounded-t-lg p-2'>
            <CardTitle tag="h5">
                Card Title
            </CardTitle>
            <CardText>
                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            </CardText>
            <CardText>
                <small className="text-muted">
                    Last updated 3 mins ago
                </small>
            </CardText>
        </div>
        <img
            className='img-anuncio w-100'
            alt="anuncio imagen"
            src="https://picsum.photos/200/200"

        />
    </>;
};
