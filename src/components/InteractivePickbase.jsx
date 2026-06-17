import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';

const InteractivePickbase = ({ mockAlcohols, activeId, setActiveId, pickedIds, togglePick, onNext }) => {
  const selectedBase = mockAlcohols.find((a) => a.id === activeId);
  const isActivePicked = pickedIds.includes(activeId);
  const isNextDisabled = pickedIds.length === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', paddingBottom: '90px' }}
    >
      <div style={styles.header}>
        <button style={styles.backButton} disabled><ArrowLeft size={24} color="#0f172a" /></button>
        <h2 style={styles.headerTitle}>Pick Your Base</h2>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {selectedBase && (
          <div style={styles.mainWrapper}>
            <div style={styles.textBlock}>
              <div style={styles.name}>{selectedBase.name}</div>
              <div style={styles.description}>{selectedBase.description}</div>
              <div style={styles.price}>Price : {selectedBase.price}฿/oz.</div>
            </div>
            <div style={styles.imageBlock}>{selectedBase.icon}</div>
          </div>
        )}
      </div>

      <div>
        <div style={styles.infoBox}>Please press the select button to choose base.</div>
        {/* ใช้ flex 1 เพื่อแบ่งการ์ดให้พอดีจอ */}
        <div style={styles.cardRow}>
          {mockAlcohols.map((item) => {
            const isActive = activeId === item.id;
            const isPicked = pickedIds.includes(item.id);
            return (
              <div
                key={item.id} onClick={() => setActiveId(item.id)}
                style={{
                  ...styles.card,
                  flex: isActive ? 1.15 : 1, // บังคับพอดีจอ (อันที่เลือกจะกว้างกว่านิดหน่อย)
                  height: isActive ? 110 : 95,
                  boxShadow: isActive ? "0 8px 20px rgba(0,0,0,0.12)" : "0 4px 10px rgba(0,0,0,0.06)",
                  border: isPicked ? "2px solid #10b981" : "2px solid transparent",
                }}
              >
                <div
                  onClick={(e) => { e.stopPropagation(); if (isActive) togglePick(item.id); else setActiveId(item.id); }}
                  style={{
                    ...styles.circle,
                    border: isPicked ? "2px solid #10b981" : "2px solid #cbd5e1",
                    backgroundColor: isPicked ? "#10b981" : "#fff",
                    opacity: isActive ? 1 : 0.5,
                  }}
                >
                  {isPicked && <Check size={12} color="#fff" strokeWidth={4} />}
                </div>
                {React.cloneElement(item.icon, { size: isActive ? 45 : 32 })}
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.bottomBar}>
        <div style={styles.pickText}>Picked : {pickedIds.length}</div>
        <div style={styles.buttonRow}>
          <button style={{ ...styles.selectBtn, backgroundColor: isActivePicked ? "#ef4444" : "#8b5cf6" }} onClick={() => activeId && togglePick(activeId)}>
            {isActivePicked ? "Unselect" : "Select"}
          </button>
          <button style={{ ...styles.nextBtn, backgroundColor: isNextDisabled ? "#d1d5db" : "#6b21a8", cursor: isNextDisabled ? "not-allowed" : "pointer" }} onClick={onNext} disabled={isNextDisabled}>
            Next &gt;
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  header: { display: "flex", alignItems: "center", padding: "40px 16px 0", marginTop: "10px" },
  backButton: { background: "none", border: "none", padding: 0, marginRight: "10px", cursor: "pointer", display: "flex", alignItems: "center" },
  headerTitle: { fontSize: "20px", fontWeight: "bold", color: "#0f172a" },
  mainWrapper: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "0 20px" },
  textBlock: { width: "55%" },
  name: { fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "#0f172a" },
  description: { fontSize: "13px", color: "#64748b", lineHeight: "1.4", marginBottom: "12px" },
  price: { fontSize: "14px", fontWeight: "700", color: "#0f172a" },
  imageBlock: { width: "45%", display: "flex", justifyContent: "center", alignItems: "center" },
  infoBox: { margin: "0 16px 12px 16px", padding: "10px", backgroundColor: "#f3e8ff", borderRadius: "8px", textAlign: "center", fontSize: "12px", fontWeight: "600", color: "#7e22ce" },
  cardRow: { display: "flex", gap: "8px", padding: "0 16px", paddingBottom: "16px", width: "100%" }, 
  card: { borderRadius: "16px", background: "#f8fafc", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", transition: "all 0.25s ease", cursor: "pointer" },
  circle: { position: "absolute", top: "8px", right: "8px", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, background: "#ffffff", borderTop: "1px solid #e2e8f0", padding: "12px 16px", zIndex: 10, borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' },
  pickText: { fontSize: "14px", fontWeight: "700", color: "#6b21a8", marginBottom: "8px" },
  buttonRow: { display: "flex", gap: "10px" },
  selectBtn: { flex: 1, border: "none", padding: "12px", borderRadius: "8px", color: "#fff", fontWeight: "bold", fontSize: "14px", cursor: "pointer", transition: "0.2s" },
  nextBtn: { flex: 1, border: "none", padding: "12px", borderRadius: "8px", color: "#fff", fontWeight: "bold", fontSize: "14px", cursor: "pointer", transition: "0.2s" },
};

export default InteractivePickbase;