import React, { useState } from "react";
import Filter from "./Filter";
import CountryGroups from "./CountryGroups";

function CountryList({ countries }: any) {
  const [filterText, setFilterText] = useState("");
  const [groupCurrency, setGroupCurrency] = useState("");

  const handleFilterTextChange = (text: any) => {
    setFilterText(text);
  };

  const handleGroupCurrencyChange = (currency: any) => {
    if (currency.trim() === "") {
      // Eğer currency değeri boşsa, grupCurrency'yi boş bir dize olarak ayarla
      setGroupCurrency("");
    } else {
      setGroupCurrency(currency);
    }
  };

  return (
    <div className="flex justify-center min-w-full">
      <div className="w-3/5">
        <h1 className="text-4xl text-center p-3">List of Countries</h1>
        <div className="rounded-md p-5 shadow-md w-22">
          <Filter
            filterText={filterText}
            groupCurrency={groupCurrency}
            onFilterTextChange={handleFilterTextChange}
            onGroupCurrencyChange={handleGroupCurrencyChange}
          />
        </div>
        <CountryGroups
          countries={countries}
          filterText={filterText}
          groupCurrency={groupCurrency}
        />
      </div>
    </div>
  );
}

export default CountryList;
