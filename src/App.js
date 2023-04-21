import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState("");
  const [isInValidInput, setIsInvalidInput] = useState(false);
  const [users, setUsers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsActive, setIsSuggestionsActive] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setValue(e.target.value);
    if (input.length > 0) {
      setIsSuggestionsActive(true);
      const filteredSuggestions = users.filter((val) => {
        return val.firstName.toLowerCase().startsWith(input.toLowerCase());
      });
      setSuggestions(filteredSuggestions);
      console.log("filteredSuggestions: ", filteredSuggestions);
    } else {
      setIsInvalidInput(false);
      setIsSuggestionsActive(false);
    }

    const arrInput = input.split("");

    for (let i = 0; i < arrInput.length; i++) {
      const number = Number(arrInput[i]);
      if (!isNaN(number)) {
        setIsInvalidInput(true);
        break;
      }
    }
  };

  useEffect(() => {
    const api = "https://dummyjson.com/users";
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <input value={value} onChange={handleChange} />
      {isInValidInput && <p>Only characters allowed</p>}
      {isSuggestionsActive
        ? suggestions.map((sugg) => {
            return <p>{sugg.firstName + " " + sugg.lastName}</p>;
          })
        : users.map((user) => {
            return <p> {user.firstName + " " + user.lastName} </p>;
          })}
    </div>
  );
}

//inially- display all names
// typing in input box whould filter the items
// only alphabets allowed, on alphanumeric throw error
