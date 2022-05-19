import React, { useEffect, useState } from "react";
import "./contactform.css";
import { updatedFormData } from "./updatedFormData";

//getting people from localstorage

const getPeopleList = () => {
  let list = localStorage.getItem("listPeople");
  if (list) {
    return JSON.parse(localStorage.getItem("listPeople"));
  } else {
    return [];
  }
};

export default function UpdateContactForm() {
  const [people, setPeople] = useState(getPeopleList);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formElements = e.target.elements;
    let obj = {};

    for (let index = 0; index < formElements.length; index++) {
      var item = formElements.item(index);
      if (item.name && item.value) {
        obj[item.name] = item.value;
      }
    }

    setPeople([...people, obj]);
    e.target.reset();
    alert("thanks the form has been submitted");
    console.log(obj);
  };

  useEffect(() => {
    localStorage.setItem("listPeople", JSON.stringify(people));
  }, [people]);

  const delItems = (id) => {
    setPeople(people.filter((event, index) => index !== id));
  };

  return (
    <div>
      <div className="main">
        <form className="mainForm" onSubmit={handleSubmit}>
          {updatedFormData.map((importedData, index) => {
            const { label, name, type } = importedData;
            return (
              <div className="formDivs" key={index}>
                <label htmlFor={name}>{label}</label>
                <input type={type} name={name} />
              </div>
            );
          })}
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
              <button className="btn" onClick={() => delItems(index)}>
                Del
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
