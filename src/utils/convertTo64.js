export const encodeFileToBase64 = (file) => {
  if (!(file instanceof Blob)) {
    console.error("Invalid parameter: file is not a Blob", file);
    return;
  }

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
  // nextBase64.encode(file)
};
