export const uploadFileToUploadcare = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append(
    "UPLOADCARE_PUB_KEY",
    process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string
  );
  formData.append("UPLOADCARE_STORE", "1"); // Store the file permanently
  formData.append("file", file);

  const res = await fetch("https://upload.uploadcare.com/base/", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.file) {
    throw new Error(data?.error?.content || "File upload failed");
  }

  // Public CDN URL
  return `https://ucarecdn.com/${data.file}/`;
};
