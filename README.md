# Renton Technical College CSI-246

<br />

<div align="center">  
    <img src="logo.jpg" alt="Logo">
    <h3 align="center">Guided Activity 5</h3>
</div>

This repository is a part of CSI-246 at Renton Technical College.

## Guided Activity 5

1. Clone the repository to your local machine. (Do not use OneDrive for assignments in this course!)
2. Make note of the folder where you cloned the repository.
3. After you have cloned this repository navigate to your local repository using the cd command.
4. Open the repository in Visual Studio Code by typing `code .`

5. Open the terminal in Visual Studio Code by hitting ctrl + \` or cmd + \` on mac.
6. Create a new React project in the current directory using vite
7. Name the project id-card-app
8. Select React as the framework
9. Select JavaScript as the variant
10. cd into the new project folder and run:
11. `npm install jspdf`
12. We will be using the jsPDF library to create a PDF of our ID card. [jsPDF npm link](https://www.npmjs.com/package/jspdf)
13. Run `mkdir Screenshots` to create a Screenshots folder.
14. Lauch your application with `npm run dev`

## Project Setup

1. Delete the contents of the App.jsx, App.css and index.css files.
2. Create a basic h2 inside of a fragment for App.jsx.
3. Take a screenshot and save it to your screenshot folder.


4. In Terminal, type `npm run dev`. Make sure you are in the id-card-app folder.
5. You should have just App as an H2 showing on the page.

6. `git add .`
7. `git commit -m "project setup complete"`
8. `git push`

## Create the useForm Hook

1. We will be using a form to collect the new employee information.
2. To process and validate the input from that form we will create a custom hook called useForm.
3. Inside of the src folder create a folder called hooks and inside of that folder create a file called useForm.js.

```javascript
import { useState } from "react";

//we are going to take in a callback function instead of the initial values
//This will allows us to validate the form data and call the callback function
//only if the form data is valid
const useForm = (callback) => {};
```

### Step 1: Initialize State with `useState`

**Purpose**: Initialize the state to keep track of the form inputs and any validation errors.

```javascript
const [inputs, setInputs] = useState({});
const [errors, setErrors] = useState({});
```

- `inputs` will store the current value of each form input field.
- `errors` will store any validation errors for each input field.

### Step 2: Define the `handleInputChange` Function

**Purpose**: Update the `inputs` state as the user types into the form fields and clear errors for the field being edited.

```javascript
const handleInputChange = (event) => {
  setInputs((inputs) => ({
    ...inputs,
    [event.target.name]: event.target.value,
  }));
  setErrors((errors) => ({
    ...errors,
    [event.target.name]: "", // Clear any errors for the current input
  }));
};
```

- This function takes an event object from the input field that triggered the change.
- Updates the `inputs` state by copying the existing `inputs` object and updating the value of the changed input using `[event.target.name]: event.target.value`.
- Clears the error for the specific field that is being edited, if any.

### Step 3: Define the `validate` Function

**Purpose**: Check if the input fields are filled out correctly according to specified validation rules.

```javascript
const validate = (fields) => {
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
  if (fields.idNumber && !/^\d{9}$/.test(fields.idNumber)) {
    errors.idNumber = "Employee ID Number must be 9 digits";
  }
  return errors;
};
```

- Validates each field based on conditions. For instance, it checks if the `name`, `position`, `department`, and `idNumber` fields are not empty.
- For the `idNumber`, it also checks if it is exactly 9 digits using a regular expression.

### Step 4: Define the `handleSubmit` Function

**Purpose**: Handle the form submission event, perform validation, and call the provided callback if the form data is valid.

```javascript
const handleSubmit = (event) => {
  if (event) {
    event.preventDefault(); // Prevent the default form submission action
  }
  const validationErrors = validate(inputs);
  setErrors(validationErrors); // Update the errors state with any new errors
  if (Object.keys(validationErrors).length === 0) {
    callback(inputs); // Call the callback function with the inputs if no errors
    setInputs({}); // Optionally reset the form inputs after a successful submission
  }
};
```

- Prevents the form from being submitted the traditional way (which causes the page to reload).
- Validates the current form inputs.
- If there are no errors, it calls the `callback` function provided as a parameter to `useForm`, passing the `inputs` as its argument. This could be a function to process the form data, such as sending it to a server.

### Step 5: Return from the Hook

**Purpose**: Provide the form-related functionalities and state to the component that uses this hook.

```javascript
return {
  handleSubmit,
  handleInputChange,
  inputs,
  errors,
};
```

- This return statement makes the `handleSubmit`, `handleInputChange`, `inputs`, and `errors` available to any React component that uses this hook.

### Usage

To use `useForm`, you would import it into a component and provide a callback function that should run when the form is successfully submitted without errors.

### Full Code for `useForm` Hook

```javascript
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
```

## Create the IdForm Component

Inside of the src folder create a folder named `components`.
Inside of the components folder create a file called `IdForm.jsx`.

### Step `: Create the `IdForm` Component

**Open `IdForm.jsx` and set up the component:**

- Import the `useForm` hook.
- Define the `IdForm` functional component accepting `onSubmit` as a prop.
- Destructure the `inputs`, `errors`, `handleInputChange`, and `handleSubmit` from the `useForm` hook.

```javascript
import useForm from "../hooks/useForm";

function IdForm({ onSubmit }) {
  const { inputs, errors, handleInputChange, handleSubmit } = useForm(() => {
    onSubmit(inputs);
  });

  return (
    // Define the form with inputs and submit button
  );
}

export default IdForm;
```

**Implement the form rendering:**

- Inside the return statement of `IdForm`, set up a form that uses `handleInputChange` and `handleSubmit`.
- Include input fields for `name`, `position`, `department`, and `idNumber`.
- Display any validation errors next to the respective fields.

```javascript
//Form that takes in the inputs and errors from the useForm hook
//handle submit is coming from the custom hook
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
```

### Full code for IdForm Component

```javascript
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
```

### Step 4: Test Your Component

1. Render the IdForm component in your main App component.
2. Take a screenshot and save it to your screenshot folder.
3. `git add .`
4. `git commit -m "form complete"`
5. `git push`

## Create the IDCardPreview Component

Inside of the `src/components` folder create a file called `IDCardPreview.jsx`.
This component will display the employee information once the form is complete.

### Step 1: Implement the Component

**Open `IDCardPreview.jsx` and start coding the component:**

- Define the `IDCardPreview` functional component. This component should take props that include `cardInfo` for the employee's details and `imageData` for the captured image.

```javascript
//Component that previews the ID card with the information entered by the user and the image uploaded by the user.
function IdCardPreview({ cardInfo, imageData }) {
  return (
    <div>
      <h2>Employee ID Card Preview</h2>
      <div>
        <p>
          <strong>Name:</strong> {cardInfo.name}
        </p>
        <p>
          <strong>Position:</strong> {cardInfo.position}
        </p>
        <p>
          <strong>Department:</strong> {cardInfo.department}
        </p>
        <p>
          <strong>Id Number:</strong> {cardInfo.idNumber}
        </p>
        {imageData && (
          <img src={imageData} alt="Employee" style={{ width: "300px" }} />
        )}
      </div>
    </div>
  );
}

export default IdCardPreview;
```

## Create the WebcamCapture Component

This component will use the webcam to capture an image that will be displayed on the ID card.
This is a common application of the useRef and useState hooks in React.

### Step 1: Create the Component File

- Create a component file named `WebcamCapture.jsx` inside the `src/components` folder.

### Step 2: Implement the Component

**Open `WebcamCapture.js` and write the component code:**

- Import useRef and useState from React.
- Setup state management for controlling the webcam and capturing images.

```javascript
import React, { useRef, useState } from "react";

/**
 * A React component to capture images from a webcam.
 * Uses useRef to manage DOM references and useState for component state.
 */
function WebcamCapture({ onCapture, cardInfo }) {
  const videoRef = useRef(null); // Reference to the video element
  const canvasRef = useRef(null); // Reference to the canvas element
  const [isCameraOn, setIsCameraOn] = useState(false); // State to manage camera status

  /**
   * Starts the video stream from the webcam.
   * Asks the user for permission to use the webcam and plays the video stream.
   */
  const startVideo = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraOn(true);
        })
        .catch((err) => {
          console.error("Error accessing the webcam: ", err);
        });
    } else {
      alert("Sorry, your browser does not support webcam functionality.");
    }
  };

  /**
   * Captures an image from the video stream and sends it to the parent component.
   * Draws the current video frame onto a canvas and converts it to a data URL.
   */
  const captureImage = () => {
    //get the references to the canvas, video and context
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    if (context && video) {
      // Draw the video frame to the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Convert the canvas image to a data URL
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      onCapture(imageDataUrl);
      // Optionally, you can stop the video stream after capture
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraOn(false);
    }
  };

  return (
    <div>
      {isCameraOn ? (
        <button onClick={captureImage}>Capture Image</button>
      ) : (
        <button onClick={startVideo}>Start Camera</button>
      )}
      <video
        ref={videoRef}
        style={{ display: isCameraOn ? "block" : "none" }}
        width="640"
        height="480"
      ></video>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="640"
        height="480"
      ></canvas>
    </div>
  );
}

export default WebcamCapture;
```

## App.jsx

Let's bring all of our new functionality into App.jsx.

### Step 1: Implement `App.jsx`

**Open `App.jsx` and begin coding:**

1. **Import Dependencies and Components**:

   - Import useState from 'react'.
   - Import the components and jsPDF.
   - Import styles

   ```javascript
   import React, { useState } from "react";
   import IdForm from "./components/IdForm";
   import WebcamCapture from "./components/WebcamCapture";
   import IDCardPreview from "./components/IDCardPreview";
   import { jsPDF } from "jspdf";
   import "./App.css"; // Assuming you have some global styles
   ```

2. **Setup State**:

   - Define state variables for handling card information and image data.

   ```javascript
   const [cardInfo, setCardInfo] = useState(null);
   const [imageData, setImageData] = useState(null);
   ```

3. **Form Submission Handler**:

   - Implement a function to handle form submissions.

   ```javascript
   const handleFormSubmit = (data) => {
     setCardInfo(data);
   };
   ```

4. **Image Capture Handler**:

   - Implement a function to handle image capture from the webcam.

   ```javascript
   const handleCapture = (image) => {
     setImageData(image);
   };
   ```

5. **PDF Generation Function**:

   - Implement a function to generate a PDF using captured data.

   ```javascript
   //function to download the PDF
   const downloadPDF = () => {
     if (!cardInfo || !imageData) return;
     //create a new jsPDF instance
     const doc = new jsPDF({
       orientation: "landscape",
       unit: "px",
       format: [320, 240],
     });
     //create a new image element
     const img = new Image();
     //set the source to the imageData
     img.src = imageData;
     //when the image is loaded, calculate the aspect ratio
     img.onload = () => {
       const imgAspectRatio = img.width / img.height;
       const imgHeight = 150; // Desired image height in the PDF
       const imgWidth = imgHeight * imgAspectRatio; // Calculate width maintaining aspect ratio
       const pageWidth = doc.internal.pageSize.getWidth();
       const startX = (pageWidth - imgWidth) / 2; // Calculate the starting X position to center the image
       //the doc obhect allows you to add text and images to the PDF
       doc.text(`Name: ${cardInfo.name}`, 10, 20);
       doc.text(`Position: ${cardInfo.position}`, 10, 40);
       doc.text(`Department: ${cardInfo.department}`, 10, 60);
       doc.addImage(imageData, "JPEG", startX, 80, imgWidth, imgHeight); // Add the captured image centered
       doc.text(`Id Number: ${cardInfo.idNumber}`, 10, 240);
       //save the PDF with the name of the employee
       doc.save(`${cardInfo.name}_id.pdf`);
     };
   };
   ```

6. **Conditional Rendering**:

   - Render components based on the state.

   ```javascript
   if (!cardInfo) {
     return <IdForm onSubmit={handleFormSubmit} />;
   }

   return (
     <div className="container">
       {imageData ? (
         <IDCardPreview
           cardInfo={cardInfo}
           imageData={imageData}
           onEdit={() => setCardInfo(null)}
         />
       ) : (
         <WebcamCapture onCapture={handleCapture} />
       )}
       {imageData && (
         <button onClick={downloadPDF}>Download ID Card as PDF</button>
       )}
     </div>
   );
   ```

### Step 5: Style `App.jsx`

Ensure the application is styled appropriately:

- Use CSS in `App.css` or inline styles to style the container and any other elements as needed.

```css
/* General Resets */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f4f4f9;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

/* Styling for the main container */
.container {
  width: 100%;
  max-width: 600px;
  padding: 50px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Form styling */
.form-container {
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input[type="text"],
input[type="number"] {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%; /* Ensures the input stretches to the container width */
}

button {
  background-color: #0056b3;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

button:hover {
  background-color: #004494;
}

/* Webcam and preview styling */
video,
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 10px;
}

/* Error messages */
.error {
  color: red;
  font-size: 0.8rem;
  margin-bottom: 10px;
}
```

### Here is the full code for App.jsx

```javascript
import React, { useState } from "react";
import IdForm from "./components/IdForm";
import WebcamCapture from "./components/WebcamCapture";
import IdCardPreview from "./components/IdCardPreview";
import { jsPDF } from "jspdf";
import "./App.css"; // Ensure CSS is properly imported

//our app needs to track two things: the form data and the image data
function App() {
  const [cardInfo, setCardInfo] = useState(null);
  const [imageData, setImageData] = useState(null);

  //function to handle the form submission
  const handleFormSubmit = (data) => {
    setCardInfo(data); // Save form data to state
  };
  //function to handle the image capture
  const handleCapture = (image) => {
    setImageData(image); // Save captured image data to state
  };
  //function to download the PDF
  const downloadPDF = () => {
    if (!cardInfo || !imageData) return;
    //create a new jsPDF instance
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [320, 240],
    });
    //create a new image element
    const img = new Image();
    //set the source to the imageData
    img.src = imageData;
    //when the image is loaded, calculate the aspect ratio
    img.onload = () => {
      const imgAspectRatio = img.width / img.height;
      const imgHeight = 150; // Desired image height in the PDF
      const imgWidth = imgHeight * imgAspectRatio; // Calculate width maintaining aspect ratio
      const pageWidth = doc.internal.pageSize.getWidth();
      const startX = (pageWidth - imgWidth) / 2; // Calculate the starting X position to center the image
      //the doc obhect allows you to add text and images to the PDF
      doc.text(`Name: ${cardInfo.name}`, 10, 20);
      doc.text(`Position: ${cardInfo.position}`, 10, 40);
      doc.text(`Department: ${cardInfo.department}`, 10, 60);
      doc.addImage(imageData, "JPEG", startX, 80, imgWidth, imgHeight); // Add the captured image centered
      doc.text(`Id Number: ${cardInfo.idNumber}`, 10, 240);
      //save the PDF with the name of the employee
      doc.save(`${cardInfo.name}_id.pdf`);
    };
  };
  //function to clear the info
  const clearCardInfo = () => {
    setCardInfo(null);
    setImageData(null); // Optionally clear the image data as well
  };
  //if there is no cardInfo, render the IdForm
  if (!cardInfo) {
    return <IdForm onSubmit={handleFormSubmit} />;
  }
  //if there is cardInfo and there is imageData, render the IdCardPreview
  //if there is no imageData render the WebcamCapture
  return (
    <div className="container">
      {imageData ? (
        <IdCardPreview
          cardInfo={cardInfo}
          imageData={imageData}
          onEdit={clearCardInfo}
        />
      ) : (
        <WebcamCapture onCapture={handleCapture} />
      )}
      {imageData && (
        <>
          <button onClick={clearCardInfo}>Edit Information</button>
          <button onClick={downloadPDF}>Download ID Card as PDF</button>
        </>
      )}
    </div>
  );
}

export default App;
```

### Step 6: Test the Application

- Run your application:
  ```bash
  npm run dev
  ```
- Navigate through the form submission, image capturing, and PDF generation to ensure all functionalities work as expected.

### Step 7: Take a Screenshot

- Capture a screenshot of the application showing the webcam functioning.
- Add a generated PDF file to the repository.

### Conclusion

You have successfully implemented a React application that captures employee information, allows image capture from the webcam, and generates a PDF ID card with the entered data and captured image. This project demonstrates the use of custom hooks, state management, and external libraries in a React application.

## Commit your changes

1. `git add .`
2. `git commit -m "Guided Activity 5 complete"`
3. `git push`

If you are having any problems with this assignment please come to office hours or scheduling a tutoring session with a TA.
