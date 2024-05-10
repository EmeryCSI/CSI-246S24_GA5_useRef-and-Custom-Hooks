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
