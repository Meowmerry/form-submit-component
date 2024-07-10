import { useState } from "react";
import type {FormData} from "../models/FormData";

export function mockAPI(data: FormData) {
  const successRate = 0.5;
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

export function useAPI() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const reset = () => {
    setSuccess(false);
    setError('');
  }

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