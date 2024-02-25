import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";

const useStorage = (file, category, isAdding) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // Si le bouton "Add" n'est pas encore cliqué, ne rien faire
    if (!isAdding || !file || !category) {
      return;
    }

    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("images");

    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        console.error("Erreur pendant le téléchargement :", err);
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt, category });
        setUrl(url);
      }
    );

    return () => uploadTask.cancel();
  }, [file, category, isAdding]);

  return { progress, url, error };
};

export default useStorage;
