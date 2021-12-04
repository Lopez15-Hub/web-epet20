import React from "react";
const MyCard = ({imageUrl, description,alt})=> {
    return <div class="card w-18 shadow-lg " >
         <img src={imageUrl} class="img" alt={alt}/>
        <div class ="card-body">
        <p class ="card-text">{description}</p>
        </div>
    </div>;
}
export default MyCard;