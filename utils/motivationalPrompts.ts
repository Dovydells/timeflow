export const MOTIVATIONAL_CATEGORIES = {
  FOCUS: 'focus',
  PRODUCTIVITY: 'productivity',
  CREATIVITY: 'creativity',
  ENCOURAGEMENT: 'encouragement'
} as const;

type MotivationalCategory = typeof MOTIVATIONAL_CATEGORIES[keyof typeof MOTIVATIONAL_CATEGORIES];

interface MotivationalPrompt {
  text: string;
  category: MotivationalCategory;
}

export const motivationalPrompts: MotivationalPrompt[] = [
  // Focus prompts
  {
    text: "Stay focused! You're in the zone!",
    category: MOTIVATIONAL_CATEGORIES.FOCUS
  },
  {
    text: "Deep work leads to great results!",
    category: MOTIVATIONAL_CATEGORIES.FOCUS
  },
  
  // Productivity prompts
  {
    text: "Small progress is still progress!",
    category: MOTIVATIONAL_CATEGORIES.PRODUCTIVITY
  },
  {
    text: "You're getting things done - keep going!",
    category: MOTIVATIONAL_CATEGORIES.PRODUCTIVITY
  },
  
  // Creativity prompts
  {
    text: "Your creativity is flowing - let it guide you!",
    category: MOTIVATIONAL_CATEGORIES.CREATIVITY
  },
  {
    text: "Every creative project starts with a single idea!",
    category: MOTIVATIONAL_CATEGORIES.CREATIVITY
  },
  
  // Encouragement prompts
  {
    text: "You've got this! Keep pushing forward!",
    category: MOTIVATIONAL_CATEGORIES.ENCOURAGEMENT
  },
  {
    text: "Remember why you started - you're doing great!",
    category: MOTIVATIONAL_CATEGORIES.ENCOURAGEMENT
  }
];

export const getRandomPrompt = (category?: MotivationalCategory): string => {
  const availablePrompts = category 
    ? motivationalPrompts.filter(p => p.category === category)
    : motivationalPrompts;
    
  const index = Math.floor(Math.random() * availablePrompts.length);
  return availablePrompts[index].text;
};

export const showMotivationalPrompt = async (category?: MotivationalCategory) => {
  if (window.systemPermissions) {
    const prompt = getRandomPrompt(category);
    await window.systemPermissions.sendSystemNotification(
      'TimeFlow Motivation',
      prompt,
      {
        timeout: 5000,
        sound: true,
        actionButtons: [
          {
            text: 'Keep Going!',
            action: () => console.log('User acknowledged motivation')
          }
        ]
      }
    );
    return prompt;
  }
};

export const getContextualPrompt = (context: {
  taskType?: string;
  timeSpent?: number;
  isCreativeApp?: boolean;
}): string => {
  const { taskType, timeSpent, isCreativeApp } = context;
  
  if (isCreativeApp) {
    return getRandomPrompt(MOTIVATIONAL_CATEGORIES.CREATIVITY);
  }
  
  if (timeSpent && timeSpent > 60) { // More than 60 minutes
    return getRandomPrompt(MOTIVATIONAL_CATEGORIES.FOCUS);
  }
  
  if (taskType === 'pending') {
    return getRandomPrompt(MOTIVATIONAL_CATEGORIES.ENCOURAGEMENT);
  }
  
  return getRandomPrompt(MOTIVATIONAL_CATEGORIES.PRODUCTIVITY);
}; 