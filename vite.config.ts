import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
	// Served from https://phlppkln.github.io/ (user site, root path)
	base: "/",
	plugins: [vue()],
});
