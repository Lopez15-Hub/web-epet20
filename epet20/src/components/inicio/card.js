import React from "react";
const MyCard = ({imageUrl, description})=> {
    return <div class="card w-18 shadow-lg" >
         <img src={imageUrl} class="d-block img" alt="#"/>
        <div class ="card-body">
        <p class ="card-text">{description}</p>
        </div>
    </div>;
}
export default MyCard;