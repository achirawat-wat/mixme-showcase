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
  const [step, setStep] = useState(1);

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
      case 1:
        return (
          <InteractivePickbase
            mockAlcohols={MOCK_ALCOHOLS}
            activeId={activeId}
            setActiveId={setActiveId}
            pickedIds={pickedIds}
            togglePick={togglePick}
            onNext={() => setStep(2)}
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

  // ฟังก์ชันดึงคำสั่ง SQL สั้นๆ ตาม Step
  const getSqlSnippet = () => {
    switch (step) {
      case 1:
        return "> SELECT * FROM ingredients WHERE type = 'alcohol';";
      case 2:
        return "> SELECT * FROM ingredients WHERE type = 'mixer';";
      case 3:
        return "> CREATE TABLE orders (id UUID, recipe JSONB);";
      case 4:
        return "> INSERT INTO transactions (slip_img) VALUES ($1);";
      default:
        return "> EXECUTE dispensing_protocol();";
    }
  };

  if (step === 5) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* สำคัญมาก: ต้องส่ง prop isDevMode เข้าไปด้วยครับ */}
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
          key={step} // ใส่ key ให้มัน animate ใหม่ทุกครั้งที่เปลี่ยน step
          style={{
            position: 'absolute',
            top: '-50px',
            left: '0px',
            background: '#111827',
            color: '#38bdf8', /* เปลี่ยนสีตัวหนังสือเป็นสีฟ้าให้ดูเหมือน syntax highlight */
            padding: '8px 14px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '13px',
            border: '1px solid #1f2937',
            zIndex: 20,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}
        >
          <code>{getSqlSnippet()}</code>
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
            backgroundColor: '#ffffff',
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
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveMixer;