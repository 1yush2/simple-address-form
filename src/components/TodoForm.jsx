import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { FormData } from "./FormData";

const useStyles = makeStyles({
  topSection: {
    textAlign: "center",
    listStyleType: "none",
  },
  button: {
    cursor: "pointer",
  },
});

export default function TodoForm() {
  const [searchBarTxt, setSearchBarTxt] = useState("");
  const [items, setItems] = useState(FormData);
  const classes = useStyles();

  const filteredItems = items.filter((item) => {
    return item.toLowerCase().includes(searchBarTxt.toLowerCase());
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setItems([...items, event.target.value]);
      event.target.value = "";
    }
  };

  const clearAll = () => {
    setSearchBarTxt("");
    setItems([]);
  };

  const delItem = (id) => {
    setItems(items.filter((event, index) => index !== id));
  };

  return (
    <div>
      <div className={classes.topSection}>
        <input
          type="text"
          onKeyPress={handleKeyPress}
          placeholder="Something to add"
        />
        search:
        <input
          type="text"
          onChange={(event) => {
            setSearchBarTxt(event.target.value);
          }}
          placeholder="Something to search"
        />
        <button className={classes.button} onClick={clearAll}>
          Clear items
        </button>
      </div>
      <ul className={classes.topSection}>
        {filteredItems.map((item, index) => {
          return (
            <li key={index}>
              {item}
              <button onClick={() => delItem(index)}>Del</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
