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
    <div>
      <h1>List of Countries</h1>
      <Filter
        filterText={filterText}
        groupCurrency={groupCurrency}
        onFilterTextChange={handleFilterTextChange}
        onGroupCurrencyChange={handleGroupCurrencyChange}
      />
      <CountryGroups
        countries={countries}
        filterText={filterText}
        groupCurrency={groupCurrency}
      />
    </div>
  );
}

export default CountryList;
