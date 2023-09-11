// CountryList.tsx
import React, { useState, ChangeEvent } from "react";
import Filter from "./Filter";
import CountryGroups from "./CountryGroups";

interface Country {
  code: string;
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
}

interface Props {
  countries: Country[];
}

function CountryList({ countries }: Props) {
  const [filterText, setFilterText] = useState<string>("");
  const [groupCurrency, setGroupCurrency] = useState<string>("");
  const [groupByCurrency, setGroupByCurrency] = useState<boolean>(false);

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  const handleGroupCurrencyChange = (currency: string) => {
    if (currency.trim() === "") {
      setGroupCurrency("");
    } else {
      setGroupCurrency(currency);
    }
  };

  const handleGroupByCurrencyClick = () => {
    setGroupByCurrency(!groupByCurrency);
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/4 md:w-3/5">
        <h1 className="sm:text-4xl md:text-4xl text-center p-3 font-bold">
          LIST OF COUNTRIES
        </h1>
        <div className="rounded-md p-5 shadow-md">
          <Filter
            filterText={filterText}
            groupCurrency={groupCurrency}
            onFilterTextChange={handleFilterTextChange}
            onGroupCurrencyChange={handleGroupCurrencyChange}
            onGroupByCurrencyClick={handleGroupByCurrencyClick}
          />
        </div>
        <div>
          <CountryGroups
            countries={countries}
            filterText={filterText}
            groupCurrency={groupCurrency}
            groupByCurrency={groupByCurrency}
          />
        </div>
      </div>
    </div>
  );
}

export default CountryList;
