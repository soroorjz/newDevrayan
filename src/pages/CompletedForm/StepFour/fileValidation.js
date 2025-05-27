export const validateFile = (file) => {
  const allowedFormats = ["image/jpeg", "image/png", "image/gif"];
  const maxSizeMB = 64;

  if (!allowedFormats.includes(file.type)) {
    return "فرمت فایل باید JPG، PNG یا GIF باشد.";
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `حجم فایل باید کمتر از ${maxSizeMB} مگابایت باشد. حجم فعلی: ${(
      file.size /
      (1024 * 1024)
    ).toFixed(2)} مگابایت.`;
  }
  return null;
};
