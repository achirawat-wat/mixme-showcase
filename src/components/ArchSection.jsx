import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Cpu } from "lucide-react";

export default function ArchSection() {
  return (
    <>
      <section className="arch-section">
        <div className="section-header">
          <span className="section-badge">System Design</span>

          <h2>
            System <span className="text-gradient">Architecture</span>
          </h2>

          <p>การเชื่อมต่อระหว่าง Frontend, Database และ IoT Hardware</p>
        </div>

        <div className="arch-diagram">
          <motion.div
            className="node"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Code size={34} />
            <h3>React Frontend</h3>
            <p>User Interface</p>
          </motion.div>

          <motion.div
            className="arrow"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
          />

          <motion.div
            className="node"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Database size={34} />
            <h3>Supabase</h3>
            <p>Realtime Database</p>
          </motion.div>

          <motion.div
            className="arrow"
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
          />

          <motion.div
            className="node"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Cpu size={34} />
            <h3>ESP32 IoT</h3>
            <p>Hardware Controller</p>
          </motion.div>
        </div>
      </section>

      {/* สไตล์เฉพาะส่วน ARCHITECTURE SECTION */}
      <style>{`
        .arch-section {
          padding: 100px 6%;
          position: relative;
          z-index: 2;
        }

        .arch-diagram {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .node {
          min-width: 240px;
          padding: 2rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(15,23,42,.06);
          transition: .3s;
        }

        .node:hover {
          transform: translateY(-6px);
        }

        .node h3 {
          margin-top: 1rem;
          margin-bottom: .5rem;
        }

        .node p {
          color: #64748b;
        }

        .arrow {
          width: 120px;
          height: 4px;
          background: linear-gradient(to right, #38bdf8, #6366f1);
          border-radius: 999px;
        }

        /* DEV MODE OVERRIDE FOR ARCH */
        .dev-mode-active .node {
          background: #111827;
          border-color: #1f2937;
          color: white;
        }

        .dev-mode-active .node p {
          color: #94a3b8;
        }

        @media (max-width: 1100px) {
          .arch-diagram {
            flex-direction: column;
          }
          .arrow {
            width: 4px !important;
            height: 60px;
          }
        }

        @media (max-width: 768px) {
          .node {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}