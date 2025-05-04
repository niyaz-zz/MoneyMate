import { jsPDF } from 'jspdf';
import { Transaction } from '../types/transaction';

export const exportUtils = {
  generateCSV(transactions: Transaction[]): string {
    const headers = ['Date', 'Title', 'Category', 'Type', 'Amount', 'Notes'];
    const rows = transactions.map(t => [
      t.date,
      t.title,
      t.category,
      t.type,
      t.amount.toString(),
      t.notes || '',
    ]);

    return [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');
  },

  async generatePDF(transactions: Transaction[]): Promise<string> {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Financial Report', 20, 20);
    
    doc.setFontSize(12);
    let y = 40;
    
    transactions.forEach((t, i) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      
      doc.text(`${t.date} - ${t.title}`, 20, y);
      doc.text(`${t.type === 'income' ? '+' : '-'}${t.amount}`, 150, y);
      y += 10;
    });

    return doc.output('datauristring');
  },
};