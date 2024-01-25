import React from "react";
import { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";


// ... rest of your code ...


// Création du composant UploadForm
// Ce composant permettra à l'utilisateur de sélectionner une image à uploader
const UploadForm = () => {
  // Création de la variable d'état file qui sera initialisée à null
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);


  // Création de la variable pour les types de fichiers autorisés
  const allowedTypes = ["image/png", "image/jpeg"];

  // Création de la fonction changeHandler
  const changeHandler = (e) => {

    // On récupère le fichier sélectionné par l'utilisateur
    let selected = e.target.files[0];

    // Si un fichier est sélectionné et que son type est autorisé
    if (selected && allowedTypes.includes(selected.type)) {
        // On met à jour la variable d'état file avec le fichier sélectionné
      setFile(selected);
      setError("");
    } else {
        setFile(null);
setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <form>
        <label>
        <span>+</span>
      <input type="file" onChange={changeHandler} />
      </label>
      <div className="output">
        {/* Si la variable d'état error est définie, on affiche le message d'erreur */}
        { error && <div className="error">{ error }</div>}
         {/* Si la variable d'état file est définie, on affiche le nom du fichier */}
        { file && <div>{ file.name }</div>}
  {/* Si la variable d'état file est définie, on affiche la barre de progression */}
{ file && <ProgressBar file={file} setFile={setFile} />}

      </div>
    </form>
  );
};

export default UploadForm;
