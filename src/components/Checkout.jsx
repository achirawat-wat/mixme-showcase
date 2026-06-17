import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, Loader2, Receipt } from 'lucide-react';

const Checkout = ({ onFinish }) => {
  const [status, setStatus] = useState('idle');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleUploadSimulation = () => {
    setStatus('uploading');
    setTimeout(() => setStatus('verified'), 1500);
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      // เมื่อกดเสร็จสิ้น ให้ส่งสัญญาณไปที่ Component แม่
      onFinish(); 
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
      style={styles.page}
    >
      {/* เอาปุ่ม Back ออกตามคำขอ */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Checkout</h2>
      </div>

      <div style={styles.scrollContainer}>
        <div style={styles.amountCard}>
          <p style={styles.amountLabel}>Total Amount</p>
          <h1 style={styles.amountText}>125.00 ฿</h1>
        </div>

        <div style={styles.qrWrapper}>
          <img src="https://promptpay.io/0885199551/125.00.png" alt="QR" style={styles.qrImage} />
          <p style={styles.hintText}>Scan to pay</p>
        </div>

        <div style={styles.uploadSection}>
          <label style={styles.uploadLabel}>Payment Slip</label>
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.button key="idle" style={styles.fileInputLabel} onClick={handleUploadSimulation} whileTap={{ scale: 0.95 }}>
                <Upload size={18} /> Tap to upload slip
              </motion.button>
            )}
            {status === 'uploading' && (
              <motion.div key="uploading" style={styles.loadingSlip}><Loader2 className="animate-spin" size={20} /> Processing...</motion.div>
            )}
            {status === 'verified' && (
              <motion.div key="verified" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.successSlip}>
                <Check size={18} /> Verified
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <button 
          style={{ ...styles.confirmButton, backgroundColor: (isConfirming || status !== 'verified') ? '#cbd5e1' : '#6b21a8' }} 
          onClick={handleConfirm} disabled={isConfirming || status !== 'verified'}
        >
          {isConfirming ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : <>Confirm Order <Check size={18} /></>}
        </button>
      </div>
    </motion.div>
  );
};

const styles = {
  page: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', position: 'relative', overflow: 'hidden' },
  header: { padding: "40px 16px 10px", flexShrink: 0 },
  headerTitle: { fontSize: "20px", fontWeight: "bold", color: "#0f172a", margin: 0 },
  scrollContainer: { flex: 1, overflowY: 'auto', padding: '0 16px 80px', textAlign: 'center', scrollbarWidth: 'none' },
  amountCard: { background: '#fff', borderRadius: '12px', padding: '15px', marginBottom: '15px', border: '1px solid #e5e7eb' },
  amountLabel: { color: '#6b7280', margin: 0, fontSize: '12px' },
  amountText: { color: '#111827', margin: '2px 0 0', fontSize: '24px', fontWeight: 'bold' },
  qrWrapper: { background: '#fff', padding: '12px', borderRadius: '16px', marginBottom: '15px' },
  qrImage: { width: '150px', height: '150px', margin: '0 auto', display: 'block' },
  hintText: { fontSize: '11px', color: '#64748b', marginTop: '6px' },
  uploadSection: { textAlign: 'left' },
  uploadLabel: { fontSize: '13px', fontWeight: '600', marginBottom: '6px', display: 'block', color: '#374151' },
  fileInputLabel: { display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', padding: '12px', background: '#fff', border: '2px dashed #a855f7', borderRadius: '10px', color: '#9333ea', fontSize: '13px', fontWeight: '600', cursor: 'pointer', width: '100%' },
  loadingSlip: { padding: '12px', background: '#f3f4f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' },
  successSlip: { padding: '12px', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #d1fae5', color: '#059669', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, background: '#ffffff', padding: '12px 16px', zIndex: 10 },
  confirmButton: { width: '100%', padding: '12px', borderRadius: '10px', border: 'none', color: '#fff', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }
};

export default Checkout;