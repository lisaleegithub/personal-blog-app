import React, { useState } from "react";
const PERMISSIONS = ["Yes", "No"];

function ContactForm() {
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
    <div class="container-fluid">
      <form onSubmit={onSubmit}>

        <h4>Contact Us</h4>

        <div class="form-group">
          <label>Name*:</label>
          <input
            type="text"
            required
            placeholder="Name"
            value={values.name}
            onChange={set("name")}
            className="form-control"
          />
        </div>

        <div class="form-group">
          <label>Email*:</label>
          <input
            type="email"
            required
            placeholder="Email"
            value={values.email}
            onChange={set("email")}
            className="form-control"
          />
        </div>

        <div class="form-group">
          <label>Message*:</label>
          <textarea
            type="text"
            required
            placeholder="Your message here"
            value={values.message}
            onChange={set("message")}
            className="form-control"
          />
        </div>

        <div class="form-group">
          <label>About us*:</label>
          <select required className="form-control">
            <option value="">Would you like to be notified of new blog posts?</option>
            {PERMISSIONS.map((preference) => (
              <option key={preference}>{preference}</option>
            ))}
            
          </select>
        </div>

        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
