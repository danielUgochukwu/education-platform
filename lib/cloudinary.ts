export const CLOUDINARY_UPLOAD_PURPOSES = [
  "profile-avatar",
  "application-document",
] as const;

export type CloudinaryUploadPurpose =
  (typeof CLOUDINARY_UPLOAD_PURPOSES)[number];

export function isCloudinaryUploadPurpose(
  value: string | null
): value is CloudinaryUploadPurpose {
  return (
    value !== null &&
    CLOUDINARY_UPLOAD_PURPOSES.includes(value as CloudinaryUploadPurpose)
  );
}

export function getCloudinaryUploadFolder(
  purpose: CloudinaryUploadPurpose,
  userId: string
) {
  const sanitizedUserId = userId.trim();

  switch (purpose) {
    case "profile-avatar":
      return `nidc/profile-avatars/${sanitizedUserId}`;
    case "application-document":
      return `nidc/application-documents/${sanitizedUserId}`;
    default:
      return `nidc/uploads/${sanitizedUserId}`;
  }
}
