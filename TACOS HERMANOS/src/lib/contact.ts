export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{8,20}$/;

export function validateContact(values: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim().length < 2) errors.name = "Escribe tu nombre (mínimo 2 letras).";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Escribe un correo válido, por ejemplo nombre@correo.com.";
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) errors.phone = "Revisa el número: solo dígitos, espacios, + o guiones.";
  if (values.message.trim().length < 10) errors.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
  return errors;
}

/**
 * Envío del formulario.
 *
 * El sitio es informativo y aún no tiene backend. Para activar el envío real,
 * define NEXT_PUBLIC_CONTACT_ENDPOINT con la URL de un servicio de formularios
 * (Formspree, Getform, una Route Handler propia, etc.) que acepte JSON por POST.
 * Sin endpoint, se simula el envío para la demostración de la propuesta.
 */
export async function submitContact(payload: ContactPayload): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 900));
    return;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Contact endpoint responded ${res.status}`);
}
