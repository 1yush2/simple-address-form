import React, { useState } from "react";
import "./contactform.css";

export default function Contactform() {
  const [aPerson, setAPerson] = useState({
    fullName: "",
    email: "",
    age: "",
    dob: "",
  });

  const [people, setPeople] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAPerson({ ...aPerson, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (aPerson.fullName && aPerson.email && aPerson.age && aPerson.dob) {
      const aNewPerson = { ...aPerson };
      setPeople([...people, aNewPerson]);
      setAPerson({ fullName: "", email: "", age: "", dob: "" });
    }
  };

  const delItems = (id) => {
    setPeople(people.filter((event, index) => index !== id));
  };

  return (
    <div className="main">
      <form className="mainForm" onSubmit={handleSubmit}>
        <div className="formDivs">
          <label htmlFor="fullName">Full Name :</label>
          <input
            type="text"
            name="fullName"
            value={aPerson.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="formDivs">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={aPerson.email}
            onChange={handleChange}
          />
        </div>
        <div className="formDivs">
          <label htmlFor="age">Age :</label>
          <input
            type="text"
            name="age"
            value={aPerson.age}
            onChange={handleChange}
          />
        </div>
        <div className="formDivs">
          <label htmlFor="date">Date of birth :</label>
          <input
            type="date"
            name="dob"
            value={aPerson.dob}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="submit">
          Add Person
        </button>
      </form>
      {people.map((person, index) => {
        const { fullName, email, age, dob } = person;
        return (
          <div className="item" key={index}>
            <h4>Name : {fullName}</h4>
            <h4>Email : {email}</h4>
            <h4>Age : {age}</h4>
            <h4>Date Of Birth : {dob}</h4>
            <button className="btn" onClick={() => delItems(index)}>Del</button>
          </div>
        );
      })}
    </div>
  );
}
