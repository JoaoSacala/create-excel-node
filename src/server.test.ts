// server.test.ts
/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "./server";
import ExcelJS from "exceljs";
import { fetch } from "undici"; // ✅ usa o fetch com tipos corretos

// Removido o uso de 'server' pois app.listen retorna void ou tipo incompatível
beforeAll(async () => {
	await app.listen({ port: 0 }); // porta aleatória
});

afterAll(async () => {
	await app.close();
});

describe("Rotas da API", () => {
	it("GET / deve retornar saudação", async () => {
		const res = await app.inject({
			method: "GET",
			url: "/",
		});

		expect(res.statusCode).toBe(200);
		expect(res.json()).toEqual({ hello: "Santos mau ai" });
	});

	it("GET /relatorio-vendas deve retornar um arquivo Excel", async () => {
		/* 		const res = await app.inject({
			method: "GET",
			url: "/relatorio-vendas",
		});
 */
		const addressInfo = app.server.address();
		if (
			!addressInfo ||
			typeof addressInfo !== "object" ||
			!("port" in addressInfo)
		) {
			throw new Error("Server address or port not available");
		}
		const port = (addressInfo as { port: number }).port;
		const res = await fetch(`http://localhost:${port}/relatorio-vendas`, {
			method: "GET",
		});
		expect(res.status).toBe(200);
		expect(res.headers.get("content-type")).toContain(
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		);

		const buffer = Buffer.from(await res.arrayBuffer()); 
		const workbook = new ExcelJS.Workbook();
		await workbook.xlsx.load(buffer);

		const sheet = workbook.getWorksheet("Relatório de Vendas");
		expect(sheet).toBeTruthy();

		expect(sheet).toBeDefined();
		if (!sheet) {
			throw new Error("Worksheet 'Relatório de Vendas' not found");
		}
		expect(sheet.getRow(1).getCell(1).value).toBe("Data");
		expect(sheet.getRow(2).getCell(2).value).toBe("João Pedro");
		expect(sheet.getRow(3).getCell(3).value).toBe("Sacalinha Especial");
	});
});
