import React, { useState } from "react";

function CountryList({ countries }: any) {
  const [filterText, setFilterText] = useState("");
  const [groupBy, setGroupBy] = useState("");
  const [groupedCountries, setGroupedCountries] = useState<any>(null);

  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const handleGroupByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupBy(e.target.value);
  };

  const handleApplyFilters = () => {
    // Filtreleme
    const filteredData = countries.filter((country: any) =>
      country.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // Gruplama
    const groupedData = groupByField(filteredData, groupBy);

    setGroupedCountries(groupedData);
  };

  const groupByField = (data: any, field: string) => {
    const groups: any = {};

    data.forEach((country: any) => {
      const value = country[field] || "N/A";
      if (!groups[value]) {
        groups[value] = [];
      }
      groups[value].push(country);
    });

    return groups;
  };

  return (
    <div>
      <h1>List of Countries</h1>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={handleFilterTextChange}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Group by..."
          value={groupBy}
          onChange={handleGroupByChange}
        />
      </div>
      <button onClick={handleApplyFilters}>Apply</button>
      <ul>
        {groupedCountries &&
          Object.keys(groupedCountries).map((groupValue: string) => (
            <li key={groupValue}>
              <h2>{groupValue}</h2>
              <ul>
                {groupedCountries[groupValue].map((country: any) => (
                  <li key={country.code}>
                    <p>Name: {country.name}</p>
                    <p>Native Name: {country.native}</p>
                    <p>Capital: {country.capital}</p>
                    <p>Emoji: {country.emoji}</p>
                    <p>Currency: {country.currency}</p>
                    <p>Languages:</p>
                    <ul>
                      {country.languages.map((language: any) => (
                        <li key={language.code}>
                          {language.name} ({language.code})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CountryList;
