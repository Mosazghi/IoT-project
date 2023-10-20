import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            "/api": "http://localhost:5000",
            "/user": "http://localhost:5000",
            "/mqttConnDetails": "http://localhost:5000",
            "/qr": "http://localhost:5000",
        },
    },
    plugins: [react()],
});
