import React from "react";
import useForm from "../hooks/useForm";

//This form takes in a function called onSubmit
function IdForm({ onSubmit }) {
  //pull in all of the functions we need from the useForm hook passing the onSubmit function
  //to the callback
  const { inputs, errors, handleInputChange, handleSubmit } = useForm(() => {
    onSubmit(inputs); // Pass the form data up on successful submission
  });
  //Form that takes in the inputs and errors from the useForm hook
  //handleSubmit is coming from the custom hook
  return (
    <div className="form-container">
      <h2>Create new Id Card</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          value={inputs.name || ""}
        />
        {errors.name && <div className="error">{errors.name}</div>}
        <input
          name="position"
          placeholder="Position"
          onChange={handleInputChange}
          value={inputs.position || ""}
        />
        {errors.position && <div className="error">{errors.position}</div>}
        <input
          name="department"
          placeholder="Department"
          onChange={handleInputChange}
          value={inputs.department || ""}
        />
        {errors.department && <div className="error">{errors.department}</div>}
        <input
          name="idNumber"
          placeholder="Employee ID Number"
          onChange={handleInputChange}
          value={inputs.idNumber || ""}
        />
        {errors.idNumber && <div className="error">{errors.idNumber}</div>}
        <button type="submit">Save Employee Info</button>
      </form>
    </div>
  );
}

export default IdForm;
