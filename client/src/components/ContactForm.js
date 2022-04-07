import React, { useState } from "react";
const PERMISSIONS = ["Yes", "No"];

function ContactForm () {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  function onSubmit(event) {
    event.preventDefault();
    onSubmit();
    // console.log(values);
  }

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Contact Us :)</h3>

      <label>Name*:</label>
      <input
        type="text"
        required
        placeholder="Name"
        value={values.name}
        onChange={set("name")}
      />

      <label>Email*:</label>
      <input
        type="email"
        required
        placeholder="Email"
        value={values.email}
        onChange={set("email")}
      />

      <label>Message*:</label>
      <textarea
        type="text"
        required
        placeholder="Your message here"
        value={values.message}
        onChange={set("message")}
      />

      <label>About us*:</label>
      <select required>
        <option value="">Would you like to be notified of new blog posts?</option>
        {PERMISSIONS.map((preference) => (
          <option key={preference}>{preference}</option>
        ))}
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
