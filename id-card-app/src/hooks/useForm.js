import { useState } from "react";

//we are going to take in a callback function instead of the initial values
//This will allows us to validate the form data and call the callback function
//only if the form data is valid
const useForm = (callback) => {
  //initialize the state for the form inputs
  const [inputs, setInputs] = useState({});
  //track any errors with state
  const [errors, setErrors] = useState({});

  //function that handles the form submission
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    //validate the form inputs
    const validationErrors = validate(inputs);
    //set the errors in the state
    setErrors(validationErrors);
    //if there are no errors, call the callback function
    if (Object.keys(validationErrors).length === 0) {
      callback(); // Trigger the callback if no errors
      setInputs({}); // Optionally reset form after submission
    }
  };

  //function that handles the change of form imputs
  const handleInputChange = (event) => {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" })); // Clear error on change
  };
  //function to validate the form inputs
  //This function only checks if the fields are empty
  //This validation logic could be extended to check for other conditions
  const validate = (fields) => {
    //initialize the errors object
    const errors = {};
    if (!fields.name) {
      errors.name = "Name is required";
    }
    if (!fields.position) {
      errors.position = "Position is required";
    }
    if (!fields.department) {
      errors.department = "Department is required";
    }
    if (!fields.idNumber) {
      errors.idNumber = "Employee ID Number is required";
    }
    // check that idnumber is 9 digits and numbers only
    if (fields.idNumber && !/^\d{9}$/.test(fields.idNumber)) {
      errors.idNumber = "Employee ID Number must be 9 digits";
    }
    return errors;
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    errors,
  };
};

export default useForm;
