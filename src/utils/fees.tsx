import axios from 'axios';

async function calculateTransactionCostInSol(satoshisPerByte, bytesPerTransaction): Promise<number | null> {
  try {
    // Fetch the SOL to BTC price from Kraken
    const response = await axios.get('https://api.kraken.com/0/public/Ticker?pair=SOLXBT');
    const solToBtcPrice = parseFloat(response.data.result.SOLXBT.c[0]);

    // Calculate the total transaction cost in Bitcoin
    const totalTransactionCostInBtc = satoshisPerByte * bytesPerTransaction * 0.00000001;

    // Convert the transaction cost to Solana
    const transactionCostInSol = totalTransactionCostInBtc / solToBtcPrice;

    return transactionCostInSol;
  } catch (error) {
    console.error('Error fetching SOL to BTC price:', error);
    return null;
  }
}