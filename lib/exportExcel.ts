import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Appointment } from './appointments';

const STATUS_LABELS: Record<string, string> = {
  pending:   'En attente',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
  done:      'Terminé',
};

const STATUS_COLORS: Record<string, string> = {
  pending:   'FFFBBF24',
  confirmed: 'FF16A34A',
  cancelled: 'FFDC2626',
  done:      'FF6B7280',
};

export async function exportAppointmentsToExcel(appointments: Appointment[]): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Centre Alilham';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Rendez-vous', {
    pageSetup: { orientation: 'landscape', fitToPage: true },
  });

  // Title row
  sheet.mergeCells('A1:I1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = 'Centre Alilham — Dr Ilham YASSINE — Liste des Rendez-vous';
  titleCell.font = { bold: true, size: 14, color: { argb: 'FF7C3AED' } };
  titleCell.alignment = { horizontal: 'center' };
  sheet.getRow(1).height = 28;

  // Date row
  sheet.mergeCells('A2:I2');
  const dateCell = sheet.getCell('A2');
  dateCell.value = `Exporté le ${new Date().toLocaleDateString('fr-MA', { dateStyle: 'long' })}`;
  dateCell.font = { size: 10, color: { argb: 'FF6B7280' } };
  dateCell.alignment = { horizontal: 'center' };

  sheet.addRow([]); // spacer

  // Header row
  const headers = ['#', 'Nom', 'Téléphone', 'Email', 'Service', 'Date RDV', 'Statut', 'Source', 'Message'];
  const headerRow = sheet.addRow(headers);
  headerRow.eachCell((cell) => {
    cell.font      = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7C3AED' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border    = { bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } } };
  });
  headerRow.height = 22;

  // Column widths
  sheet.columns = [
    { width: 5  },
    { width: 25 },
    { width: 16 },
    { width: 28 },
    { width: 28 },
    { width: 14 },
    { width: 14 },
    { width: 10 },
    { width: 40 },
  ];

  // Data rows
  appointments.forEach((apt, index) => {
    const row = sheet.addRow([
      index + 1,
      apt.name,
      apt.phone,
      apt.email ?? '—',
      apt.service,
      apt.preferred_date
        ? new Date(apt.preferred_date).toLocaleDateString('fr-MA')
        : '—',
      STATUS_LABELS[apt.status] ?? apt.status,
      apt.source === 'whatsapp' ? 'WhatsApp' : 'Web',
      apt.message ?? '—',
    ]);

    const bg = index % 2 === 0 ? 'FFFAF5FF' : 'FFFFFFFF';
    row.eachCell((cell) => {
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      cell.alignment = { vertical: 'middle', wrapText: true };
      cell.font      = { size: 10 };
    });

    const statusCell = row.getCell(7);
    statusCell.font  = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
    statusCell.fill  = {
      type: 'pattern', pattern: 'solid',
      fgColor: { argb: STATUS_COLORS[apt.status] ?? 'FF6B7280' },
    };
    statusCell.alignment = { horizontal: 'center', vertical: 'middle' };

    row.height = 20;
  });

  // Summary row
  sheet.addRow([]);
  const summaryRow = sheet.addRow([`Total: ${appointments.length} rendez-vous`]);
  summaryRow.getCell(1).font = { bold: true, size: 10, color: { argb: 'FF7C3AED' } };

  const buffer = await workbook.xlsx.writeBuffer();
  const blob   = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const date = new Date().toISOString().split('T')[0];
  saveAs(blob, `centre-alilham-rdv-${date}.xlsx`);
}
