import React, { useMemo, useCallback, useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

const getOptions = (loading, error, data) => {
  if (loading) {
    return <option disabled>Loading Authors...</option>;
  } else if (error) {
    return <option disabled>Error loading Authors</option>;
  } else {
    return data.authors.map(({ name, id }) => {
      console.log(id);
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
  const [addBook] = useMutation(addBookMutation);

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthor] = useState("");

  const options = useMemo(() => getOptions(loading, error, data), [
    loading,
    error,
    data
  ]);

  const nameCB = useCallback(e => setName(e.target.value), []);
  const genreCB = useCallback(e => setGenre(e.target.value), []);
  const authorCB = useCallback(e => setAuthor(e.target.value), []);
  const addCB = useCallback(
    e => {
      e.preventDefault();
      console.log(name, genre, authorId);
      addBook({
        variables: {
          name,
          genre,
          authorId
        },
        refetchQueries: [{ query: getBooksQuery }]
      });
    },
    [addBook, name, genre, authorId]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <form id="add-book" onSubmit={addCB}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={nameCB} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={genreCB} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={authorCB}>
          <option>Select Author</option>
          {options}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
