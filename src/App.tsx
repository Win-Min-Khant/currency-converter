import { useEffect, useState } from "react"
import { useCurrencyRates } from "./hooks/useCurrencyRates";
import SelectCurrency from "./components/SelectCurrency";


function App() {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("MMK");
  const {rates, loading, error, currencies} = useCurrencyRates(fromCurrency);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    setConvertedAmount(0);
  }, [fromCurrency, toCurrency, amount]);
  
  function convertCurrency() {
    const rate = rates[toCurrency];
    if (!rate) return 0;
    const converted = amount * rate;
    setConvertedAmount(Number(converted.toFixed(2)));
  }
  return (
    <main className="flex items-center justify-center h-screen font-sans">
       <div className="w-100 border p-5 flex flex-col gap-5">
          <h3 className="text-center text-2xl font-bold">Welcome to our currency converter!</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-600">Amount</label>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="border py-1 px-2"/>
          </div>
          <div className="flex w-full gap-2">
            <SelectCurrency selectedOne={setFromCurrency} label={"From"} selectedCurrency={fromCurrency} currencies={currencies}/>
            <SelectCurrency selectedOne={setToCurrency} label={"To"} selectedCurrency={toCurrency} currencies={currencies}/>
          </div>
          <button onClick={convertCurrency} className="w-full bg-blue-600 py-2 cursor-pointer px-2 text-white text-sm font-medium rounded-md">Convert</button>
          <div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && convertedAmount !== 0 && <p className="text-center text-lg font-semibold">{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>}
            {!loading && !error && convertedAmount == 0 && <p className="text-center text-lg font-semibold">Click convert to see the result!</p>}
          </div>
       </div>
    </main>
  )
}

export default App
