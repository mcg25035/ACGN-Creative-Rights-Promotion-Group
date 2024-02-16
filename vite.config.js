import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { EsLinter, linterPlugin } from "vite-plugin-linter";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
    plugins: [
        react(),
        linterPlugin({
            include: ["./src/**/*.jsx"],
            linters: [new EsLinter({ configEnv: configEnv })],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        proxy: {
            '/api': 'http://localhost:3000'
        },
    }
}));
