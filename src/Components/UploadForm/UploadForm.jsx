import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import useStorage from "../../Hooks/useStorage";
import useFirestore from "../../Hooks/useFirestore";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { docs } = useFirestore("images");
  const { url, progress } = useStorage(file, category, isSubmitting);

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

  const handleAdd = () => {
    // Vérifier que le fichier et la catégorie sont sélectionnés avant de soumettre
    if (file && category) {
      setIsSubmitting(true);
    } else {
      setError('Please select an image and category before submitting the form.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Soumission réelle du formulaire si le bouton "Add" a été cliqué
    if (isSubmitting) {
      setFile(null);
      setCategory('');
      setIsSubmitting(false);
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose a category</option>
          <option value="nature">Nature</option>
          <option value="city">City</option>
          <option value="people">People</option>
        </select>
      </div>

      <div>
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} />}
      </div>

      {/* Utiliser le type "button" pour éviter la soumission automatique du formulaire */}
      <button type="button" onClick={handleAdd}>Add</button>
    </form>
  );
};

export default UploadForm;
