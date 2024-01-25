import "./style.scss";
import React from "react";
import Title from "../../Components/Title/Title";
import UploadForm from "../../Components/UploadForm/UploadForm";
import ImageGrid from "../../Components/ImageGrid/ImageGrid";
import Modal from "../../Components/Modal/Modal";
import { useState } from "react";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

function Homepage() {

  const [selectedImg, setSelectedImg] = useState(null);

  
  return (
    <div className="homepage">
       <Title/>
       <UploadForm/>
       <ImageGrid setSelectedImg={setSelectedImg}/>
       { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/>}
    </div>
  );
}

export default Homepage;
