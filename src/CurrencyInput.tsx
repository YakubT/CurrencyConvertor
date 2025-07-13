import axios from "axios";
import { useEffect, useState } from "react";

type CurrencyInputProps = {
  value: string;
  onDataChange: Function;
  convertValue?: number | undefined;
};

export function CurrencyInput({
  value,
  onDataChange,
  convertValue = undefined,
}: CurrencyInputProps) {
  const [selectValue, setSelectValue] = useState<string>(
    value === "original" ? "USD" : "EUR"
  );
  const [inputValue, setInputValue] = useState<number>();

  const [currencyList, setCurrencyList] = useState<string[]>([]);

  const [amount, setAmount] = useState<number>();

  useEffect(() => {
    if (convertValue !== undefined) {
      if (value === "convert" && convertValue !== undefined) {
        setAmount(convertValue);
      }
    }
  }, [convertValue, value]);

  useEffect(() => {
    async function fetchCurrencyList() {
      try {
        const response = await axios.get(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json"
        );
        const mapped = Object.entries(response.data).map(([code]) =>
          code.toUpperCase()
        );
        setCurrencyList(mapped);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    }

    fetchCurrencyList();
  }, []);

  useEffect(() => {
    onDataChange(selectValue, inputValue);
  }, [inputValue, onDataChange, selectValue]);
  return (
    <div className="flex justify-center h-14">
      {value === "original" ? (
        <input
          type="number"
          className="w-3/5 pl-2 mt-5 rounded-l-md border-slate-300 border-2 border-r-0"
          name={`${value}-amount`}
          onChange={(e) => setInputValue(Number.parseFloat(e.target.value))}
        />
      ) : (
        <div
          className="w-3/5 pl-2 mt-5 rounded-l-md border-slate-300 border-2
          border-r-0 text-left"
        >
          {amount}
        </div>
      )}
      <select
        name="select"
        className="w-1/5 mt-5 rounded-r-md text-center border-slate-300
        border-2"
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      >
        {currencyList.map((code) => (
          <option key={code}>{code}</option>
        ))}
      </select>
    </div>
  );
}
