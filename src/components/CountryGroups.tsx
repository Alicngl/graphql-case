// CountryGroups.js
import React, { useState } from "react";

interface Country {
  code: string;
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
}

interface CountryGroupsProps {
  countries: Country[];
  filterText: string;
  groupCurrency: string;
  groupByCurrency: boolean;
}

const CountryGroups: React.FC<CountryGroupsProps> = ({
  countries,
  filterText,
  groupCurrency,
  groupByCurrency,
}) => {
  const [code, setCode] = useState<string | undefined>();

  let filteredCountries = countries;

  if (groupByCurrency) {
    const groupedData: { [key: string]: Country[] } = {};

    countries.forEach((country) => {
      const currency = country.currency || "N/A";

      if (country.name.toLowerCase().includes(filterText.toLowerCase())) {
        if (!groupedData[currency]) {
          groupedData[currency] = [];
        }
        groupedData[currency].push(country);
      }
    });

    return (
      <div>
        {Object.keys(groupedData).map((currency) => (
          <div key={currency}>
            <h2>Currency: {currency}</h2> {/* Currency değerini ekle */}
            <div className="grid grid-cols-3 gap-4">
              {groupedData[currency].map((country) => (
                <div
                  key={country.code}
                  onClick={() => {
                    setCode(country.code);
                    console.log(country.code);
                  }}
                  className={`p-4 flex justify-between my-5 rounded-md shadow-md hover:shadow-xl ${
                    code === country.code
                      ? "bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 transition-all duration-1000"
                      : ""
                  }`}>
                  <div className="min-w-min">
                    <p className="text-sm">Name: {country.name}</p>
                    <p className="text-sm">Capital: {country.capital}</p>
                    <p className="text-sm">Emoji: {country.emoji}</p>
                    <p className="text-sm w-18">Currency: {country.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    filteredCountries = countries.filter((country) => {
      const currency = country.currency || "";
      const currencyMatches = currency
        .toLowerCase()
        .includes(groupCurrency.toLowerCase());
      const nameMatches = country.name
        .toLowerCase()
        .includes(filterText.toLowerCase());
      return currencyMatches && nameMatches;
    });
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <div
            key={country.code}
            onClick={() => {
              setCode(country.code);
              console.log(country.code);
            }}
            className={`p-4 flex justify-between my-5 rounded-md shadow-md hover:shadow-xl ${
              code === country.code
                ? "bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600 transition-all duration-1000"
                : ""
            }`}>
            <div className="min-w-min">
              <p className="text-sm">Name: {country.name}</p>
              <p className="text-sm">Capital: {country.capital}</p>
              <p className="text-sm">Emoji: {country.emoji}</p>
              <p className="text-sm w-18">Currency: {country.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryGroups;
