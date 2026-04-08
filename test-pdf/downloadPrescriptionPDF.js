'use strict';

const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');

/* ── Load logo via Canvas → JPEG data-URL ─────────────────────────── */
function loadLogo() {
  return new Promise(function (resolve) {
    var img = new Image();
    img.onload = function () {
      try {
        var canvas     = document.createElement('canvas');
        canvas.width   = img.naturalWidth  || 200;
        canvas.height  = img.naturalHeight || 200;
        var ctx = canvas.getContext('2d');
        if (!ctx) return resolve(null);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      } catch (e) { resolve(null); }
    };
    img.onerror = function () { resolve(null); };
    img.src = './pdf-logo.png';
  });
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN FUNCTION
═══════════════════════════════════════════════════════════════════ */
async function downloadPrescriptionPDF(appointment) {
  const logoDataUrl = await loadLogo();

  /* ── Page geometry ──────────────────────────────────────────── */
  const PAGE_W   = 595.28;
  const PAGE_H   = 841.89;
  const M        = 50;
  const CONTENT  = PAGE_W - M * 2;

  const HEADER_H     = 100;
  const TITLE_Y      = HEADER_H + 16;          // 116
  const LINE_Y       = TITLE_Y  + 22;          // 138
  const BOX_Y        = LINE_Y   + 12;          // 150
  const BOX_H        = 95;
  const PRESC_Y      = BOX_Y + BOX_H + 12;     // 257
  const FOOTER_Y     = PAGE_H - 44;            // 798
  const MIN_SIGN_GAP = 20;
  const SIGN_MIN     = PRESC_Y + 60;
  const SIGN_MAX     = FOOTER_Y - 105;         // 693

  /* ── Colours ─────────────────────────────────────────────────── */
  const PURPLE   = '#7C3AED';
  const PURPLE_L = '#FAF5FF';
  const PURPLE_M = '#C4B5FD';
  const GRAY_D   = '#1F2937';
  const GRAY_M   = '#374151';
  const GRAY_L   = '#6B7280';
  const GRAY_XL  = '#9CA3AF';

  /* ── PDFKit + blob-stream ────────────────────────────────────── */
  const doc    = new PDFDocument({
    size: 'A4',
    margins: { top: M, left: M, right: M, bottom: 8 },
    bufferPages: true,
    autoFirstPage: true,
  });
  const stream = doc.pipe(blobStream());

  /* ════════════════════════════════════════════════════════════════
     HEADER
  ════════════════════════════════════════════════════════════════ */
  doc.rect(0, 0, PAGE_W, HEADER_H).fill(PURPLE);

  const LOGO_SIZE = 68;
  const LOGO_X    = M;
  const LOGO_Y    = (HEADER_H - LOGO_SIZE) / 2;

  if (logoDataUrl) {
    doc.circle(LOGO_X + LOGO_SIZE / 2, LOGO_Y + LOGO_SIZE / 2, LOGO_SIZE / 2 + 4)
       .fill('#FFFFFF');
    doc.image(logoDataUrl, LOGO_X, LOGO_Y, { width: LOGO_SIZE, height: LOGO_SIZE });
  }

  const TEXT_X = logoDataUrl ? LOGO_X + LOGO_SIZE + 14 : M;

  doc.fillColor('#FFFFFF')
     .fontSize(19).font('Helvetica-Bold')
     .text('Centre Alilham', TEXT_X, 16, { lineBreak: false });

  doc.fontSize(10).font('Helvetica')
     .text('Dr Ilham YASSINE — Spécialiste en Gynécologie Obstétrique', TEXT_X, 42, { lineBreak: false });

  doc.fontSize(8.5)
     .text('Centre Ville, El Kelâa des Sraghna 43000, Maroc',        TEXT_X, 58, { lineBreak: false })
     .text('Tél : +212 524 412 467  |  Urgences : +212 649 130 593', TEXT_X, 72, { lineBreak: false })
     .text('contact@centrealilham.ma',                                 TEXT_X, 86, { lineBreak: false });

  /* ════════════════════════════════════════════════════════════════
     TITLE + RULE
  ════════════════════════════════════════════════════════════════ */
  doc.fillColor(GRAY_D).fontSize(15).font('Helvetica-Bold')
     .text('ORDONNANCE MÉDICALE', M, TITLE_Y, { align: 'center', width: CONTENT });

  doc.moveTo(M, LINE_Y).lineTo(PAGE_W - M, LINE_Y)
     .strokeColor(PURPLE).lineWidth(2).stroke();

  /* ════════════════════════════════════════════════════════════════
     PATIENT BOX
  ════════════════════════════════════════════════════════════════ */
  doc.rect(M, BOX_Y, CONTENT, BOX_H).fillAndStroke(PURPLE_L, PURPLE_M);

  doc.fillColor(PURPLE).fontSize(8.5).font('Helvetica-Bold')
     .text('INFORMATIONS PATIENTE', M + 14, BOX_Y + 10);

  const C1 = M + 14;
  const C2 = M + 14 + 245;
  const ry  = (n) => BOX_Y + 26 + n * 17;

  const pair = (lbl, val, x, y, lw = 48) => {
    doc.fillColor(GRAY_M).fontSize(10)
       .font('Helvetica-Bold').text(lbl, x, y, { continued: false, lineBreak: false });
    doc.font('Helvetica').text(val, x + lw, y, { lineBreak: false });
  };

  pair('Nom :',      appointment.name,           C1, ry(0));
  pair('Tél :',      appointment.phone,           C2, ry(0), 32);
  pair('Email :',    appointment.email || '—',    C1, ry(1), 48);
  pair('Service :',  appointment.service,          C1, ry(2), 56);
  pair('Date RDV :', appointment.preferred_date
    ? new Date(appointment.preferred_date).toLocaleDateString('fr-FR', { dateStyle: 'long' })
    : '—', C1, ry(3), 66);

  /* ════════════════════════════════════════════════════════════════
     PRESCRIPTION / NOTES
  ════════════════════════════════════════════════════════════════ */
  doc.fillColor(PURPLE).fontSize(8.5).font('Helvetica-Bold')
     .text('PRESCRIPTION / NOTES MÉDICALES', M, PRESC_Y);

  doc.moveTo(M, PRESC_Y + 12).lineTo(PAGE_W - M, PRESC_Y + 12)
     .strokeColor('#E5E7EB').lineWidth(1).stroke();

  const notesText  = (appointment.notes || '').trim()
    || 'Aucune note médicale renseignée pour ce rendez-vous.';
  const hasMessage = !!(appointment.message || '').trim();
  const notesMaxH  = hasMessage ? (SIGN_MAX - PRESC_Y - 70) * 0.5 : SIGN_MAX - PRESC_Y - 30;

  doc.fillColor(GRAY_M).font('Helvetica').fontSize(10)
     .text(notesText, M, PRESC_Y + 20, {
       width: CONTENT, height: notesMaxH, lineGap: 3, ellipsis: true,
     });

  if (hasMessage) {
    const msgY = doc.y + 12;
    doc.fillColor(PURPLE).fontSize(8.5).font('Helvetica-Bold')
       .text('MESSAGE DE LA PATIENTE', M, msgY);
    doc.moveTo(M, msgY + 12).lineTo(PAGE_W - M, msgY + 12)
       .strokeColor('#E5E7EB').lineWidth(1).stroke();
    const msgMaxH = SIGN_MAX - msgY - 20;
    doc.fillColor(GRAY_L).font('Helvetica').fontSize(10)
       .text(appointment.message, M, msgY + 20, {
         width: CONTENT, height: msgMaxH, lineGap: 3, ellipsis: true,
       });
  }

  /* ════════════════════════════════════════════════════════════════
     SIGNATURE  — placed dynamically just below content
  ════════════════════════════════════════════════════════════════ */
  const SIGN_Y = Math.min(Math.max(doc.y + MIN_SIGN_GAP, SIGN_MIN), SIGN_MAX);

  doc.moveTo(M, SIGN_Y).lineTo(PAGE_W - M, SIGN_Y)
     .strokeColor('#E5E7EB').lineWidth(1).stroke();

  doc.fillColor(GRAY_M).fontSize(10).font('Helvetica-Bold')
     .text('Signature et cachet du médecin :', M, SIGN_Y + 10);

  doc.rect(M, SIGN_Y + 26, 185, 55).strokeColor('#D1D5DB').lineWidth(1).stroke();

  doc.fillColor(GRAY_XL).font('Helvetica').fontSize(8)
     .text(
       `Ordonnance émise le ${new Date().toLocaleDateString('fr-FR', { dateStyle: 'long' })}`,
       PAGE_W - M - 190, SIGN_Y + 10,
       { width: 190, align: 'right' }
     );

  /* ════════════════════════════════════════════════════════════════
     FOOTER
  ════════════════════════════════════════════════════════════════ */
  doc.rect(0, FOOTER_Y, PAGE_W, 42).fill('#F3F4F6');
  doc.fillColor(GRAY_XL).fontSize(7.5)
     .text(
       `Document confidentiel — Centre Alilham © ${new Date().getFullYear()} — Dr Ilham YASSINE`,
       0, FOOTER_Y + 14,
       { align: 'center', width: PAGE_W }
     );

  /* ════════════════════════════════════════════════════════════════
     FINALIZE
  ════════════════════════════════════════════════════════════════ */
  doc.end();

  return new Promise(function (resolve, reject) {
    stream.on('finish', function () {
      try {
        const blob = stream.toBlob('application/pdf');
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `ordonnance-${appointment.name.replace(/\s+/g, '-').toLowerCase()}-${appointment.id.slice(0, 8)}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        resolve();
      } catch (err) { reject(err); }
    });
    stream.on('error', reject);
  });
}

module.exports = { downloadPrescriptionPDF };
