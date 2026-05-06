/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 定义动画的关键帧
      keyframes: {
        slowBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" }, // 这里的 0.4 是最暗时的透明度，可以按需调整
        },
      },
      // 定义动画名称和参数
      animation: {
        "slow-blink": "slowBlink 4s ease-in-out infinite", // 4s 代表一个呼吸周期为 4 秒
      },
    },
  },
  plugins: [],
};
