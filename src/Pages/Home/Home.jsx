import "./style.scss";
import React from "react";
import Title from "../../Components/Title/Title";
import UploadForm from "../../Components/UploadForm/UploadForm";
import ImageGrid from "../../Components/ImageGrid/ImageGrid";

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

function Homepage() {
  
  return (
    <div className="homepage">
       <h1>test</h1>
       <Title/>
       <UploadForm/>
       <ImageGrid/>
    </div>
  );
}

export default Homepage;
