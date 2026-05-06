import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
// 请确保你的 constants 文件夹和 data.ts 文件路径正确
import { QUESTIONS, RESULTS } from "./constants/data";
import type { Result } from "./constants/data";

const App = () => {
  // --- 逻辑状态区 ---
  const [step, setStep] = useState<"home" | "quiz" | "loading" | "result">(
    "home",
  );
  const [curIdx, setCurIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<Result | null>(null);

  // 计分判定逻辑
  const calculateResult = (ans: string[]) => {
    const counts = { A: 0, B: 0, C: 0 };
    ans.forEach((a) => counts[a as keyof typeof counts]++);
    const { A, B, C } = counts;

    // 判定优先级逻辑
    if (A === B && A > C) return RESULTS.guardian;
    if (B === C && B > A) return RESULTS.judge;
    if (A === C && A > B) return RESULTS.conflict;
    if (A > B && A > C) return RESULTS.primary;
    if (B > A && B > C) return RESULTS.bystander;
    return RESULTS.traveler;
  };

  // 答题处理逻辑
  const handleAnswer = (val: string) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);

    if (curIdx < 9) {
      // 切换到下一题，这里会触发 Question {curIdx + 1} 的变化
      setCurIdx(curIdx + 1);
    } else {
      // 答完 10 题，进入加载中
      setStep("loading");
      setTimeout(() => {
        setFinalResult(calculateResult(newAnswers));
        setStep("result");
      }, 2000);
    }
  };

  // 重置测试逻辑
  const handleRestart = () => {
    setStep("home");
    setCurIdx(0);
    setAnswers([]);
    setFinalResult(null);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center select-none overflow-x-hidden">
      {/* --- 【新加的位置 A】：噪点滤镜定义 (放在容器最开头) --- */}
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div className="w-full max-w-[390px] min-h-screen flex flex-col relative">
        {/* --- 【新加的位置 B】：这就是你要找的“首页”代码块 --- */}
        {/* 1. 首页 */}
        {step === "home" && (
          <div className="flex-1 flex flex-col items-center p-8 relative overflow-hidden bg-black">
            {/* 噪点覆盖层 */}
            <div
              className="absolute inset-0 z-20 opacity-[0.15] mix-blend-overlay pointer-events-none"
              style={{ filter: "url(#noiseFilter)" }}
            />

            {/* 背景渐变光晕 (Orb) */}
            <div className="absolute top-[10%] w-80 h-80 bg-gradient-to-b from-blue-600 via-orange-400 to-red-500 rounded-full blur-[90px] opacity-60 animate-[pulse_8s_ease-in-out_infinite]" />

            {/* 极细装饰曲线 */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30"
              viewBox="0 0 390 844"
            >
              <path
                d="M-50 150 C 100 250, 300 100, 450 200"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M450 350 C 250 200, 100 450, -50 300"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>

            {/* 4. 居中文案：mt-32 相比之前的 mt-60 大幅上移 */}
            <div className="relative z-30 mt-32 text-center">
              <h1 className="text-3xl font-light leading-tight mb-4 tracking-[0.05em] text-white">
                你真正的
                <br />
                <span className="font-medium">「内在年龄眼睛」</span>
              </h1>
              <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">
                Perception is the window to the soul.
              </p>
            </div>

            {/* 5. 底部操作区：固定在下方 */}
            <div className="mt-auto mb-20 flex flex-col items-center w-full px-4">
              <button
                onClick={() => setStep("quiz")}
                className="relative z-30 w-full max-w-[280px] h-16 bg-transparent border border-white/20 rounded-full flex items-center justify-between px-8 group hover:border-white transition-all duration-700"
              >
                <span className="text-base tracking-[0.2em] font-light text-white/90 group-hover:text-black transition-colors duration-500">
                  开始测试
                </span>
                <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* 补充小字说明 */}
              <p className="mt-4 text-white/30 text-[11px] tracking-[0.15em] font-light">
                共 10 道题，约 2 分钟
              </p>
            </div>

            <p className="absolute bottom-6 text-[9px] opacity-20 tracking-[0.4em] uppercase text-white">
              System.Visual_Core_2026
            </p>
          </div>
        )}

        {/* 2. 答题页渲染 */}
        {step === "quiz" && (
          <div className="flex-1 flex flex-col p-8">
            {/* 顶部进度条 */}
            <div className="w-full h-[2px] bg-white/20 mb-20">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${((curIdx + 1) / 10) * 100}%` }}
              />
            </div>

            {/* 动态题号展示 */}
            <div className="mb-4 text-xs font-mono opacity-50 uppercase tracking-widest">
              Question {curIdx + 1} / 10
            </div>

            <h2 className="text-2xl font-medium mb-2 leading-snug">
              {QUESTIONS[curIdx].text}
            </h2>
            <p className="text-gray-500 text-sm mb-12 italic">
              {QUESTIONS[curIdx].subText}
            </p>

            <div className="space-y-4">
              {QUESTIONS[curIdx].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full text-left p-5 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all group"
                >
                  <span className="inline-block w-6 text-xs opacity-50 group-hover:text-black">
                    {opt.value}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. 加载中渲染 */}
        {step === "loading" && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="text-xs tracking-[0.2em] animate-pulse">
              正在清洗瞳孔中的记忆...
            </p>
          </div>
        )}

        {/* 4. 结果页渲染 */}
        {step === "result" && finalResult && (
          <div className="flex-1 flex flex-col p-6 animate-in fade-in duration-1000 relative bg-black overflow-hidden">
            {/* 全局噪点质感层 */}
            <div
              className="absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
              style={{ filter: "url(#noiseFilter)" }}
            />

            {/* 结果海报区域 */}
            <div className="bg-black border border-white/20 p-6 relative flex flex-col overflow-hidden z-10 shadow-2xl">
              {/* 背景氛围光晕 */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[80px] -z-10" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-[80px] -z-10" />

              {/* 顶部：标题与年龄 */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] tracking-[0.3em] uppercase opacity-50">
                    Result Report
                  </p>
                  <h3 className="text-3xl font-bold mt-1 tracking-tighter">
                    {finalResult.title}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] opacity-50">内在年龄</p>
                  <p className="text-xl font-mono leading-none">
                    {finalResult.age}
                  </p>
                </div>
              </div>

              {/* 核心展示图：保持 4:3 比例 + 呼吸动画 */}
              <div className="w-full aspect-[4/3] mb-6 overflow-hidden bg-white/5 border border-white/5">
                <img
                  src={finalResult.img}
                  className="w-full h-full object-cover animate-slow-blink"
                  alt="revealed eye"
                />
              </div>

              {/* 文案内容区 */}
              <div className="space-y-4">
                <p className="text-lg font-medium leading-tight text-white/90 underline decoration-white/20 underline-offset-8">
                  {finalResult.tagline}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed text-justify">
                  {finalResult.desc}
                </p>
                <div className="flex gap-2">
                  {finalResult.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-1 border border-white/30 text-white/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="pt-6 border-t border-white/10 mt-4">
                  <p className="text-sm italic font-serif opacity-80">
                    {finalResult.quote}
                  </p>
                </div>
              </div>

              {/* --- 关键修改：底部元数据与二维码区域 --- */}
              <div className="mt-8 flex justify-between items-end">
                {/* 左侧文字信息 */}
                <p className="text-[8px] tracking-widest uppercase opacity-30">
                  Psychology Test Eye Age
                </p>

                {/* 右侧：二维码 + 年份说明 */}
                <div className="flex flex-col items-end gap-2">
                  <div className="p-1 bg-white/[0.03] border border-white/10 rounded-sm">
                    <QRCodeSVG
                      value={
                        "https://www.xiaohongshu.com/explore/66da679c0000000026031be4?xsec_token=ABpUNJxzkOoXjTOb4j-NVNYGQ-FemLMe3pr2Hw5Xf-Sug=&xsec_source=pc_user"
                      }
                      size={40} // 精致的小尺寸
                      bgColor={"transparent"}
                      fgColor={"#ffffff"}
                      level={"L"}
                    />
                  </div>
                  <p className="text-[8px] opacity-30 tracking-widest uppercase font-mono">
                    2026 EDITION
                  </p>
                </div>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="mt-8 z-10">
              <button
                onClick={handleRestart}
                className="w-full py-4 border border-white/20 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
              >
                重新开始测试
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
