export async function uploadFile(file: File): Promise<string> {
  // TEMPORAIRE
  // Simule un upload et retourne une preview locale
  return URL.createObjectURL(file);

  // FUTUR :
  // return await uploadToCloudinary(file)
}



// passage à Cloudinary

/*

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "xxx");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/xxx/image/upload",
    { method: "POST", body: formData }
  );

  const data = await res.json();
  return data.secure_url;
}

*/