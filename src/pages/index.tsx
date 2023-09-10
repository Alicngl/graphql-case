import React from "react";
import { useQuery, gql } from "@apollo/client";
import CountryList from "../components/CountryList";
import { Loader } from "@/components/Loader";

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error: {error?.message}</p>
      </div>
    );

  const countries = data.countries;

  return (
    <div>
      <CountryList countries={countries} />
    </div>
  );
}

export default HomePage;
