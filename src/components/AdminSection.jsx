import React from "react";
import { motion } from "framer-motion";
import AdminSandbox from "./AdminSandbox";

export default function AdminSection() {
  return (
    <>
      <section className="sandbox-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <span className="section-badge">Dashboard Preview</span>

          <h2>
            Admin Dashboard <span className="text-gradient">Sandbox</span>
          </h2>

          <p>
            พื้นที่จำลองการทำงานสำหรับผู้ดูแลระบบ เพื่อจัดการสูตรเครื่องดื่ม
            ตรวจสอบสถานะ และวิเคราะห์ข้อมูลการใช้งาน
          </p>
        </motion.div>

        <motion.div
          className="macbook-mockup"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
        >
          <AdminSandbox />
        </motion.div>
      </section>

      {/* สไตล์เฉพาะส่วน ADMIN SECTION */}
      <style>{`
        .sandbox-section {
          /* ใช้ 100vh และ Flexbox เพื่อจัดกึ่งกลางให้อยู่ในจอพอดี */
          min-height: 100vh; 
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 6% 40px; 
          position: relative;
          z-index: 2;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem; /* ลดระยะห่างลง */
        }

        .section-header h2 {
          font-size: clamp(1.8rem, 3.5vw, 3rem); /* ลดขนาดหัวข้อลงเล็กน้อย */
          margin-bottom: 0.8rem;
        }

        .section-header p {
          color: #64748b;
          max-width: 600px;
          margin: auto;
          font-size: 0.95rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .5rem .9rem;
          border-radius: 999px;
          background: rgba(59,130,246,.08);
          color: #2563eb;
          border: 1px solid rgba(59,130,246,.15);
          font-size: .8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        /* MACBOOK MOCKUP */
        .macbook-mockup {
          width: 100%;
          max-width: 860px; /* ลดขนาดลงให้จอ 16:9 ยัดพอดี */
          aspect-ratio: 16 / 10;
          background: #334155;
          border-radius: 20px 20px 0 0;
          border: 10px solid #1e293b;
          border-bottom: 20px solid #0f172a;
          position: relative;
          /* เอา overflow: hidden ออกเพื่อให้ popup ลอยออกไปด้านข้างได้ */
          margin: 0 auto;
          box-shadow: 0 40px 80px rgba(15,23,42,.15);
        }

        /* DEV MODE OVERRIDE FOR ADMIN */
        .dev-mode-active .section-header p {
          color: #94a3b8;
        }

        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}