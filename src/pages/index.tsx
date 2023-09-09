import React from "react";
import { useQuery, gql } from "@apollo/client";
import CountryList from "../components/CountryList";
import FilterGroup from "@/components/FilterGroup";

const GET_ALL_COUNTRIES = gql`
  query GetAllCountries {
    countries {
      code
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

function HomePage() {
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const countries = data.countries;

  return (
    <div>
      <CountryList countries={countries} />
    </div>
  );
}

export default HomePage;
