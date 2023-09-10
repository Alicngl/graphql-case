// CountryList.js
import React, { useState } from "react";
import Filter from "./Filter";
import CountryGroups from "./CountryGroups";

function CountryList({ countries }: any) {
  const [filterText, setFilterText] = useState("");
  const [groupCurrency, setGroupCurrency] = useState("");
  const [groupByCurrency, setGroupByCurrency] = useState(false);

  const handleFilterTextChange = (text: any) => {
    setFilterText(text);
  };

  const handleGroupCurrencyChange = (currency: any) => {
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
        <h1 className="sm:text-4xl md:text-4xl text-center p-3">
          List of Countries
        </h1>
        <div className="rounded-md p-5 shadow-md ">
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
