import React, { useState } from "react";

function validateEmail(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (/^\S+@\S+\.\S+$/.test(email)) {
        resolve(true); // Email is valid
      } else {
        resolve(false); // Email is invalid
      }
    }, 1500); // Simulating async validation with a delay
  });
}

function AdvancedForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple validation
    const newErrors = {};
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const isValid = await validateEmail(values.email);
      if (!isValid) {
        newErrors.email = "Email is invalid";
      }
    }
    if (!values.message.trim()) {
      newErrors.message = "Message is required";
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // If no errors, submit form (here you could send data to server, etc.)
    console.log("Form submitted:", values);

    // Clear form fields and errors
    setValues({ name: "", email: "", message: "" });
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={errors.name ? "form-field invalid" : "form-field"}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div className={errors.email ? "form-field invalid" : "form-field"}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className={errors.message ? "form-field invalid" : "form-field"}>
        <label>
          Message:
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
          />
        </label>
        {errors.message && <div className="error">{errors.message}</div>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default AdvancedForm;
