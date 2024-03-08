import { useState, useEffect } from "react";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [fromCurrencyValue, setFromCurrencyValue] = useState(1);
  const [toCurrency, setToCurrency] = useState("INR");
  const [toCurrencyValue, setToCurrencyValue] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);

  const fetchData = async () => {
    const response = await fetch(
      `https://open.er-api.com/v6/latest/${fromCurrency}`
    );
    const data = await response.json();
    if (allCountries.length < 1) {
      setAllCountries(Array.from(Object.keys(data.rates)));
    }
    setExchangeRate(data.rates[toCurrency]);
    setToCurrencyValue(data.rates[toCurrency].toFixed(2));
  };

  useEffect(() => {
    fetchData();
  }, [fromCurrency, toCurrency]);

  const handleToInput = (e) => {
    if (e.target.value > 0 && !isNaN(e.target.value) ? e.target.value : "") {
      setFromCurrencyValue(e.target.value);
      setToCurrencyValue((e.target.value * exchangeRate).toFixed(2));
      return;
    }
    return;
  };

  return (
    <div className="text-center mt-[10%] mx-auto cursor-default">
      <h1 className="mb-10 text-4xl tracking-[10px] hover:tracking-normal transition-all">
        Currency Converter
      </h1>
      <div className="flex flex-col gap-5 bg-gray-400 rounded-lg py-10 max-w-[700px] mx-auto">
        <div>
          <input
            placeholder="Enter a value"
            type="number"
            value={fromCurrencyValue}
            onChange={(e) => {
              handleToInput(e);
            }}
            min={0}
            className="border border-black border-1 mr-2 pl-1"
          />
          <select
            name="from"
            id="from"
            className="hover:cursor-pointer w-[150px]"
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {allCountries?.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="number"
            disabled={true}
            value={toCurrencyValue}
            className="border border-white border-1 mr-2 pl-1 cursor-not-allowed bg-gray-400 text-white"
          />
          <select
            name="to"
            id="to"
            className="hover:cursor-pointer  w-[150px]"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {allCountries?.map((currency) => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
