import React, { useEffect, useState } from "react";

function CountryList({ countries }: any) {
  const [filterText, setFilterText] = useState("");
  const [groupCurrency, setGroupCurrency] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<any>(null);

  useEffect(() => {
    // İsim filtrelemesi
    const nameFilteredData = countries.filter((country: any) =>
      country.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // Currency filtrelemesi (eğer currency girildiyse)
    let currencyFilteredData = nameFilteredData;
    if (groupCurrency) {
      currencyFilteredData = nameFilteredData.filter(
        (country: any) =>
          country.currency?.toLowerCase() === groupCurrency.toLowerCase()
      );
    }

    setFilteredCountries(currencyFilteredData);
  }, [countries, filterText, groupCurrency]);

  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleGroupCurrencyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupCurrency(e.target.value);
  };

  // Currency değerlerini bulma ve boş grupları filtreleme
  const currencyValues = [
    ...new Set(countries.map((country: any) => country.currency)),
  ].filter(Boolean);

  return (
    <div>
      <h1>List of Countries</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={filterText}
          onChange={handleFilterTextChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Filter by currency..."
          value={groupCurrency}
          onChange={handleGroupCurrencyChange}
        />
      </div>
      {currencyValues.map((currency: string) => {
        const countriesInGroup =
          filteredCountries &&
          filteredCountries.filter(
            (country: any) => country.currency === currency
          );

        if (countriesInGroup.length === 0) {
          return null; // Boş grupları gösterme
        }

        return (
          <div key={currency}>
            <h2>Currency: {currency}</h2>
            <ul>
              {countriesInGroup.map((country: any) => (
                <li key={country.code}>
                  <p>Name: {country.name}</p>
                  <p>Native Name: {country.native}</p>
                  <p>Capital: {country.capital}</p>
                  <p>Emoji: {country.emoji}</p>
                  <p>Currency: {country.currency}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default CountryList;
