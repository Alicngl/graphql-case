function CountryList({ countries }: any) {
  return (
    <div>
      <h1>List of Countries</h1>
      <ul>
        {countries.map((country: any) => (
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
    </div>
  );
}

export default CountryList;
