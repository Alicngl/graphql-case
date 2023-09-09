import React, { useState } from "react";
import LazyLoad from "react-lazy-load";

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
}

const CountryGroups: React.FC<CountryGroupsProps> = ({
  countries,
  filterText,
  groupCurrency,
}) => {
  const [code, setCode] = useState<string | undefined>();

  // Filtreleme ve gruplandırma işlemlerini yapın
  const filteredCountries = countries.filter((country) => {
    const currency = country.currency || ""; // Eğer currency null ise boş bir string yap

    const currencyMatches = currency
      .toLowerCase()
      .includes(groupCurrency.toLowerCase());

    const nameMatches = country.name
      .toLowerCase()
      .includes(filterText.toLowerCase());

    return currencyMatches && nameMatches;
  });

  return (
    <div>
      {groupCurrency && <h2>Currency: {groupCurrency}</h2>}
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
                ? "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 transition-all duration-1000"
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
