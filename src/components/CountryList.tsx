import React, { useState } from "react";
import Filter from "./Filter";
import CountryGroups from "./CountryGroups";

function CountryList({ countries }) {
  const [filterText, setFilterText] = useState("");
  const [groupCurrency, setGroupCurrency] = useState("");

  const handleFilterTextChange = (text) => {
    setFilterText(text);
  };

  const handleGroupCurrencyChange = (currency) => {
    setGroupCurrency(currency);
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
