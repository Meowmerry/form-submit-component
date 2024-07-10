import { useState } from "react";
import type {FormData} from "../models/FormData";

/** TODO
 * Mock API function simulating an asynchronous API call
 * This function simulates a network request with a delay and a 60% success rate
 * @param data The form data to be sent
 * @returns A promise that resolves with the data or rejects with an error
 */

export function mockAPI(data: FormData) {
  
  const successRate = 0.6; 
  const delay = Math.random() * 2000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 1 - successRate) {
        resolve(data);
      } else {
        reject('Error');
      }      
    }, delay);
  })
}

// Custom hook for managing API calls
export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setSuccess(false);
    setError('');
  }

  // Create function to make API call
  const callAPI = async (data: FormData) => {
    setLoading(true);
    setSuccess(false);
    setError('');
    try {
      await mockAPI(data);
      setSuccess(true);
    } catch (error) {
      setError('Failed to save. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    success,
    callAPI,
    reset,
  }
}