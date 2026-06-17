import React, { useState } from "react";
import { Terminal, Mail, Phone, User } from "lucide-react"; // เพิ่ม Icon สำหรับ Footer

// Components
import HeroSection from "./components/HeroSection";
import AdminSection from "./components/AdminSection";
import ArchSection from "./components/ArchSection";

import "./App.css";

function App() {
  const [isDevMode, setIsDevMode] = useState(false);

  const features = [
    "⭐ Favorite Recipes",
    "📜 Order History",
    "🔥 Popular Drinks",
    "⚡ Real-time Control",
    "🥤 Cup Detection",
    "🚨 Low Ingredient Alert",
    "📺 OLED Status Display",
    "📊 Analytics Dashboard",
    "☁️ Supabase Backend",
    "🔌 ESP32 IoT Control",
  ];

  return (
    <div className={`app-container ${isDevMode ? "dev-mode-active" : ""}`}>
      {/* Background Effects */}
      {!isDevMode && (
        <>
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
          <div className="bg-grid"></div>
        </>
      )}

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-dot"></span>
          MixMe.
        </div>

        <div className="nav-actions">
          <div className="dev-toggle-container">
            <span
              className={`toggle-label ${
                isDevMode ? "toggle-active" : ""
              }`}
            >
              <Terminal size={15} />
              Dev Mode
            </span>

            <label className="switch">
              <input
                type="checkbox"
                checked={isDevMode}
                onChange={() => setIsDevMode(!isDevMode)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </nav>

      {/* PAGE SECTIONS */}
      <HeroSection isDevMode={isDevMode} features={features} />
      <AdminSection />
      <ArchSection />

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>MixMe Project</h3>
            <p>Smart Beverage Automation System</p>
          </div>
          
          <div className="footer-contact">
            <div className="contact-item">
              <User size={18} />
              <span>Achirawat Watthanavorapant</span>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <a href="mailto:achirawat.wat@gmail.com">achirawat.wat@gmail.com</a>
            </div>
            <div className="contact-item">
              <Phone size={18} />
              <a href="tel:0963688383">0963688383</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MixMe Portfolio. Crafted with React & ESP32.</p>
        </div>
      </footer>

      {/* สไตล์สำหรับ Footer (เพิ่มไว้ในไฟล์นี้เลยเพื่อความสะดวก) */}
      <style>{`
        .app-footer {
          background: #0f172a;
          color: #f8fafc;
          padding: 60px 6% 20px;
          position: relative;
          z-index: 2;
          border-top: 1px solid #1e293b;
        }

        .footer-content {
          max-width: 1450px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
          margin-bottom: 40px;
        }

        .footer-brand h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #38bdf8, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-brand p {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: #cbd5e1;
          font-size: 0.95rem;
        }

        .contact-item a {
          color: #cbd5e1;
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-item a:hover {
          color: #38bdf8;
        }

        .footer-bottom {
          max-width: 1450px;
          margin: 0 auto;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #1e293b;
          color: #64748b;
          font-size: 0.85rem;
        }

        /* DEV MODE OVERRIDE FOR FOOTER */
        .dev-mode-active .app-footer {
          background: #050505;
          border-top: 1px solid #1f2937;
        }
        
        .dev-mode-active .footer-brand h3 {
          background: #4ade80;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dev-mode-active .contact-item,
        .dev-mode-active .contact-item a,
        .dev-mode-active .footer-bottom {
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-contact {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default App;