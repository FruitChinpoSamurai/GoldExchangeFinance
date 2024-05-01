import { PDFDocument, StandardFonts, rgb  } from 'pdf-lib'
import downloadjs from "downloadjs";
import pdf from "../assets/blank.pdf";

const print = async (transactionData, rate) => {
  const formUrl = pdf
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const svgPath = 'M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z'
  
  ///
    /// Upper half
  ///

  firstPage.moveTo(535, 492)
  firstPage.drawSvgPath(svgPath, { scale: 0.5 })

  // Serial No.
  firstPage.drawText(transactionData.global_transaction_id.substring(7), {
    x: 100,
    y: 565,
    size: 13.5
  })

  // Com. No.
  firstPage.drawText(transactionData.global_transaction_id.substring(0, 7), {
    x: 100,
    y: 547.5,
    size: 13.5
  })

  // Cust. ID.
  firstPage.drawText('Cust. ID.:', {
    x: 40,
    y: 520,
    size: 11,
    font: helveticaBoldFont
  })

  // Cust. ID. value
  firstPage.drawText(transactionData.header.cust_id, {
    x: 95,
    y: 520,
    size: 13.5
  })

  // Acc. ID.
  firstPage.drawText('Acc. ID.:', {
    x: 140,
    y: 520,
    size: 11,
    font: helveticaBoldFont
  })

  // Acc. ID. value
  firstPage.drawText(String(transactionData.header.acco_id), {
    x: 185,
    y: 520,
    size: 13.5
  })

  // Name
  firstPage.drawText(transactionData.header.cust_name, {
    x: 212.5,
    y: 565,
    size: 13.5,
    font: helveticaBoldFont
  })
  
  // Date
  firstPage.drawText(transactionData.header.date_created.split(' ')[0], {
    x: 452,
    y: 565,
    size: 13.5
  })

  // Time
  firstPage.drawText(transactionData.header.date_created.split(' ')[1], {
    x: 452,
    y: 547.5,
    size: 13.5
  })

  // Total Weight
  firstPage.drawText(String(transactionData.transaction.total_sample_weight), {
    x: 280,
    y: 498,
    size: 13.5,
    font: helveticaBoldFont
  })

  // Pure Gold
  firstPage.drawText(String(transactionData.transaction.pure_weight), {
    x: 280,
    y: 475.5,
    size: 13.5,
    font: helveticaBoldFont
  })

  // Test Fee
  firstPage.drawText(String(transactionData.transaction.fees), {
    x: 280,
    y: 447.625,
    size: 13.5
  })

  // Labour Charges
  firstPage.drawText(String(transactionData.transaction.charges), {
    x: 280,
    y: 422.375,
    size: 13.5
  })

  // Total Labour Charges
  firstPage.drawText(String(Math.round(transactionData.transaction.charges * transactionData.transaction.total_sample_weight) + transactionData.transaction.fees), {
    x: 280,
    y: 395.25,
    size: 13.5
  })

  // Ratti In Box
  firstPage.drawRectangle({
    x: 460,
    y: 475,
    width: 70,
    height: 20,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
    color: rgb(0.750, 0.750, 0.750)
  })

  // Ratti In
  firstPage.drawText(String(Math.abs(transactionData.transaction.ratti_in)), {
    x: 475,
    y: 480,
    size: 13.5,
    font: helveticaBoldFont
  })

  // Ratti Out
  firstPage.drawText(String(transactionData.transaction.ratti_out), {
    x: 475,
    y: 458,
    size: 13.5
  })

  // Karats
  firstPage.drawText(String(transactionData.transaction.karats), {
    x: 475,
    y: 436,
    size: 13.5
  })

  // Points
  firstPage.drawText(String(transactionData.transaction.points), {
    x: 475,
    y: 415,
    size: 13.5
  })

  ///

  ///
    /// Lower half
  ///

  firstPage.moveTo(535, 175)
  firstPage.drawSvgPath(svgPath, { scale: 0.5 })

  // Serial No.
  firstPage.drawText(transactionData.global_transaction_id.substring(7), {
    x: 100,
    y: 240,
    size: 13.5
  })

  // Com. No.
  firstPage.drawText(transactionData.global_transaction_id.substring(0, 7), {
    x: 100,
    y: 222,
    size: 13.5
  })

  // Cust. ID.
  firstPage.drawText('Cust. ID.:', {
    x: 40,
    y: 200,
    size: 11,
    font: helveticaBoldFont
  })

  // Cust. ID. value
  firstPage.drawText(transactionData.header.cust_id, {
    x: 95,
    y: 200,
    size: 13.5
  })

  // Acc. ID.
  firstPage.drawText('Acc. ID.:', {
    x: 140,
    y: 200,
    size: 11,
    font: helveticaBoldFont
  })

  // Acc. ID. value
  firstPage.drawText(String(transactionData.header.acco_id), {
    x: 185,
    y: 200,
    size: 13.5
  })

  // Name
  firstPage.drawText(transactionData.header.cust_name, {
    x: 212.5,
    y: 240,
    size: 13.5,
    font: helveticaBoldFont
  })
  
  // Date
  firstPage.drawText(transactionData.header.date_created.split(' ')[0], {
    x: 452,
    y: 242,
    size: 13.5
  })

  // Time
  firstPage.drawText(transactionData.header.date_created.split(' ')[1], {
    x: 452,
    y: 224,
    size: 13.5
  })

  // Total Weight
  firstPage.drawText(String(transactionData.transaction.total_sample_weight), {
    x: 280,
    y: 180,
    size: 13.5,
    font: helveticaBoldFont
  })

  // Pure Gold
  firstPage.drawText(String(transactionData.transaction.pure_weight), {
    x: 280,
    y: 156,
    size: 13.5,
    font: helveticaBoldFont
  })

  // Test Fee
  firstPage.drawText(String(transactionData.transaction.fees), {
    x: 280,
    y: 128,
    size: 13.5
  })

  // Labour Charges
  firstPage.drawText(String(transactionData.transaction.charges), {
    x: 280,
    y: 104,
    size: 13.5
  })

  // Total Labour Charges
  firstPage.drawText(String(Math.round(transactionData.transaction.charges * transactionData.transaction.total_sample_weight) + transactionData.transaction.fees), {
    x: 280,
    y: 79,
    size: 13.5
  })

  // Gold Rate
  firstPage.drawText(String(rate), {
    x: 280,
    y: 56,
    size: 13.5
  })

  // Amount
  firstPage.drawText(String(Math.round(((transactionData.transaction.pure_weight) / 11.664) * rate)), {
    x: 280,
    y: 31,
    size: 13.5,
    font: helveticaBoldFont
  })

  // Ratti In Box
  firstPage.drawRectangle({
    x: 460,
    y: 158,
    width: 70,
    height: 20,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1.5,
    color: rgb(0.750, 0.750, 0.750)
  })

  // Ratti In
  firstPage.drawText(String(Math.abs(transactionData.transaction.ratti_in)), {
    x: 475,
    y: 163,
    size: 13.5,
    font: helveticaBoldFont
  })

  // Ratti Out
  firstPage.drawText(String(transactionData.transaction.ratti_out), {
    x: 475,
    y: 139,
    size: 13.5
  })

  // Karats
  firstPage.drawText(String(transactionData.transaction.karats), {
    x: 475,
    y: 118,
    size: 13.5
  })

  // Points
  firstPage.drawText(String(transactionData.transaction.points), {
    x: 475,
    y: 97,
    size: 13.5
  })

  ///

  const pdfBytes = await pdfDoc.save()
  downloadjs(pdfBytes, `BigReport_${transactionData.header.date_created.split(' ')[0]}_${transactionData.global_transaction_id}.pdf`, "application/pdf");
}

const bigPrintService = { print };
export default bigPrintService;