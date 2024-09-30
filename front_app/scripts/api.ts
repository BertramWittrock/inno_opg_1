import axios from 'axios';

const API_BASE_URL = 'http://your-flask-api-url'; // Replace with your actual Flask API URL

export interface PhoneNumber {
  id: number;
  phone_number: string;
  created_at: string;
}

interface AvailableNumber {
  id: number;
  phone_number: string;
  price: number;
}

export const getPurchasedNumbers = async (): Promise<PhoneNumber[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/purchased_numbers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching purchased numbers:', error);
    throw error;
  }
};

export const getAvailableNumbers = async (): Promise<AvailableNumber[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/available_numbers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available numbers:', error);
    throw error;
  }
};

export const purchaseNumber = async (numberId: number): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/purchase_number`, { number_id: numberId });
  } catch (error) {
    console.error('Error purchasing number:', error);
    throw error;
  }
};

// Remove these functions if they're no longer needed
// export const insertPhoneNumber = async (phoneNumber: string): Promise<void> => { ... }
// export const insertSampleData = async (): Promise<void> => { ... }