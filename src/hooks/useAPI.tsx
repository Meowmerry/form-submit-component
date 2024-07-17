import { useState } from "react";
import type { FormData } from "../models/FormData";

/** TODO
 * Mock API function simulating an asynchronous API call
 * This function simulates a network request with a delay and a 60% success rate
 * @param data The form data to be sent
 * @returns A promise that resolves with the data or rejects with an error
 */

export enum LoadingStatus {
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  NOT_LOADING = "NOT_LOADING",
  ERROR = "ERROR"
}

export interface Loading {
  displayName: LoadingStatus;
  message: string;
}

// --- Mock API ----
export function mockAPI(data: FormData) {
  const successRate = 0.60;
  const delay = Math.random() * 2000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 1 - successRate) {
        resolve(data);
      } 
      else {
        reject("Error");
      }
    }, delay);
  });
}

// Custom hook for managing API calls
export function useAPI() {
  const [loading, setLoading] = useState<Loading>({
    displayName: LoadingStatus.NOT_LOADING,
    message: ""
  });

  const reset = () => {
    setLoading({
      displayName: LoadingStatus.NOT_LOADING,
      message: "Reset was successful."
    });
  };


  // Create function to make API call
  const callAPI = async (data: FormData) => {
    setLoading({
      displayName: LoadingStatus.LOADING,
      message: "Loading..."
    });
    try {
      await mockAPI(data);
      setLoading({
        displayName: LoadingStatus.SUCCESS,
        message: "Successfully saved."
      });
    } catch (error) {
      setLoading({
        displayName: LoadingStatus.ERROR,
        message: "Failed to save. Please try again."
      });
    }
  };
 

  return {
    loading,
    callAPI,
    reset,
  };
}
