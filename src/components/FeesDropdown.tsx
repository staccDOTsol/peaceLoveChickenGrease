// FeesDropdown.tsx
import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import axios from 'axios';
import { FeeContext } from '../contexts/FeeContext';
import { useLocalStorage } from '@solana/wallet-adapter-react';

interface FeeDropdownProps {
  children?: React.ReactNode; // Include the children prop
}

const FeesDropdown: React.FC<FeeDropdownProps> = () => {
  const [fees, setFees] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { selectFee } = useContext(FeeContext);
  const { selectedFee } = useContext(FeeContext);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get<Record<string, number>>(
          'https://mempool.space/api/v1/fees/recommended'
        );
        // remove the last item from this array
        response.data = Object.fromEntries(
          Object.entries(response.data).slice(0, -1)
        );
        
        setFees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fees:', error);
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value, 10);
    console.log(event.target.value);
    console.log('selected fee in fees dropdown', selectedValue);
    selectFee(selectedValue); // Use the selectFee function instead of setSelectedFee
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!fees) {
    return <div>Error loading fees.</div>;
  }

  return (
    <select
      className="w-50 py-2 px-1 rounded-lg outline-none"
      onChange={handleChange}
    >
      <option value="">Select a fee for your delivery</option>
      {Object.entries(fees).map(([key, value]) => (
        <option key={key} value={value}>
          {key}: {value} sat/vB
        </option>
      ))}
    </select>
  );
};

export default FeesDropdown;
