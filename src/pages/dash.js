import React, { useRef, useState } from "react";

const Dash = () => {
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageData, setImageData] = useState([]);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsModalOpen(true);
      };
      reader.onerror = () => {
        console.error("Error reading file");
      };
      reader.readAsDataURL(file);
    }
  };
  const inputFileRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageText, setImageText] = useState("");
  const [previewSrc, setPreviewSrc] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    let encodedImageBytes = null;
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        encodedImageBytes = base64String;
        const data = {
          image_bytes: encodedImageBytes ? encodedImageBytes : null,
          image_text: imageText || null,
          image_class: 2,
        };

        try {
          const response = await fetch(
            "https://cors-anywhere.herokuapp.com/https://dpiit-capps.livelypebble-8970d685.centralindia.azurecontainerapps.io/api",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          const responseData = await response.json();
          const formattedData = Object.values(responseData.result).map((item) => ({
            image: item[1],
            title: "Image", // Adjust as needed
          }));
          setImageData(formattedData);
          setSuccessMessage("Your image has been successfully uploaded.");
          setShowSuccessModal(true); // Show success modal
        } catch (error) {
          console.error("There was an error!", error);
        }
        finally {
            setIsLoading(false); // End loading
            setIsModalOpen(false);
          }
      };
      reader.readAsDataURL(imageFile);
    } else {
      const data = {
        image_bytes: null,
        image_text: imageText || null,
        image_class: 2,
      };

      try {
        const response = await fetch(
          "https://cors-anywhere.herokuapp.com/https://dpiit-capps.livelypebble-8970d685.centralindia.azurecontainerapps.io/api",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const responseData = await response.json();
        const formattedData = Object.values(responseData.result).map((item) => ({
          image: item[1],
          title: "Image", // Adjust as needed
        }));
        setImageData(formattedData);
        setSuccessMessage("Your image has been successfully uploaded.");
        setShowSuccessModal(true); // Show success modal
      } catch (error) {
        console.error("There was an error!", error);
      }
    }
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.onerror = () => {
        console.error("Error reading file");
      };
      reader.readAsDataURL(file);
    }
  };
  const loaderStyles = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImage(null);
  };

  // Inline styles for the modal
  const modalStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    flexdirection: "column",
  };

  const modalContentStyles = {
    display: "flex",
    width: "80%",
    height: "60%",
    background: "white",
    borderRadius: "5px",
    position: "relative",
  };

  const closeButtonStyles = {
    position: "absolute",
    top: "-10px",
    right: "10px",
    cursor: "pointer",
    fontSize: "30px",
    color: "#000",
  };

  const imageContainerStyles = {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: "40px",
    flexdirection: "column",
    gap: "30px",
  };

  const imageStyles = {
    maxWidth: "90%",
  };

  const textContainerStyles = {
    width: "50%",
    padding: "20px",
    boxSizing: "border-box",
    margin: "20px",
  };

  return (
    <div className="main-container">
      <nav className="nav">
        <h1>Test Project</h1>
      </nav>

      <main className="content">
        <div>
          <h2>Files and Assets</h2>
          <p>
            Kindly upload your image below for related results and preview with
            same
          </p>
        </div>

        <div className="rectbox" onClick={handleClick}>
          <img className="upimg" src="image/Upload.png" alt="Upload" />
          <p>
            <span>Click here</span> to upload the image
          </p>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div className="searchbar">
          <img src="image/Searchicon.png" alt="Search" />
          <input type="text" placeholder="Search Your Thoughts" />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>

        <div className="text001">
          <h1>Search Results</h1>
          <p>Below are search results for your selection. Kindly refer that</p>
          <div className="imageprev">
            {imageData.map((data, index) => (
              <div key={index} className="imgbox">
                <img src={data.image} alt={data.title} className="card-image" />
                <p>{data.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal for image preview */}
      {isModalOpen && (
        <div style={modalStyles}aria-hidden={true} >
          <div style={modalContentStyles}>
            <span style={closeButtonStyles} onClick={closeModal}>
              &times;
            </span>
            {isLoading ? (
            
            <div className="loader-container">
            <div className="loader"></div>
            <p className="text10101">Uploading File ....</p>

          </div>
            ) : (
              <>
            <div style={textContainerStyles}>
              <h2>Upload Your Image</h2>
              <p>
                Kindly upload your image below for related results and preview
                with same.
              </p>
              <div className="rectbox1" onClick={handleClick}>
                <img className="upimg" src="image/Upload.png" alt="Upload" />
                <p>
                  <span>Click here</span> to upload the image
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange1}
                />
                
              </div>
              <button className="button1" onClick={handleSearch}>
            Upload
          </button>
            </div>
            <div style={imageContainerStyles}>
              <h2>Image Preview</h2>
              <img src={image} alt="Uploaded Preview" style={imageStyles} />
            </div>
            </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dash;
