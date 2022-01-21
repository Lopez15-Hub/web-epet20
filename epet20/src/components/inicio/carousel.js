import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Image1 from "../../assets/carousel1.png";
import Image2 from "../../assets/carousel2.jpg";
import Image3 from "../../assets/carousel3.jpg";
import { db } from "../../firebase/firebaseConfig";
import { UseLoading } from "../../hooks/useLoading";
import { LoadingSpinner } from "../general/loading";
export default function MyCarousel() {
  const { loading, setLoading } = UseLoading();
  const [imagesFiles, setImagesFiles] = useState([])
  useEffect(() => {
    const getImagesFromFirestore = async () => {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, "images"));
      const imagesDocs = [];

      querySnapshot.forEach(doc => {

        imagesDocs.push({ ...doc.data(), id: doc.id })


      });
      setImagesFiles(imagesDocs);
      setLoading(false)
    }
    let enabled = true;
    if (enabled) {
      getImagesFromFirestore()
    }
    return () => enabled = false;
  }, [setLoading]);
  return <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    {imagesFiles.length !== 0 ? <>
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>

      </div>
      <div className="carousel-inner rounded-lg shadow-md">


        <div className="carousel-item active">
          <img src={imagesFiles[0].url} className="img-carousel d-block w-100 " alt="frente de la epet20" />
          <div className="carousel-caption font-bold  rounded-xl shadow-xl text-center nav-background d-none d-md-block">
            <h5>{imagesFiles[0].description}</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img src={imagesFiles[1].url} className=" img-carousel d-block w-100 " alt="inagurando la escuela" />
          <div className="carousel-caption font-bold nav-background rounded-xl shadow-xl text-center  d-none d-md-block">
            <h5>{imagesFiles[1].description}</h5>

          </div>
        </div>
        <div className="carousel-item">
          <img src={imagesFiles[2].url} className="img-carousel d-block  w-100" alt="inagurando la escuela" />
          <div className="carousel-caption font-bold nav-background rounded-xl shadow-xl text-center d-none d-md-block">
            <h5>{imagesFiles[2].description}</h5>

          </div>

        </div>
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
