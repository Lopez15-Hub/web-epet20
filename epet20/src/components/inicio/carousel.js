import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { LoadingSpinner } from "../general/loading";
export default function MyCarousel() {

  const [imagesFiles, setImagesFiles] = useState([])
  const getImagesFromFirestore = async () => {

    const querySnapshot = await getDocs(collection(db, "images"));
    const imagesDocs = [];

    querySnapshot.forEach(doc => {

      imagesDocs.push({ ...doc.data(), id: doc.id })


    });
    setImagesFiles(imagesDocs);

  }
  useEffect(() => {

    let enabled = true;
    if (enabled) {
      getImagesFromFirestore()
    }
    return () => enabled = false;
  }, []);
  return <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    {imagesFiles.length !== 0 ? <>
      <div className="carousel-inner rounded-lg shadow-md">
        {
          imagesFiles.map(image => <div className={imagesFiles[0].id === image.id ? "carousel-item active" : 'carousel-item'} key={image.id} >
            <img src={image.url} className="img-carousel d-block w-100 " alt="frente de la epet20" />
            <div className="carousel-caption font-bold  rounded-xl shadow-xl text-center nav-background d-none d-md-block">
              <h5>{image.description}</h5>
            </div>
          </div>)
        }

      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </> : <LoadingSpinner text="Cargando imágenes..." />}
  </div>
}
