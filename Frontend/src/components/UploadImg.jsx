import { useState } from "react";

const UploadImg = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", event.target.files[0]);

      const response = await fetch("http://127.0.0.1:8000/upload_image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setAvatarUrl(responseData.file_path);
        alert("Image uploaded successfully");
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      {avatarUrl && (
        <img src={avatarUrl} alt="Avatar" style={{ width: "100px" }} />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default UploadImg;
