const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Sube una foto a Cloudinary con unsigned upload preset.
 * @param {File|Blob} file
 * @returns {Promise<string>} secure_url de Cloudinary
 */
export async function uploadPhoto(file) {
  if (!file.type.startsWith("image/")) {
    throw new Error("El archivo debe ser una imagen (jpg, png, webp…)");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("La imagen no puede superar los 10 MB");
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Faltan las variables de entorno de Cloudinary");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error?.message || `Error Cloudinary ${res.status}`);
  }

  return data.secure_url;
}

/**
 * Transforma una URL de Cloudinary para servir imágenes optimizadas.
 *
 * @param {string} url        URL original de Cloudinary (secure_url)
 * @param {"card"|"avatar"|"thumb"|"header"} size
 *   card   → w_400,c_fill,f_auto,q_auto  (tarjetas de swipe)
 *   avatar → w_200,c_fill,f_auto,q_auto  (listas, avatares pequeños)
 *   thumb  → w_112,c_fill,f_auto,q_auto  (miniaturas 56px @2x)
 *   header → w_800,c_fill,f_auto,q_auto  (cabecera de chat)
 * @returns {string}
 */
const TRANSFORMS = {
  card:   "w_400,c_fill,f_auto,q_auto",
  avatar: "w_200,c_fill,f_auto,q_auto",
  thumb:  "w_112,c_fill,f_auto,q_auto",
  header: "w_800,c_fill,f_auto,q_auto",
};

export function cloudinaryUrl(url, size = "card") {
  if (!url || !url.includes("cloudinary.com")) return url;
  const transform = TRANSFORMS[size] ?? TRANSFORMS.card;
  // Inserta la transformación antes del nombre del fichero
  // https://res.cloudinary.com/<cloud>/image/upload/<transform>/<public_id>
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}

