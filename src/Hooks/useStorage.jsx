import { useState, useEffect } from "react";
import {projectStorage, projectFirestore, timestamp } from "../firebase/config";  // Import firebaseApp



// Hook pour gérer le stockage des images
const useStorage = (file) => {
  // Création des variables d'état, initialisées à null
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

 
  useEffect(() => {
    // Référence du stockage
    const StorageRef = projectStorage.ref(file.name);
    // Référence de la collection
    const collectionRef = projectFirestore.collection("images");

    // Upload du fichier dans la référence du stockage avec la méthode put
    StorageRef.put(file).on("state_changed",
      (snap) => {
        // Calcul du pourcentage de progression
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        // Mise à jour de la variable d'état progress
        setProgress(percentage);
      },
      // Gestion des erreurs
      (err) => {
        setError(err);
        // Si une erreur survient, on met à jour la variable d'état progress à 0
      },
      async () => {
        // Si tout se passe bien, on récupère l'URL de l'image
        const url = await StorageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt});
        setUrl(url);
      }
    );
  }, [file]);

  console.log("projectStorage", projectStorage);


  // On retourne les variables d'état progress, url et error
  return { progress, url, error };

}


export default useStorage;