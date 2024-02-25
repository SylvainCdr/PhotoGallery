import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";

const useStorage = (file, category) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {

    if (!file || !category) {
      return;
    }
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("images");

    // Gérer le processus de téléchargement en utilisant on() plutôt que put()
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        // Calculer le pourcentage de progression
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        console.error("Erreur pendant le téléchargement :", err);
        setError(err);
      },
      async () => {
        // Si tout se passe bien, récupérer l'URL de l'image
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();

        // Ajouter le document uniquement après le téléchargement complet
        collectionRef.add({ url, createdAt, category });
        setUrl(url);
      }
    );

    // Nettoyage de l'écouteur lorsqu'il n'est plus nécessaire
    return () => uploadTask.cancel();
  }, [file, category]);

  return { progress, url, error };
};

export default useStorage;
