import { useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
import { CurrencyInput } from "./CurrencyInput";
import axios from "axios";

export function Form() {
  const [originalCurrency, setOriginalCurrency] = useState("USD");
  const [convertCurrency, setConvertCurrency] = useState("EUR");
  const [originalValue, setOriginalValue] = useState<number>();
  const [convertValue, setConvertValue] = useState<number>();

  async function calculate() {
    const apiOrCur = originalCurrency.toLowerCase();
    const convertOrCur = convertCurrency.toLowerCase();
    const res = (
      await axios.get(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${apiOrCur}.json`
      )
    ).data[apiOrCur];
    if (originalValue != undefined) {
      setConvertValue(res[convertOrCur] * originalValue);
    }
  }

  function handleOriginalData(originalCurrency: string, originalValue: number) {
    setOriginalCurrency(originalCurrency);
    setOriginalValue(originalValue);
  }

  function handleConvertData(convertCurrency: string, convertValue: number) {
    setConvertCurrency(convertCurrency);
  }

  return (
    <div className="border-slate-100 border-2 shadow-lg col-start-2 row-start-2 rounded-lg">
      <main className="pt-8 text-center">
        <div className="uppercase font-bold tracking-tight font-arial text-lg">
          currency converter
        </div>
        <CurrencyInput value="original" onDataChange={handleOriginalData} />
        <ArrowIcon />
        <CurrencyInput value="convert" onDataChange={handleConvertData} convertValue={convertValue}/>
        <button type="button"
          className="mt-10 bg-blue-500 w-4/5 text-white rounded-md h-12 hover:bg-blue-400"
          onClick={(e)=>calculate()}
        >
          Convert
        </button>
      </main>
    </div>
  );
}
