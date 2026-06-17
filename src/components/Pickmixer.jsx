import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';

const Pickmixer = ({ mockMixers, pickedIds, togglePick, onBack, onNext }) => {
  const isNextDisabled = pickedIds.length === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      style={styles.page}
    >
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}><ArrowLeft size={24} color="#0f172a" /></button>
        <h2 style={styles.headerTitle}>Pick Your Mixers</h2>
      </div>

      <div style={styles.scrollContainer}>
        <div style={styles.grid}>
          {mockMixers.map((item) => {
            const picked = pickedIds.includes(item.id);

            return (
              <div key={item.id} style={styles.cardWrapper}>
                <div onClick={() => togglePick(item.id)}
                  style={{
                    ...styles.card, border: picked ? '2px solid #10b981' : '2px solid transparent',
                    boxShadow: picked ? '0 8px 20px rgba(16, 185, 129, 0.15)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
                    transform: picked ? 'scale(1.03)' : 'scale(1)',
                  }}
                >
                  <div style={{ ...styles.circle, backgroundColor: picked ? '#10b981' : '#fff', border: picked ? '2px solid #10b981' : '2px solid #cbd5e1' }}>
                    {picked && <Check size={12} color="#fff" strokeWidth={4} />}
                  </div>
                  <div style={styles.imageContainer}>{item.icon}</div>
                </div>
                <div style={styles.info}>
                  <p style={styles.name}>{item.name}</p>
                  <p style={styles.price}><strong>{(item.price / 16).toFixed(2)}฿ / oz</strong></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.bottomBar}>
        <button style={{ ...styles.nextButton, backgroundColor: isNextDisabled ? '#d1d5db' : '#6b21a8', cursor: isNextDisabled ? 'not-allowed' : 'pointer' }}
          onClick={onNext} disabled={isNextDisabled}>
          Next &gt;
        </button>
      </div>
    </motion.div>
  );
};

const styles = {
  page: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', position: 'relative', paddingBottom: '80px' },
  header: { display: "flex", alignItems: "center", padding: "40px 16px 0", flexShrink: 0 },
  backButton: { background: "none", border: "none", marginRight: "10px", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" },
  headerTitle: { fontSize: "20px", fontWeight: "bold", color: "#0f172a" },
  scrollContainer: { flex: 1, overflowY: 'auto', padding: '20px 16px', scrollbarWidth: 'none', msOverflowStyle: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', width: '100%' },
  cardWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  card: { position: 'relative', background: '#fff', borderRadius: '20px', padding: '12px', width: '100%', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', cursor: 'pointer', boxSizing: 'border-box' },
  circle: { position: "absolute", top: "8px", right: "8px", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 },
  imageContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' },
  info: { marginTop: '10px', textAlign: 'center' },
  name: { fontSize: '14px', fontWeight: '600', margin: '4px 0', color: '#0f172a' },
  price: { fontSize: '12px', margin: 0, color: '#64748b' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '12px 16px', zIndex: 10, borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' },
  nextButton: { color: 'white', padding: '12px', borderRadius: "12px", border: 'none', fontSize: '16px', fontWeight: 'bold', width: '100%', transition: '0.2s' },
};

export default Pickmixer;