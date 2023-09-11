import React, { useEffect, useState } from "react";
import styles from "../styles/globals.css";

// Define the Country interface for type safety.
interface Country {
  code: string;
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
}

// Define the props interface for the CountryGroups component.
interface CountryGroupsProps {
  countries: Country[];
  filterText: string;
  groupCurrency: string;
  groupByCurrency: boolean;
}

// Create the CountryGroups component using a functional component approach.
const CountryGroups: React.FC<CountryGroupsProps> = ({
  countries,
  filterText,
  groupCurrency,
  groupByCurrency,
}) => {
  // Initialize state variables using the useState hook.
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countries);
  const [groupedData, setGroupedData] = useState<{ [key: string]: Country[] }>(
    {}
  );

  // useEffect to filter and group countries based on filterText and groupByCurrency flags.
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

    // Update the state variables with filtered and grouped data.
    setFilteredCountries(updatedFilteredCountries);
    setGroupedData(newGroupedData);
  }, [countries, filterText, groupCurrency, groupByCurrency]);

  // Automatically select the 10th item or the last item when filteredCountries changes.
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

  // Handle the click event to select/deselect a country.
  const handleClick = (country: Country) => {
    if (selectedCountry === country) {
      // Deselect the country when it's clicked again.
      setSelectedCountry(null);
    } else {
      // Select the clicked country.
      setSelectedCountry(country);
    }
  };

  return (
    <div>
      <div className="">
        {groupByCurrency ? (
          Object.keys(groupedData).map((currency) => (
            <div key={currency}>
              <h2 className="text-sm py-2 font-bold text-slate-700">
                CURRENCY : {currency}
              </h2>{" "}
              {/* Add the Currency value */}
              <div className="grid md:grid-cols-3 gap-4">
                {groupedData[currency].map((country) => (
                  <div
                    style={{
                      backgroundColor: `${
                        selectedCountry === country
                          ? "var(--primary-color)"
                          : ""
                      }`,
                    }}
                    key={country.code}
                    onClick={() => handleClick(country)}
                    className={`p-4 flex justify-between my-2 rounded-md shadow-md hover:shadow-xl`}>
                    <div
                      style={{
                        color: `${
                          selectedCountry === country
                            ? "var(--secondary-color)"
                            : ""
                        }`,
                      }}>
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
                style={{
                  backgroundColor: `${
                    selectedCountry === country ? "var(--primary-color)" : ""
                  }`,
                }}
                key={country.code}
                onClick={() => handleClick(country)}
                className={`p-4 flex justify-between my-5 rounded-md shadow-md hover:shadow-xl`}>
                <div
                  style={{
                    color: `${
                      selectedCountry === country
                        ? "var(--secondary-color)"
                        : ""
                    }`,
                  }}>
                  <p className="text-sm">Name: {country.name}</p>
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
