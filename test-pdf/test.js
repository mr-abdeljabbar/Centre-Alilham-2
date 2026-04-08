'use strict';

const { downloadPrescriptionPDF } = require('./downloadPrescriptionPDF');

const mockAppointment = {
  id:             '12345678-abcd-efgh',
  name:           'Fatima Zahra Alaoui',
  phone:          '0600000000',
  email:          'fatima@email.com',
  service:        'Suivi de grossesse',
  preferred_date: '2026-04-15',
  notes:          'Patiente enceinte de 28 semaines. Tension artérielle normale. Prochain contrôle dans 3 semaines. Prescrire acide folique 5mg/j.',
  message:        'Bonjour, j\'ai des douleurs dans le bas du ventre depuis hier soir.',
  status:         'confirmed',
  source:         'web',
  created_at:     new Date().toISOString(),
};

/* Attach click handler after DOM is ready */
document.addEventListener('DOMContentLoaded', function () {
  const btn    = document.getElementById('generate-btn');
  const status = document.getElementById('status');

  btn.addEventListener('click', async function () {
    btn.disabled    = true;
    btn.textContent = 'Génération en cours…';
    status.textContent = '';
    status.className   = '';

    try {
      await downloadPrescriptionPDF(mockAppointment);
      status.textContent = '✓ PDF généré et téléchargé avec succès.';
      status.className   = 'success';
    } catch (err) {
      console.error(err);
      status.textContent = '✗ Erreur : ' + err.message;
      status.className   = 'error';
    } finally {
      btn.disabled    = false;
      btn.textContent = 'Générer l\'ordonnance PDF';
    }
  });
});
