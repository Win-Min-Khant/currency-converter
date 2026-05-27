interface SelectCurrencyProps {
  label: string;
  selectedCurrency?: string;
  currencies: string[];
  selectedOne: (currency: string) => void;
}

function SelectCurrency({
  label,
  selectedCurrency,
  currencies,
  selectedOne,
}: SelectCurrencyProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor="" className="text-sm text-gray-600">
        {label}
      </label>
      <select
        onChange={(e) => selectedOne(e.target.value)}
        value={selectedCurrency}
        className="py-1 px-2 w-full bg-blue-500 text-white"
      >
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectCurrency;
