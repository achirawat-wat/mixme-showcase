import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Cloud, Cpu } from "lucide-react";
import InteractiveMixer from "./InteractiveMixer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection({ isDevMode, features }) {
  return (
    <>
      <section className="hero-section">
        <div className="hero-container">
          {/* ================= ส่วนเนื้อหาด้านซ้าย ================= */}
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="hero-badge" variants={itemVariants}>
              <Sparkles size={14} className="badge-icon" />
              React • Supabase • ESP32
            </motion.span>

            <motion.h1 className="hero-title" variants={itemVariants}>
              <span className="title-nowrap">Smart Beverage</span>
              <br />
              <span className="text-gradient">Automation System</span>
            </motion.h1>

            <motion.p className="hero-description" variants={itemVariants}>
              MixMe คือระบบ Smart Beverage Automation ที่เชื่อมต่อ Web Application,
              Cloud Database และ IoT Hardware เพื่อสร้างประสบการณ์การสั่งและผสมเครื่องดื่มแบบอัตโนมัติ
              ตั้งแต่การเลือกสูตรบนหน้าเว็บ ไปจนถึงการควบคุมอุปกรณ์จริงผ่าน ESP32 แบบ Real-time
            </motion.p>

            {/* กล่องครอบ Features เพื่อใส่ Hint */}
            <motion.div className="hero-features-wrapper" variants={itemVariants}>
              <div className="swipe-hint">← Swipe to explore →</div>
              <div className="hero-features">
                {features.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            </motion.div>

            <motion.div className="hero-stats" variants={itemVariants}>
              <div className="stat-card">
                <div className="stat-icon-wrapper blue"><ShieldCheck size={18} /></div>
                <span>Secure Cloud</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper green"><Cloud size={18} /></div>
                <span>Supabase Backend</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon-wrapper purple"><Cpu size={18} /></div>
                <span>ESP32 Control</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= ฝั่งรูปภาพ (MOBILE MOCKUP) ================= */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="visual-wrapper">
              
              <div className={`mockup-glow ${isDevMode ? 'dev-glow' : ''}`}></div>

              {isDevMode && (
                <>
                  <motion.div
                    className="static-status status-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="status-dot dot-green"></span>
                    <code>wifi : connected</code>
                  </motion.div>

                  <motion.div
                    className="static-status status-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    <span className="status-dot dot-blue"></span>
                    <code>supabase : realtime</code>
                  </motion.div>

                  <motion.div
                    className="static-status status-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <span className="status-dot dot-orange"></span>
                    <code>esp32 : online [24ms]</code>
                  </motion.div>
                </>
              )}

              <InteractiveMixer isDevMode={isDevMode} />

            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= สไตล์เฉพาะส่วน HERO SECTION ================= */}
      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 6% 40px; 
          position: relative;
          z-index: 2;
        }

        .hero-container {
          width: 100%;
          max-width: 1450px;
          margin: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 4rem;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          flex: 1;
          max-width: 620px;
          position: relative;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .5rem 1rem;
          border-radius: 999px;
          background: linear-gradient(to right, rgba(59,130,246,.1), rgba(99,102,241,.1));
          color: #2563eb;
          border: 1px solid rgba(99,102,241,.2);
          font-size: .8rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 15px rgba(59,130,246,.05);
        }

        .badge-icon {
          color: #6366f1;
        }

        .hero-title {
          font-size: clamp(2.8rem, 5vw, 4.5rem); 
          line-height: 1.05;
          font-weight: 900;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .title-nowrap {
          white-space: nowrap;
        }

        .text-gradient {
          background: linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          color: #475569;
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .hero-features-wrapper {
          width: 100%;
          margin-bottom: 2rem;
        }

        .swipe-hint {
          display: none; /* ซ่อนไว้ในหน้าจอ PC */
        }

        .hero-features {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-features span {
          padding: .6rem 1rem;
          border-radius: 999px;
          background: rgba(255,255,255,.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(226,232,240, 0.8);
          color: #334155;
          font-size: .8rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
        }

        .hero-features span:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: #6366f1;
          color: #4f46e5;
          box-shadow: 0 10px 20px rgba(99,102,241,.15);
          background: #ffffff;
        }

        .hero-stats {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: .7rem;
          padding: .6rem 1rem .6rem .6rem;
          background: rgba(255,255,255,.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226,232,240, 0.8);
          border-radius: 100px;
          box-shadow: 0 4px 20px rgba(15,23,42,.03);
          font-size: .85rem;
          font-weight: 600;
          color: #1e293b;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(15,23,42,.08);
        }

        .stat-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          color: white;
        }

        .stat-icon-wrapper.blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
        .stat-icon-wrapper.green { background: linear-gradient(135deg, #22c55e, #16a34a); }
        .stat-icon-wrapper.purple { background: linear-gradient(135deg, #a855f7, #7e22ce); }

        .hero-visual {
          flex: 1.2;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-wrapper {
          position: relative; 
        }

        .mockup-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 500px;
          background: linear-gradient(135deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3));
          filter: blur(80px);
          border-radius: 50%;
          z-index: 0;
          transition: background 0.5s;
        }

        .mockup-glow.dev-glow {
          background: linear-gradient(135deg, rgba(74,222,128,0.15), rgba(5,150,105,0.15));
        }

        .static-status {
          position: absolute;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(71, 85, 105, 0.5);
          padding: 8px 14px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 20;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .static-status code {
          color: #4ade80;
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          white-space: nowrap;
        }

        .status-dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot-green { background-color: #22c55e; box-shadow: 0 0 10px #22c55e; }
        .dot-blue  { background-color: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
        .dot-orange{ background-color: #f59e0b; box-shadow: 0 0 10px #f59e0b; }

        .status-1 { top: 12%; right: -220px; }
        .status-2 { top: 48%; left: -240px; }
        .status-3 { bottom: 18%; right: -280px; }

        .mobile-mockup {
          width: 320px;
          height: 640px;
          background: #0f172a;
          border: 12px solid #1e293b;
          border-radius: 40px;
          position: relative;
          overflow: visible;
          box-shadow:
            20px 40px 60px rgba(15,23,42,.15),
            -10px -10px 30px rgba(255,255,255, 0.5);
          transform: perspective(1200px) rotateY(-8deg);
          z-index: 10;
        }

        .mobile-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 25px;
          background: #1e293b;
          border-radius: 0 0 16px 16px;
          z-index: 10;
        }

        .mobile-screen {
          width: 100%;
          height: 100%;
          background: #f8fafc;
          border-radius: 28px;
          overflow: hidden;
        }

        /* ================= DEV MODE OVERRIDE ================= */
        
        .dev-mode-active .hero-title {
          font-size: clamp(2.2rem, 4vw, 3.8rem);
        }

        .dev-mode-active .hero-badge {
          background: rgba(74,222,128,.1);
          color: #4ade80;
          border-color: rgba(74,222,128,.2);
        }

        .dev-mode-active .badge-icon { color: #4ade80; }

        .dev-mode-active .stat-card {
          background: rgba(17, 24, 39, 0.8);
          border-color: rgba(55, 65, 81, 0.8);
          color: #e2e8f0;
        }

        .dev-mode-active .hero-description { color: #94a3b8; }

        .dev-mode-active .hero-features span {
          background: rgba(17, 24, 39, 0.6);
          border-color: rgba(55, 65, 81, 0.8);
          color: #4ade80;
        }
        
        .dev-mode-active .hero-features span:hover {
          background: rgba(74, 222, 128, 0.1);
          box-shadow: 0 10px 20px rgba(74,222,128,.1);
        }

        .dev-mode-active .mobile-mockup {
          box-shadow:
            20px 40px 60px rgba(0,0,0,.6),
            -5px -5px 20px rgba(255,255,255, 0.05);
        }

        /* ================= RESPONSIVE ================= */
        @media (max-width: 1100px) {
          .hero-container {
            flex-direction: column;
            text-align: center;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          /* แอนิเมชันให้ข้อความ Hint กระพริบเบาๆ ดึงดูดสายตา */
          @keyframes pulse-hint {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }

          .swipe-hint {
            display: block;
            font-size: 0.75rem;
            color: #94a3b8;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
            animation: pulse-hint 2s infinite ease-in-out;
          }

          .dev-mode-active .swipe-hint {
            color: #4ade80;
          }
          
          /* --- ทำให้ Feature เลื่อนซ้ายขวาได้บนมือถือ พร้อม Scrollbar บางๆ --- */
          .hero-features { 
            justify-content: flex-start;
            flex-wrap: nowrap; 
            overflow-x: auto; 
            width: 100%;
            padding-bottom: 12px; 
            -webkit-overflow-scrolling: touch; 
            
            /* แสดง Scrollbar */
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 transparent;
          }

          .hero-features::-webkit-scrollbar {
            height: 4px;
            display: block;
          }
          .hero-features::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.02);
            border-radius: 10px;
          }
          .hero-features::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }

          /* สี Scrollbar ตอนเป็น Dev Mode */
          .dev-mode-active .hero-features {
            scrollbar-color: rgba(74,222,128,0.5) transparent;
          }
          .dev-mode-active .hero-features::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.02);
          }
          .dev-mode-active .hero-features::-webkit-scrollbar-thumb {
            background: rgba(74,222,128,0.5);
          }

          .hero-features span {
            flex-shrink: 0; 
            white-space: nowrap; 
          }

          .hero-stats { justify-content: center; }
          .status-1, .status-2, .status-3 { display: none; }
          .title-nowrap { white-space: normal; } 
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 2.2rem; }
          .dev-mode-active .hero-title { font-size: 2rem; }
        }
      `}</style>
    </>
  );
}