import React from "react";

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
};

export default CountryGroups;
