

import React from "react";
import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import useStorage from "../../Hooks/useStorage";
import useFirestore from "../../Hooks/useFirestore";


// ... rest of your code ...


// Création du composant UploadForm
// Ce composant permettra à l'utilisateur de sélectionner une image à uploader
const UploadForm = () => {
  // Création de la variable d'état file qui sera initialisée à null
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);

  const { docs } = useFirestore("images");
  const { url, progress } = useStorage(file, category);


  // Création de la variable pour les types de fichiers autorisés
const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file && category) {
      setFile(null);
      setCategory('');
    } else {
      setError('Please select an image and category before submitting the form.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="add-img">
      <label>
        <span>+</span>
        <input type="file" onChange={handleChange} />
      </label>
      </div>

      <div className="add-category">

        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} />}
      </div>

      <button type="submit">Add</button>


    </form>
  );
};

export default UploadForm;