// server.ts

import ExcelJS from "exceljs";
import Fastify from "fastify";

const app = Fastify();

app.get("/", async () => {
	return { hello: "Santos mau ai" };
});

app.get("/relatorio-vendas", async (_, reply) => {
	const vendas = [
		{
			data: "2025-05-26",
			cliente: "João Pedro",
			produto: "Cheese Bacon",
			quantidade: 2,
			total: 6000,
		},
		{
			data: "2025-05-26",
			cliente: "Maria Lemos",
			produto: "Sacalinha Especial",
			quantidade: 1,
			total: 4500,
		},
	];

	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet("Relatório de Vendas");

	sheet.columns = [
		{ header: "Data", key: "data", width: 15 },
		{ header: "Cliente", key: "cliente", width: 25 },
		{ header: "Produto", key: "produto", width: 25 },
		{ header: "Qtd.", key: "quantidade", width: 10 },
		{ header: "Total (Kz)", key: "total", width: 15 },
	];

	sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
	sheet.getRow(1).fill = {
		type: "pattern",
		pattern: "solid",
		fgColor: { argb: "FF4CAF50" },
	};
	sheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

	for (const venda of vendas) {
		sheet.addRow(venda);
	}

	sheet.eachRow({ includeEmpty: false }, (row) => {
		row.eachCell((cell) => {
			cell.border = {
				top: { style: "thin" },
				left: { style: "thin" },
				bottom: { style: "thin" },
				right: { style: "thin" },
			};
			cell.alignment = { vertical: "middle", horizontal: "left" };
		});
	});

	await sheet.protect("leituraSomente", {
		selectLockedCells: false,
		selectUnlockedCells: false,
		formatCells: false,
		formatColumns: false,
		formatRows: false,
		insertColumns: false,
		insertRows: false,
		insertHyperlinks: false,
		deleteColumns: false,
		deleteRows: false,
		sort: false,
		autoFilter: false,
		pivotTables: false,
	});

	const buffer = await workbook.xlsx.writeBuffer();

	reply
		.header(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		)
		.header(
			"Content-Disposition",
			"attachment; filename=relatorio-vendas.xlsx",
		)
		.send(buffer);
});

export default app;
