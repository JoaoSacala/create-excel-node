// biome-ignore assist/source/organizeImports: organize imports for clarity
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
/* import "@testing-library/jest-dom/vitest"; */

afterEach(() => {
	cleanup();
});
