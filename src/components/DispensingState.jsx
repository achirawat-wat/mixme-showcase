import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DispensingState = ({ isDevMode }) => {
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFinished(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const styles = getStyles(isDevMode);

  return (
    <div style={styles.container}>
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="dispensing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.content}
          >
            <div style={styles.dispenserHead}>
              <div style={styles.nozzle} />

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 130 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3
                }}
                style={styles.waterStream}
              />
            </div>

            <div style={styles.cupContainer}>
              <div style={styles.cupOutline}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '80%' }}
                  transition={{
                    duration: 3,
                    ease: 'linear',
                    delay: 0.3
                  }}
                  style={styles.liquid}
                />

                <motion.div
                  animate={{ y: [-5, -20, -5] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2
                  }}
                  style={{
                    ...styles.bubble,
                    left: 25,
                    bottom: 25
                  }}
                />

                <motion.div
                  animate={{ y: [-10, -30, -10] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8
                  }}
                  style={{
                    ...styles.bubble,
                    left: 60,
                    bottom: 35,
                    width: 8,
                    height: 8
                  }}
                />
              </div>
            </div>

            <motion.p
              animate={{
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5
              }}
              style={styles.text}
            >
              Mixing your drink...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              type: 'spring',
              stiffness: 120
            }}
            style={styles.finishedContainer}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: 'spring'
              }}
              style={styles.successIcon}
            >
              ✓
            </motion.div>

            <div style={styles.cupContainer}>
              <motion.div
                animate={{
                  y: [0, -12, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: 'easeInOut'
                }}
              >
                <div style={styles.cupOutline}>
                  <div
                    style={{
                      ...styles.liquid,
                      height: '80%'
                    }}
                  />
                </div>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={styles.successTitle}
            >
              Mix Complete
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={styles.successText}
            >
              Enjoy your custom drink 🍹
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getStyles = (isDevMode) => ({
  container: {
    width: '100%',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  finishedContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24
  },

  dispenserHead: {
    width: 90,
    height: 50,
    background: isDevMode ? 'linear-gradient(180deg,#334155,#1e293b)' : 'linear-gradient(180deg,#f8fafc,#cbd5e1)',
    border: isDevMode ? '1px solid #475569' : '1px solid #e2e8f0',
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: '0 10px 30px rgba(15,23,42,0.08)'
  },

  nozzle: {
    width: 16,
    height: 18,
    background: isDevMode ? '#64748b' : '#94a3b8',
    margin: '0 auto',
    borderRadius: '0 0 6px 6px'
  },

  waterStream: {
    width: 10,
    background: 'linear-gradient(180deg,#7dd3fc,#38bdf8)',
    margin: '0 auto',
    borderRadius: 999,
    boxShadow: '0 0 25px rgba(56,189,248,0.6)'
  },

  cupContainer: {
    position: 'relative',
    marginTop: 10
  },

  cupOutline: {
    width: 140,
    height: 200,
    border: isDevMode ? '4px solid #475569' : '4px solid #cbd5e1',
    borderTop: 'none',
    borderRadius: '0 0 20px 20px',
    position: 'relative',
    overflow: 'hidden',
    background: isDevMode ? 'rgba(30,41,59,0.7)' : 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(8px)',
    boxShadow: isDevMode 
      ? '0 20px 40px rgba(0,0,0,0.5)' 
      : '0 20px 40px rgba(15,23,42,0.08), 0 0 30px rgba(56,189,248,0.15)'
  },

  liquid: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    background: 'linear-gradient(180deg,#7dd3fc,#38bdf8,#0284c7)',
    boxShadow: '0 0 35px rgba(56,189,248,0.5)'
  },

  bubble: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: isDevMode ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.95)',
    border: '1px solid rgba(148,163,184,0.3)',
    zIndex: 5
  },

  text: {
    marginTop: 32,
    // เปลี่ยนเป็นสีเขียว Terminal พร้อมเรืองแสงตอนเปิด Dev Mode
    color: isDevMode ? '#4ade80' : '#0f172a',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 1,
    textShadow: isDevMode ? '0 0 10px rgba(74,222,128,0.4)' : 'none',
    fontFamily: isDevMode ? '"Courier New", monospace' : 'inherit'
  },

  successIcon: {
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: 'linear-gradient(135deg,#38bdf8,#0ea5e9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 42,
    fontWeight: 900,
    color: '#fff',
    boxShadow: '0 15px 40px rgba(56,189,248,0.35)'
  },

  successTitle: {
    margin: 0,
    // เปลี่ยนเป็นสีเขียว Terminal พร้อมเรืองแสงตอนเปิด Dev Mode
    color: isDevMode ? '#4ade80' : '#0f172a',
    fontSize: 56,
    fontWeight: 900,
    textAlign: 'center',
    letterSpacing: '-0.04em',
    textShadow: isDevMode ? '0 0 15px rgba(74,222,128,0.4)' : 'none',
    fontFamily: isDevMode ? '"Courier New", monospace' : 'inherit'
  },

  successText: {
    margin: 0,
    color: isDevMode ? '#94a3b8' : '#64748b',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: isDevMode ? '"Courier New", monospace' : 'inherit'
  }
});

export default DispensingState;