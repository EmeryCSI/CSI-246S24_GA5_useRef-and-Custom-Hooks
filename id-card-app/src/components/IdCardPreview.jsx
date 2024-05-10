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
