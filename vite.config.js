import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { EsLinter, linterPlugin } from "vite-plugin-linter";
import oxlintPlugin from 'vite-plugin-oxlint';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
    plugins: [
        react(),
        oxlintPlugin({
            path:'./src'
        }),
        linterPlugin({
            include: ["./src/**/*.jsx"],
            linters: [new EsLinter({ configEnv: configEnv })],
        }),
    ],
    server: {
        proxy: {
            '/api': 'http://localhost:3000'
        },
    }
}));
