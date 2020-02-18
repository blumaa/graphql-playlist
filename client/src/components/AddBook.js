import React, { useMemo } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getOptions = (loading, error, data) => {
   if (loading) {
      return <option disabled>Loading Authors...</option>;
   } else if (error) {
      return <option disabled>Error loading Authors</option>;
   } else {
      return data.authors.map(({ name, id }) => {
         return (
            <option key={id} value={id}>
               {name}
            </option>
         );
      });
   }
};


const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const options = useMemo(() => getOptions(loading, error, data), [
      loading,
      error,
      data
   ]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>
      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {options}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
