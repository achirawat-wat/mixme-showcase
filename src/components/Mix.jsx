import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const Mix = ({ pickedAlcohols, pickedMixers, allIngredients, onBack, onNext }) => {
  const [ingredients, setIngredients] = useState([]);
  const [percentages, setPercentages] = useState({});

  useEffect(() => {
    const ids = [...pickedAlcohols, ...pickedMixers];
    if (ids.length === 0) return;

    const data = allIngredients.filter(item => ids.includes(item.id));
    const alcoholSet = new Set(pickedAlcohols);
    const sortedData = [...data].sort((a, b) => (alcoholSet.has(a.id) ? -1 : 1));

    setIngredients(sortedData);
    
    // ตั้งค่าเริ่มต้น: Alcohol 10%, Mixer 90%
    const newPercentages = {};
    const numAlc = pickedAlcohols.length;
    const numMix = pickedMixers.length;

    // ตรวจสอบสัดส่วน (เผื่อกรณีเลือกแค่ Alcohol หรือแค่ Mixer อย่างเดียว)
    let totalAlcPct = (numAlc > 0 && numMix > 0) ? 10 : (numAlc > 0 ? 100 : 0);
    let totalMixPct = (numMix > 0 && numAlc > 0) ? 90 : (numMix > 0 ? 100 : 0);

    let currentAlc = totalAlcPct;
    let currentMix = totalMixPct;
    let alcIndex = 0;
    let mixIndex = 0;

    sortedData.forEach((item) => {
      if (alcoholSet.has(item.id)) {
        alcIndex++;
        const pct = Math.floor(totalAlcPct / numAlc);
        // อันสุดท้ายของกลุ่มให้เอาเศษที่เหลือไปบวกเลย เพื่อให้รวมได้ 10% เป๊ะ
        const finalPct = (alcIndex === numAlc) ? currentAlc : pct;
        newPercentages[item.id] = finalPct;
        currentAlc -= finalPct;
      } else {
        mixIndex++;
        const pct = Math.floor(totalMixPct / numMix);
        // อันสุดท้ายของกลุ่มให้เอาเศษที่เหลือไปบวกเลย เพื่อให้รวมได้ 90% เป๊ะ
        const finalPct = (mixIndex === numMix) ? currentMix : pct;
        newPercentages[item.id] = finalPct;
        currentMix -= finalPct;
      }
    });

    setPercentages(newPercentages);
  }, [pickedAlcohols, pickedMixers, allIngredients]);

  const adjustPercentage = (id, delta) => {
    const current = percentages[id] || 0;
    const target = current + delta;
    if (target > 100 || target < 0) return;

    const totalBefore = Object.values(percentages).reduce((a, b) => a + b, 0);
    const totalAfter = totalBefore + delta;
    const overflow = totalAfter - 100;

    if (overflow === 0) {
      setPercentages(prev => ({ ...prev, [id]: target }));
      return;
    }

    const newPercentages = { ...percentages };
    const otherIds = ingredients.map(item => item.id).filter(otherId => otherId !== id);
    const sortedOthers = otherIds.map(oid => ({ oid, value: newPercentages[oid] || 0 })).sort((a, b) => b.value - a.value);

    let remaining = overflow;
    for (const other of sortedOthers) {
      if (remaining > 0) {
        const available = Math.min(newPercentages[other.oid], remaining);
        newPercentages[other.oid] -= available;
        remaining -= available;
      } else if (remaining < 0) {
        const needed = Math.abs(remaining);
        newPercentages[other.oid] += needed;
        remaining += needed;
      }
      if (remaining === 0) break;
    }
    if (remaining !== 0) return;
    newPercentages[id] = target;
    setPercentages(newPercentages);
  };

  const getTotalPrice = () => ingredients.reduce((sum, item) => sum + (item.price * (percentages[item.id] || 0)) / 100, 0).toFixed(2);

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}><ArrowLeft size={24} color="#0f172a" /></button>
        <h2 style={styles.headerTitle}>Customize</h2>
      </div>

      {/* Glass Preview */}
      <div style={styles.glassFixed}>
        <div style={styles.glassWrapper}>
          <div style={styles.glassOutline} />
          <div style={styles.glassContent}>
            {ingredients.map((item) => {
              const height = ((percentages[item.id] || 0) / 100) * 220;
              return <div key={item.id} style={{ height, backgroundColor: item.color || '#ccc', transition: 'height 0.3s ease' }} />;
            })}
          </div>
        </div>
      </div>

      <div style={styles.scrollArea}>
        {ingredients.map(item => (
          <div key={item.id} style={styles.card}>
            <div style={styles.cardLeft}>
              <div style={{ ...styles.colorDot, backgroundColor: item.color || '#ccc' }} />
              <div style={styles.itemName}>{item.name}</div>
            </div>
            <div style={styles.cardRight}>
              <button onClick={() => adjustPercentage(item.id, -1)} style={styles.adjustButton}>-</button>
              <span style={styles.percentValue}>{percentages[item.id] || 0}%</span>
              <button onClick={() => adjustPercentage(item.id, 1)} style={styles.adjustButton}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* ปุ่มกดไปหน้า Checkout */}
      <div style={styles.bottomBar}>
        <button style={styles.nextButton} onClick={onNext}>
          Price {getTotalPrice()} ฿ &gt;
        </button>
      </div>
    </motion.div>
  );
};

const styles = {
  container: { height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', position: 'relative' },
  header: { display: 'flex', alignItems: 'center', padding: '40px 16px 0', flexShrink: 0 },
  backButton: { background: 'none', border: 'none', marginRight: '10px', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' },
  headerTitle: { fontSize: '20px', fontWeight: 'bold', color: '#0f172a' },
  glassFixed: { display: 'flex', justifyContent: 'center', padding: '20px 0 10px 0' },
  glassWrapper: { height: 220, width: 160, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' },
  glassOutline: { position: 'absolute', bottom: 0, width: 160, height: 220, clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)', border: '3px solid #444', borderRadius: '12px', backgroundColor: 'rgba(0,0,0,0.05)' },
  glassContent: { position: 'relative', width: '100%', height: '100%', clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)', display: 'flex', flexDirection: 'column-reverse' },
  scrollArea: { flex: 1, overflowY: 'auto', padding: '0 16px', marginBottom: '16px' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' },
  cardLeft: { display: 'flex', alignItems: 'center', gap: '12px', flex: 1 },
  colorDot: { width: '14px', height: '14px', borderRadius: '50%' },
  // ล็อกสีตัวอักษรให้เป็นสีเข้มเสมอ ไม่ว่าจะอยู่ในโหมดไหน
  itemName: { fontSize: '14px', fontWeight: '600', color: '#0f172a' },
  cardRight: { display: 'flex', alignItems: 'center' },
  // ล็อกสี % เป็นสีเข้ม
  percentValue: { width: 40, textAlign: 'center', fontWeight: 'bold', color: '#0f172a' },
  // ล็อกสีปุ่มและสีตัวอักษรในปุ่มให้เป็นสีเข้ม
  adjustButton: { padding: '4px 12px', background: '#f1f5f9', color: '#0f172a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  bottomBar: { background: '#ffffff', padding: '12px 16px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' },
  nextButton: { width: '100%', fontSize: '16px', backgroundColor: '#6b21a8', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
};

export default Mix;