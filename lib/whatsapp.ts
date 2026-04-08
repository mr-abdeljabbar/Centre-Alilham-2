export function buildWhatsAppConfirmationUrl(
  phone: string,
  patientName: string,
  service: string
): string {
  const number = phone.replace(/\D/g, '').replace(/^0/, '212');
  const message = encodeURIComponent(
    `Bonjour ${patientName},\n\nVotre rendez-vous au Centre Alilham pour "${service}" est bien confirmé.\n\nNous vous attendons. Pour toute question, répondez à ce message.\n\nCentre Alilham — Dr Ilham YASSINE`
  );
  return `https://wa.me/${number}?text=${message}`;
}
