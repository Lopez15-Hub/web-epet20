import React from "react";
const MyCard = ({imageUrl, description,alt})=> {
    return <div className="card w-18 rounded-b-xl shadow-md " >
         <img src={imageUrl} className="img" alt={alt}/>
        <div className ="card-body">
        <p className ="card-text text-center">{description}</p>
        </div>
    </div>;
}
export default MyCard;