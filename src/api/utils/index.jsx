import axios from "axios";

export const uploadImage = async (imageFile) => {
  const imageData = new FormData();
  imageData.append("file", imageFile);
  imageData.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_PRESET);
  imageData.append("cloud_name", import.meta.env.VITE_APP_CLOUD_NAME);
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_APP_CLOUD_NAME
    }/image/upload`,
    imageData
  );
  return res.data.url;
};
