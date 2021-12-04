import React from "react";
const MyCard = ({imageUrl, description,alt})=> {
    return <div className="card w-18 shadow-lg " >
         <img src={imageUrl} className="img" alt={alt}/>
        <div className ="card-body">
        <p className ="card-text text-center">{description}</p>
        </div>
    </div>;
}
export default MyCard;