import React, { useEffect, useState } from "react";

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
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countries);
  const [groupedData, setGroupedData] = useState<{ [key: string]: Country[] }>(
    {}
  );

  useEffect(() => {
    let updatedFilteredCountries = countries;
    const newGroupedData: { [key: string]: Country[] } = {};

    if (groupByCurrency) {
      countries.forEach((country) => {
        const currency = country.currency || "N/A";

        if (country.name.toLowerCase().includes(filterText.toLowerCase())) {
          if (!newGroupedData[currency]) {
            newGroupedData[currency] = [];
          }
          newGroupedData[currency].push(country);
        }
      });

      updatedFilteredCountries = Object.keys(newGroupedData).reduce<Country[]>(
        (acc, currency) => {
          return acc.concat(newGroupedData[currency]);
        },
        []
      );
    } else {
      updatedFilteredCountries = countries.filter((country) => {
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

    setFilteredCountries(updatedFilteredCountries);
    setGroupedData(newGroupedData);
  }, [countries, filterText, groupCurrency, groupByCurrency]);

  // Otomatik olarak 10. öğeyi veya son öğeyi seçme
  useEffect(() => {
    if (filteredCountries.length > 0) {
      if (filteredCountries.length > 10) {
        setSelectedCountry(filteredCountries[9]);
      } else {
        setSelectedCountry(filteredCountries[filteredCountries.length - 1]);
      }
    } else {
      setSelectedCountry(null);
    }
  }, [filteredCountries]);

  const handleClick = (country: Country) => {
    if (selectedCountry === country) {
      // Aynı ülkeye tekrar tıklandığında seçimi kaldır
      setSelectedCountry(null);
    } else {
      setSelectedCountry(country);
    }
  };

  return (
    <div>
      <div className="">
        {groupByCurrency ? (
          Object.keys(groupedData).map((currency) => (
            <div key={currency}>
              <h2 className="text-sm py-2">Currency : {currency}</h2>{" "}
              {/* Currency değerini ekle */}
              <div className="grid grid-cols-3 gap-4">
                {groupedData[currency].map((country) => (
                  <div
                    key={country.code}
                    onClick={() => handleClick(country)}
                    className={`p-4 flex justify-between my-5 rounded-md shadow-md hover:shadow-xl ${
                      selectedCountry === country ? `bg-blue-500` : ""
                    }`}>
                    <div
                      className={`${
                        selectedCountry === country ? "text-white" : ""
                      }`}>
                      <p className="text-sm">Name: {country.name}</p>
                      <p className="text-sm">Capital: {country.capital}</p>
                      <p className="text-sm">Emoji: {country.emoji}</p>
                      <p className="text-sm w-18">
                        Currency: {country.currency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCountries.map((country) => (
              <div
                key={country.code}
                onClick={() => handleClick(country)}
                className={`p-4 flex justify-between my-5 rounded-md shadow-md hover:shadow-xl ${
                  selectedCountry === country ? `bg-blue-500` : ""
                }`}>
                <div
                  className={`${
                    selectedCountry === country ? "text-white" : ""
                  }`}>
                  <p className="text-sm">Nameeee: {country.name}</p>
                  <p className="text-sm">Capital: {country.capital}</p>
                  <p className="text-sm">Emoji: {country.emoji}</p>
                  <p className="text-sm w-18">Currency: {country.currency}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryGroups;
