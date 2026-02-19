/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
    ],
    theme: {
        extend: {
            colors: {
                medical: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#64748b', // Cool Slate
                    600: '#475569',
                    800: '#334155',
                    900: '#1e293b', // Deep Cold Slate
                },
                soft: {
                    50: '#fcfafa', // Soft Off-white
                    100: '#f3e8ff', // Pale Lavender
                    300: '#d8b4fe',
                    500: '#a78bfa', // Cool Lavender
                    600: '#8b5cf6', // Violet
                },
                'cold-pink': '#fdf2f8',
            },
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
