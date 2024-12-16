import React, { useEffect, useMemo, useState } from 'react';

const CurrencyTable = () => {
  const [rates, setRates] = useState({});
  const currencyCodes = useMemo(() =>['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'], []);
  const apiKey = 'df36deedbca04e0fab7ab76732e42ddc'; 

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(`https://api.currencyfreaks.com/latest?apikey=${apiKey}&symbols=${currencyCodes.join(',')}`);
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
      }
    };

    fetchRates();
  }, [currencyCodes, apiKey]);

  return (
    <div className="flex flex-col items-center text-center min-h-screen bg-orange-600 text-white justify-center">
      <table className="w-full max-w-md border border-white border-opacity-50">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-white border-opacity-50">Currency</th>
            <th className="px-4 py-2 border-b border-white border-opacity-50">We Buy</th>
            <th className="px-4 py-2 border-b border-white border-opacity-50">Exchange Rate</th>
            <th className="px-4 py-2 border-b border-white border-opacity-50">We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencyCodes.map((currency) => {
            const exchangeRate = parseFloat(rates[currency]);
            const weBuy = exchangeRate * 1.05;
            const weSell = exchangeRate * 0.95;

            return (
              <tr key={currency} className="odd:bg-white/20 even:bg-white/10">
                <td className="px-4 py-2 border-b border-white border-opacity-50">{currency}</td>
                <td className="px-4 py-2 border-b border-white border-opacity-50">{weBuy.toFixed(4)}</td>
                <td className="px-4 py-2 border-b border-white border-opacity-50">{exchangeRate.toFixed(4)}</td>
                <td className="px-4 py-2 border-b border-white border-opacity-50">{weSell.toFixed(4)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-4 text-sm">Rates are based from 1 USD.<br />This application uses API from https://currencyfreaks.com.</p>
    </div>
  );
};

export default CurrencyTable;