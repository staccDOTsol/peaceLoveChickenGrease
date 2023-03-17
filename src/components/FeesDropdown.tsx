// FeesDropdown.tsx
import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import axios from 'axios';
import { FeeContext } from '../contexts/FeeContext';

interface FeeDropdownProps {
  children?: React.ReactNode; // Include the children prop
}

const FeesDropdown: React.FC<FeeDropdownProps> = () => {
  const [fees, setFees] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setSelectedFee } = useContext(FeeContext);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get<Record<string, number>>('https://mempool.space/api/v1/fees/recommended');
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
    console.log(selectedValue)
    setSelectedFee(selectedValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!fees) {
    return <div>Error loading fees.</div>;
  }

  return (
    <select onChange={handleChange}>
      <option value="">Select a fee</option>
      {Object.entries(fees).map(([key, value]) => (
        <option key={key} value={value}>
          {key}: {value} sat/vB
        </option>
      ))}
    </select>
  );
};

export default FeesDropdown;