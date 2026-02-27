module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: [
        {
          light: {
            "primary": "#3b82f6",
            "primary-content": "#ffffff",
            "secondary": "#2563eb",
            "secondary-content": "#ffffff",
            "accent": "#0ea5e9",
            "accent-content": "#ffffff",
            "neutral": "#1f2937",
            "neutral-content": "#f3f4f6",
            "base-100": "#ffffff",
            "base-200": "#f3f4f6",
            "base-300": "#e5e7eb",
            "base-content": "#1f2937",
            "info": "#3b82f6",
            "info-content": "#ffffff",
            "success": "#22c55e",
            "success-content": "#ffffff",
            "warning": "#f59e0b",
            "warning-content": "#ffffff",
            "error": "#ef4444",
            "error-content": "#ffffff",
          },
        },
      ],
    }
  };
  