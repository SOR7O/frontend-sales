import { Injectable } from "@angular/core";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: "root",
})
export class PdfService {
  constructor() {}

  async generarPDF(header, detalle, name) {
    var dd = {
      content: [
        {
          aligment: "justify",
          columns: [
            { text: "Logo", alignment: "left" },
            {
              text: "FACTURA\nNo. 01-01-01-00000001",
              alignment: "right",
              fontSize: 10,
            },
          ],
        },
        {
          text: "Nombre de la imprenta S.A. de C.V.Direccion:",
          alignment: "left",
          fontSize: 10,
        },

        {
          text: "R.T.N.: 0101010101010101",
          alignment: "left",
          fontSize: 10,
        },

        {
          text: "Telefono:",
          alignment: "justify",
          fontSize: 10,
        },
        {
          text: "Correo:",
          alignment: "justify",
          fontSize: 10,
        },
        {
          text: "CAI:",
          alignment: "justify",
          fontSize: 10,
        },
        {
          text: "Rango de autorizacion:",
          alignment: "justify",
          fontSize: 10,
        },
        {
          text: "Fecha limite de emision:",
          alignment: "justify",
          fontSize: 10,
          margin: [0, 0, 0, 10],
        },

        {
          margin: [0, 0, 0, 10],
          table: {
            widths: [50, "*"],

            body: [["CLIENTE", "PEDRO PICA PIEDRA"]],
          },
        },
        {
          table: {
            widths: [50, "*", 70, 70],
            body: [
              [
                { text: "Cantidad", style: "tableHeader" },
                { text: "Descripcion", style: "tableHeader" },
                { text: "P/U", style: "tableHeader" },
                { text: "total", style: "tableHeader" },
              ],
              [
                {
                  text: "100",
                  border: [true, false, false, false],
                  fillColor: "#eeeeff",
                },
                {
                  text: 1,
                  border: [true, false, false, false],
                  fillColor: "#eeeeff",
                },
                {
                  text: 1,
                  border: [true, false, false, false],
                  fillColor: "#eeeeff",
                },
                {
                  text: 1,
                  border: [true, false, true, false],
                  fillColor: "#eeeeff",
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: [50, "*", 70, 70],
            body: [
              [
                {
                  text: "",
                  border: [false, true, false, false],
                  fillColor: "#FFFFFF",
                },
                {
                  text: "",
                  border: [false, true, false, false],
                  fillColor: "#FFFFFF",
                },
                {
                  text: "Total",
                  border: [true, true, true, true],
                  fillColor: "#eeeeff",
                },
                {
                  text: 2000,
                  border: [true, true, true, true],
                  fillColor: "#eeeeff",
                },
              ],
            ],
          },
        },
        {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: 0,
              w: 285,
              h: 23,
              r: 3,
              lineColor: "#ccc",
            },
          ],
        },
        { text: "aquuii", absolutePosition: { x: 45, y: 250 } },
        {
          text: 'LA FACTURA ES BENEFICIO DE TODO "EXIJALA"',
          margin: [0, 10, 0, 10],
        },
        {
          alignment: "justify",
          columns: [
            {
              style: "tableExample",
              table: {
                widths: ["*", "*"],
                body: [
                  [
                    {
                      text: "N° Correlativo de orden de compra",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "total" },
                  ],
                  [
                    {
                      text: "No Correlativo de constancia de registro exonerado",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "total" },
                  ],
                  [
                    {
                      text: "N° identificativo del registro de la SAG",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "total" },
                  ],
                ],
              },
            },
            {
              style: "tableExample",
              table: {
                widths: [140, 10, "*"],
                body: [
                  [
                    {
                      text: "IMPORTE EXONERADO",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "L.", border: [false, false, false, false] },
                    { text: "total" },
                  ],
                  [
                    {
                      text: "IMPORTE EXCENTO",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "L.", border: [false, false, false, false] },
                    { text: "total" },
                  ],
                  [
                    {
                      text: "IMPORTE GRAVADO 15%",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "L.", border: [false, false, false, false] },
                    { text: "total" },
                  ],
                  [
                    {
                      text: "IMPORTE GRAVADO 18%",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "L.", border: [false, false, false, false] },
                    { text: "total" },
                  ],
                  [
                    {
                      text: "IMPORTE EXONERADO",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "L.", border: [false, false, false, false] },
                    { text: "total" },
                  ],

                  [
                    {
                      text: "ISV 15%",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "L.", border: [false, false, false, false] },
                    { text: "total" },
                  ],
                  [
                    {
                      text: "ISV 18%",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "L.", border: [false, false, false, false] },
                    { text: "total" },
                  ],
                  [
                    {
                      text: "TOTAL A PAGAR",
                      bold: true,
                      border: [false, false, false, false],
                    },
                    { text: "L.", border: [false, false, false, false] },
                    { text: "total" },
                  ],
                ],
              },
            },
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        bigger: {
          fontSize: 15,
          italics: true,
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };
    // pdfMake.createPdf(documentDefinition).download();
    await pdfMake.createPdf(dd).download(`${name}-${this.generaNss()}.pdf`);
  }
  generaNss() {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
