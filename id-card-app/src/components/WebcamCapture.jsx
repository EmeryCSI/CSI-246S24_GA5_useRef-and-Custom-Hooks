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
