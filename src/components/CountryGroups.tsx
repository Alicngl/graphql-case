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
  const [code, setCode] = useState<string>();
  // Gruplanmış veriyi saklamak için bir obje oluşturun
  const groupedData: { [key: string]: Country[] } = {};

  // Her bir ülkeyi doğru gruba ekleyin
  countries.forEach((country) => {
    const currency = country.currency || "N/A";

    // GrupCurrency belirtilmişse, o currency ile eşleşenleri filtrele
    if (
      groupCurrency &&
      currency.toLowerCase() !== groupCurrency.toLowerCase()
    ) {
      return;
    }

    // Filtreleme
    if (country.name.toLowerCase().includes(filterText.toLowerCase())) {
      if (!groupedData[currency]) {
        groupedData[currency] = [];
      }
      groupedData[currency].push(country);
    }
  });

  return (
    <div>
      {Object.keys(groupedData).map((currency) => {
        const countriesInGroup = groupedData[currency];

        if (countriesInGroup.length === 0) {
          return null; // Boş grupları gösterme
        }

        return (
          <div key={currency}>
            {groupCurrency == "" ? "" : <h2>Currency: {currency}</h2>}
            <ul>
              {countriesInGroup.map((country) => (
                <LazyLoad height={100} offset={300} threshold={0}>
                  <div
                    style={{
                      backgroundColor: code === country.code ? "#ccc9c9" : "",
                    }}
                    onClick={() => {
                      setCode(country.code);
                      console.log(country.code);
                    }}
                    className=" p-4 flex justify-between my-5 rounded-md shadow-md hover:shadow-xl"
                    key={country.code}>
                    <div className="min-w-min">
                      <p className="text-sm">Name: {country.name}</p>
                      <p className="text-sm">Capital: {country.capital}</p>
                      <p className="text-sm">Emoji: {country.emoji}</p>
                      <p className="text-sm w-18">
                        Currency: {country.currency}
                      </p>
                    </div>
                  </div>
                </LazyLoad>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CountryGroups;
