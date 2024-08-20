import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <motion.div
      className="w-64 h-40 cursor-pointer perspective"
      onClick={handleFlip}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-full h-full rounded-lg shadow-lg bg-white flex items-center justify-center p-4 text-center"
        initial={false}
        // animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {isFlipped ? (
          <div className="transform rotate-y-180">
            <p className="text-lg font-semibold ">
              <b style={
                { color: '#ff0000' }
              }>
                Answer:</b> <br />
              {back}</p>
          </div>
        ) : (
          <p className="text-lg font-semibold">
            <b style={
               { color: 'green' }
            }
            >Question:</b> <br />
            {front}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Flashcard;
