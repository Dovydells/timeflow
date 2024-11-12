import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';

const MotivationalPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prompt, setPrompt] = useState('');
  const isActive = useSelector((state: RootState) => state.focus.isActive);

  const prompts = [
    'Stay focused! You\'re doing great!',
    'Keep up the momentum!',
    'You\'re making excellent progress!',
    'Every minute counts towards your goals!',
  ];

  useEffect(() => {
    if (isActive) {
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      setPrompt(randomPrompt);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setPrompt('');
    }
  }, [isActive]);

  return (
    <div className={`motivational-prompt ${isVisible ? 'visible' : ''}`} data-testid="motivational-prompt">
      <p data-testid="prompt-text">{prompt}</p>
    </div>
  );
};

export default MotivationalPrompt; 