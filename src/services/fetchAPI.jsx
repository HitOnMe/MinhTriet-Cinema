import { useState, useEffect } from 'react';
import configData from './config';

const UseFetchTheatre = (url) => {
  const [theatre, setTheatre] = useState(null);
  const [loading, setLoading] = useState(true);  // State to track loading
  const [error, setError] = useState(null);  // State to track errors

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await configData('GET', url);
        setTheatre(response.data);
      } catch (err) {
        setError(err.message);  // Set error if request fails
      } finally {
        setLoading(false);  // Set loading to false once the request is complete
      }
    };

    getData();
  }, [url]); 

  return { theatre, loading, error };  // Return loading and error state
};

export default UseFetchTheatre;
