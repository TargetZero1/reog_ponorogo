import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            shimmer: {
                '0%': { transform: 'translateX(-100%)' },
                '100%': { transform: 'translateX(100%)' },
            },
            pulseGlow: {
                '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
                '50%': { opacity: '1', transform: 'scale(1.05)' },
            },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                rotateIn: {
                    '0%': { opacity: '0', transform: 'rotate(-10deg) scale(0.9)' },
                    '100%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
                },
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                shimmer: 'shimmer 3s ease-in-out infinite',
                slideUp: 'slideUp 0.6s ease-out',
                slideDown: 'slideDown 0.6s ease-out',
                fadeIn: 'fadeIn 0.8s ease-out',
                scaleIn: 'scaleIn 0.5s ease-out',
                rotateIn: 'rotateIn 0.6s ease-out',
                pulseGlow: 'pulseGlow 2s ease-in-out infinite',
            },
        },
    },

    plugins: [forms],
};