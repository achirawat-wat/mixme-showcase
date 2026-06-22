import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, GlassWater, Martini, CupSoda, Droplet, Droplets } from 'lucide-react';

import InteractivePickbase from './InteractivePickbase';
import Pickmixer from './Pickmixer';
import Mix from './Mix';
import Checkout from './Checkout';
import DispensingState from './DispensingState';

const MOCK_ALCOHOLS = [
  {
    id: 'A1',
    name: 'Vodka Base',
    description: 'Smooth and clear.',
    price: 40,
    color: '#e0f2fe',
    icon: <GlassWater size={110} color="#38bdf8" strokeWidth={1.5} />
  },
  {
    id: 'A2',
    name: 'Rum Base',
    description: 'Sweet and rich flavor.',
    price: 45,
    color: '#f59e0b',
    icon: <Wine size={110} color="#f59e0b" strokeWidth={1.5} />
  },
  {
    id: 'A3',
    name: 'Gin Base',
    description: 'Botanical and refreshing.',
    price: 50,
    color: '#34d399',
    icon: <Martini size={110} color="#10b981" strokeWidth={1.5} />
  }
];

const MOCK_MIXERS = [
  {
    id: 'M1',
    name: 'Cola',
    price: 20,
    color: '#78350f',
    icon: <CupSoda size={50} color="#78350f" strokeWidth={1.5} />
  },
  {
    id: 'M2',
    name: 'Soda Water',
    price: 15,
    color: '#bae6fd',
    icon: <Droplets size={50} color="#38bdf8" strokeWidth={1.5} />
  },
  {
    id: 'M3',
    name: 'Tonic',
    price: 25,
    color: '#818cf8',
    icon: <GlassWater size={50} color="#818cf8" strokeWidth={1.5} />
  },
  {
    id: 'M4',
    name: 'Orange Juice',
    price: 30,
    color: '#f97316',
    icon: <Droplet size={50} color="#f97316" strokeWidth={1.5} />
  }
];

const ALL_INGREDIENTS = [...MOCK_ALCOHOLS, ...MOCK_MIXERS];

const InteractiveMixer = ({ isDevMode }) => {
  const [step, setStep] = useState(0);

  const [activeId, setActiveId] = useState(MOCK_ALCOHOLS[0].id);
  const [pickedIds, setPickedIds] = useState([]);
  const [pickedMixers, setPickedMixers] = useState([]);

  const togglePick = (id) => {
    setPickedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleMixer = (id) => {
    setPickedMixers((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const handleFinish = () => {
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={isDevMode ? styles.devWelcomeContainer : styles.appleWelcomeContainer}>
            {!isDevMode ? (
              // โหมดปกติ: Apple Aesthetic เรียบหรู คลีนๆ
              <>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
                  style={styles.appleIconBox}
                >
                  <GlassWater size={36} color="#1d1d1f" strokeWidth={1.5} />
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  style={styles.appleTitle}
                >
                  MixMe.
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={styles.appleSubtitle}
                >
                  The future of beverage automation, <br/> right in your hands.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  onClick={() => setStep(1)}
                  style={styles.appleBtn}
                >
                  Start Mixing
                </motion.button>
              </>
            ) : (
              // Dev Mode: Pure Terminal แบบไม่มีแถบด้านบน
              <div style={styles.macTerminalWindow}>
                <div style={styles.macTerminalBody}>
                  <p style={styles.devLine}><span style={{color: '#94a3b8'}}>Loading kernel modules...</span> [OK]</p>
                  <p style={styles.devLine}><span style={{color: '#94a3b8'}}>Mounting ESP32 peripheral...</span> [ONLINE]</p>
                  <p style={styles.devLine}><span style={{color: '#94a3b8'}}>Connecting Supabase DB...</span> [ACTIVE]</p>
                  <br/>
                  <p style={styles.devLine}><span style={{color: '#38bdf8'}}>System is ready.</span></p>
                  
                  <div style={styles.devCursorLine}>
                    <span>admin@mixme:~$ </span>
                    <motion.span 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ repeat: Infinity, duration: 1 }}
                      style={styles.devCursor}
                    />
                  </div>

                  <motion.button
                    whileHover={{ backgroundColor: "rgba(74, 222, 128, 0.1)" }}
                    onClick={() => setStep(1)}
                    style={styles.devWelcomeBtn}
                  >
                    &gt; RUN INTERFACE
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <InteractivePickbase
            mockAlcohols={MOCK_ALCOHOLS}
            activeId={activeId}
            setActiveId={setActiveId}
            pickedIds={pickedIds}
            togglePick={togglePick}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        );

      case 2:
        return (
          <Pickmixer
            mockMixers={MOCK_MIXERS}
            pickedIds={pickedMixers}
            togglePick={toggleMixer}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        );

      case 3:
        return (
          <Mix
            pickedAlcohols={pickedIds}
            pickedMixers={pickedMixers}
            allIngredients={ALL_INGREDIENTS}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        );

      case 4:
        return (
          <Checkout
            onFinish={handleFinish}
          />
        );

      default:
        return null;
    }
  };

  const getSqlSnippet = () => {
    switch (step) {
      case 0:
        return "CONNECT 'postgres://mixme_db';"; 
      case 1:
        return "SELECT * FROM ingredients;";
      case 2:
        return "SELECT * FROM mixers;";
      case 3:
        return "CREATE TABLE orders (id UUID);";
      case 4:
        return "INSERT INTO tx (slip) VALUES ($1);";
      default:
        return "EXECUTE dispensing_protocol();";
    }
  };

  if (step === 5) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <DispensingState isDevMode={isDevMode} />
      </motion.div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Dev Mode Code Popup */}
      {isDevMode && (
        <motion.div
          className="code-popup mobile-code"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={step}
          style={{
            position: 'absolute',
            top: '-55px',
            left: '0px',
            background: '#111827',
            color: '#38bdf8',
            padding: '8px 14px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px',
            border: '1px solid #1f2937',
            zIndex: 20,
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            
            width: 'fit-content',
            minWidth: '220px',
            maxWidth: '340px', 
            whiteSpace: 'nowrap', 
          }}
        >
          <code>{`> ${getSqlSnippet()}`}</code>
        </motion.div>
      )}

      <motion.div
        className="mobile-mockup"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <div className="mobile-notch" />

        <div
          className="mobile-screen"
          style={{
            backgroundColor: isDevMode && step === 0 ? '#000000' : '#ffffff',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ width: '100%', height: '100%' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 480px) {
          .code-popup {
            font-size: 11px !important;
            padding: 6px 10px !important;
            top: -45px !important;
            max-width: 280px !important;
          }
        }
      `}</style>
    </div>
  );
};

// ==========================================
// สไตล์เฉพาะสำหรับหน้า Welcome (State 0)
// ==========================================
const styles = {
  // --- Apple Aesthetic (Light Mode) ---
  appleWelcomeContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
    textAlign: 'center',
    backgroundColor: '#fbfbfd',
    color: '#1d1d1f',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
  },
  appleIconBox: {
    width: '80px',
    height: '80px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)',
    marginBottom: '24px'
  },
  appleTitle: {
    fontSize: '32px',
    fontWeight: '700',
    letterSpacing: '-0.03em',
    margin: '0 0 8px 0',
    color: '#1d1d1f'
  },
  appleSubtitle: {
    fontSize: '15px',
    color: '#86868b',
    lineHeight: '1.4',
    marginBottom: '40px',
    fontWeight: '400'
  },
  appleBtn: {
    backgroundColor: '#1d1d1f',
    color: '#ffffff',
    border: 'none',
    borderRadius: '980px',
    padding: '16px 36px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },

  // --- Pure Terminal (Dev Mode) ---
  devWelcomeContainer: {
    height: '100%',
    backgroundColor: '#000000',
    paddingTop: '45px', // ดันเนื้อหาลงมาให้พ้นรอยบาก (Notch)
  },
  macTerminalWindow: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  // ลบ macTerminalHeader ออกไปแล้ว
  macTerminalBody: {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Courier New", monospace',
    fontSize: '13px',
    color: '#4ade80',
    lineHeight: '1.6'
  },
  devLine: {
    margin: 0,
    whiteSpace: 'nowrap'
  },
  devCursorLine: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '12px'
  },
  devCursor: {
    display: 'inline-block',
    width: '8px',
    height: '15px',
    backgroundColor: '#4ade80',
    marginLeft: '6px'
  },
  devWelcomeBtn: {
    width: '100%',
    padding: '14px',
    background: 'transparent',
    color: '#4ade80',
    border: '1px dashed #4ade80',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: 'auto', // ดันปุ่มไปล่างสุดของจอ
    marginBottom: '20px'
  }
};

export default InteractiveMixer;