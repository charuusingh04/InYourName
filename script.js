/**
 * CHARU'S ROMANTIC MEDICAL BIRTHDAY WEBSITE
 * Shared JavaScript for all pages
 * Features: Routing, State Management, Animations, Hidden Page Unlock
 */

// ============================================
// STATE MANAGEMENT
// ============================================

const AppState = {
  // User responses to landing page questions
  questions: {
    q1: false, // Are you Dr. Charu?
    q2: false, // Is today her birthday?
    q3: false  // Are you ready?
  },

  // Hidden page unlock system
  hiddenPageClicks: 0,
  hiddenPageUnlocked: false,

  // Music toggle state
  musicPlaying: false,

  /**
   * Initialize app state from localStorage
   */
  init() {
    const saved = localStorage.getItem('charuAppState');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.hiddenPageUnlocked = parsed.hiddenPageUnlocked || false;
      this.musicPlaying = parsed.musicPlaying || false;
    }
    this.save();
  },

  /**
   * Save state to localStorage
   */
  save() {
    const state = {
      hiddenPageUnlocked: this.hiddenPageUnlocked,
      musicPlaying: this.musicPlaying
    };
    localStorage.setItem('charuAppState', JSON.stringify(state));
  },

  /**
   * Answer a question and check if all are answered
   */
  answerQuestion(questionNum, answer) {
    this.questions[`q${questionNum}`] = answer;
    return this.allQuestionsAnswered();
  },

  /**
   * Check if all 3 questions are answered with "yes"
   */
  allQuestionsAnswered() {
    return this.questions.q1 && this.questions.q2 && this.questions.q3;
  },

  /**
   * Increment hidden page click counter and check if unlocked
   */
  clickHiddenHeart() {
    this.hiddenPageClicks++;
    if (this.hiddenPageClicks >= 7 && !this.hiddenPageUnlocked) {
      this.unlockHiddenPage();
      return true;
    }
    return false;
  },

  /**
   * Unlock the secret love letter page
   */
  unlockHiddenPage() {
    this.hiddenPageUnlocked = true;
    this.save();
    return true;
  },

  /**
   * Reset hidden page clicks (when navigating away)
   */
  resetHiddenPageClicks() {
    this.hiddenPageClicks = 0;
  }
};

// ============================================
// AUDIO MANAGEMENT
// ============================================

const AudioManager = {
  audio: null,
  isPlaying: false,

  /**
   * Initialize audio element and load music
   */
  init() {
    const audioUrl = 'https://pixabay.com/api/download/29105195/?filename=romantic-instrumental-piano.mp3';
    // Fallback to a working royalty-free music URL
    const fallbackUrl = 'data:audio/wav;base64,UklGRi4AAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==';

    if (!this.audio) {
      this.audio = document.createElement('audio');
      this.audio.id = 'background-music';
      this.audio.loop = true;
      this.audio.volume = 0.3;
      this.audio.autoplay = true;

      // Try to load music - using a more reliable fallback approach
      // In production, replace with actual hosted audio file
      this.audio.src = 'music/background.mp3'; // Update path if using local file
      document.body.appendChild(this.audio);
    }

    // Restore music state from AppState
    this.isPlaying = AppState.musicPlaying;
    
    // If music should be playing, unmute and start playback
    if (this.isPlaying) {
      this.audio.muted = false;
      this.audio.play().catch(err => {
        console.log('Audio playback failed:', err);
      });
    } else {
      // Keep muted if music is off
      this.audio.muted = true;
    }
    
    this.updateToggleUI();
  },

  /**
   * Toggle music play/pause
   */
  toggle() {
    if (!this.audio) {
      this.init();
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },

  /**
   * Play music
   */
  play() {
    if (this.audio && this.audio.src) {
      this.audio.muted = false; // Unmute when playing
      this.audio.play().catch(err => {
        console.log('Audio playback failed:', err);
        // Graceful fallback - audio may not be available
      });
      this.isPlaying = true;
      AppState.musicPlaying = true;
      AppState.save();
      this.updateToggleUI();
    }
  },

  /**
   * Pause music
   */
  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      AppState.musicPlaying = false;
      AppState.save();
      this.updateToggleUI();
    }
  },

  /**
   * Update music toggle button UI
   */
  updateToggleUI() {
    const toggle = document.querySelector('.music-toggle');
    if (toggle) {
      if (this.isPlaying) {
        toggle.classList.add('playing');
        toggle.textContent = '🎵';
        toggle.title = 'Music Playing - Click to mute';
      } else {
        toggle.classList.remove('playing');
        toggle.textContent = '🔇';
        toggle.title = 'Music Muted - Click to play';
      }
    }
  }
};

// ============================================
// ANIMATION UTILITIES
// ============================================

const Animations = {
  /**
   * Generate random floating hearts
   */
  createFloatingHearts(container, count = 10) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-10px';

        if (container) {
          container.appendChild(heart);
          setTimeout(() => heart.remove(), 4000);
        }
      }, i * 200);
    }
  },

  /**
   * Generate confetti animation
   */
  createConfetti(container) {
    const confettiCount = 50;
    const colors = ['#FFD6E8', '#FFAAD4', '#FF99C5', '#4A9B9E', '#B4D7E8'];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.textContent = ['🎉', '✨', '💖', '🎊', '⭐'][i % 5];
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
      confetti.style.opacity = '1';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '100';

      const angle = (Math.random() - 0.5) * 60;
      const duration = Math.random() * 2 + 2.5;

      if (angle < -15) {
        confetti.style.animation = `confettiFallLeft ${duration}s ease-in forwards`;
      } else if (angle > 15) {
        confetti.style.animation = `confettiFallRight ${duration}s ease-in forwards`;
      } else {
        confetti.style.animation = `confettiFall ${duration}s ease-in forwards`;
      }

      if (container) {
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), duration * 1000);
      }
    }
  },

  /**
   * Trigger heartbeat vibration (if supported)
   */
  vibrate(pattern = [200, 100, 200]) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  },

  /**
   * Add fade-in animation to element
   */
  fadeIn(element, delay = 0) {
    if (!element) return;
    element.style.opacity = '0';
    setTimeout(() => {
      element.classList.add('fade-in');
      element.style.opacity = '1';
    }, delay);
  },

  /**
   * Stagger animation for multiple elements
   */
  staggerElements(elements, delay = 100) {
    elements.forEach((el, index) => {
      el.style.animationDelay = (index * delay / 1000) + 's';
      el.classList.add('slide-in-up');
    });
  }
};

// ============================================
// PAGE INITIALIZATION & ROUTING
// ============================================

/**
 * Initialize navigation and event listeners
 */
function initializeNavigation() {
  const musicToggle = document.querySelector('.music-toggle');
  if (musicToggle) {
    musicToggle.addEventListener('click', () => {
      AudioManager.toggle();
    });
    AudioManager.updateToggleUI();
  }

  // Initialize AudioManager
  AudioManager.init();
}

/**
 * Initialize page-specific content
 */
function initializePageContent() {
  const pageName = document.body.getAttribute('data-page');

  switch (pageName) {
    case 'landing':
      initializeLandingPage();
      break;
    case 'birthday':
      initializeBirthdayPage();
      break;
    case 'love-report':
      initializeLoveReportPage();
      break;
    case 'memories':
      initializeMemoriesPage();
      break;
    case 'reasons':
      initializeReasonsPage();
      break;
    case 'future':
      initializeFuturePage();
      break;
    case 'heart-monitor':
      initializeHeartMonitorPage();
      break;
    case 'forever':
      initializeForeverPage();
      break;
    case 'secret-letter':
      initializeSecretLetterPage();
      break;
  }
}

/**
 * Landing Page - Quiz Modal
 */

// Global state for question flow
let quizState = {
  questionsData: [
    {
      question: 'Are you Dr. Charu, the most beautiful doctor in the world?',
      num: 1
    },
    {
      question: 'Is today the birthday of the girl who unknowingly stole someone\'s heart?',
      num: 2
    },
    {
      question: 'Are you ready to see the medical report of someone deeply in love with you?',
      num: 3
    }
  ],
  currentQuestion: 0,
  isProcessing: false
};

/**
 * Global function to handle question answers
 */
window.answerQuestion = function(answer) {
  console.log('answerQuestion called with:', answer, 'Current question:', quizState.currentQuestion);
  
  if (quizState.isProcessing) return; // Prevent double clicks
  quizState.isProcessing = true;
  
  setTimeout(() => {
    quizState.isProcessing = false;
  }, 500);

  if (!answer) {
    // Reset if any answer is No
    console.log('Answer was NO - resetting all');
    quizState.currentQuestion = 0;
    AppState.questions = { q1: false, q2: false, q3: false };
    showLandingQuestion();
    return;
  }

  // Answer is YES
  const num = quizState.currentQuestion + 1;
  console.log('Answer was YES for question', num);
  AppState.answerQuestion(num, answer);
  quizState.currentQuestion++;
  
  // Small delay to show the progression
  setTimeout(() => {
    showLandingQuestion();
  }, 300);
};

/**
 * Show current question in landing page
 */
function showLandingQuestion() {
  console.log('showLandingQuestion - Current question index:', quizState.currentQuestion, 'Total questions:', quizState.questionsData.length);
  
  if (quizState.currentQuestion >= quizState.questionsData.length) {
    // All questions answered
    console.log('All questions answered - Checking if all are YES');
    if (AppState.allQuestionsAnswered()) {
      console.log('All questions answered with YES - showing checkup button');
      showCheckupButton();
      // Don't autoplay music - browser policy requires user interaction
      // Music will play when user clicks the music toggle button
    }
    return;
  }

  const data = quizState.questionsData[quizState.currentQuestion];
  const modal = document.getElementById('questions-modal');
  
  if (!modal) {
    console.error('Modal not found!');
    return;
  }

  const modalContent = modal.querySelector('.modal');
  if (!modalContent) {
    console.error('Modal content not found!');
    return;
  }
  
  console.log('Displaying question', data.num, ':', data.question);
  
  // Build HTML with data attributes for event delegation
  modalContent.innerHTML = `
    <h2>Question ${data.num}</h2>
    <p>${data.question}</p>
    <div class="modal-buttons">
      <button class="btn btn-ghost" data-answer="no" type="button">No</button>
      <button class="btn" data-answer="yes" type="button">Yes</button>
    </div>
  `;
}

/**
 * Show checkup button after all questions answered
 */
function showCheckupButton() {
  console.log('showCheckupButton called');
  const modal = document.getElementById('questions-modal');
  if (!modal) return;

  const modalContent = modal.querySelector('.modal');
  
  modalContent.innerHTML = `
    <h2 style="color: #FF99C5;">✨ Welcome ✨</h2>
    <p style="font-style: italic; color: #FF99C5;">All answers are perfect. You're ready to begin the journey.</p>
    <div style="margin-top: 2rem;">
      <button class="btn" data-action="start-checkup" type="button" style="width: 100%;">Start the Checkup</button>
    </div>
  `;
}

function initializeLandingPage() {
  console.log('initializeLandingPage called');
  
  // Setup event delegation on the modal for button clicks
  const modal = document.getElementById('questions-modal');
  if (modal) {
    // Remove any previous listeners
    const newModal = modal.cloneNode(true);
    modal.parentNode.replaceChild(newModal, modal);
    
    const updatedModal = document.getElementById('questions-modal');
    updatedModal.addEventListener('click', function(e) {
      console.log('Modal clicked, target:', e.target.tagName, 'data attributes:', e.target.getAttribute('data-answer'), e.target.getAttribute('data-action'));
      
      if (e.target.tagName === 'BUTTON') {
        e.preventDefault();
        e.stopPropagation();
        
        const answer = e.target.getAttribute('data-answer');
        const action = e.target.getAttribute('data-action');
        
        if (answer === 'yes') {
          console.log('YES button clicked');
          window.answerQuestion(true);
        } else if (answer === 'no') {
          console.log('NO button clicked');
          window.answerQuestion(false);
        } else if (action === 'start-checkup') {
          console.log('START CHECKUP button clicked');
          navigateTo('birthday.html');
        }
      }
    }, false);
  }
  
  // Show first question on page load
  setTimeout(() => {
    console.log('Showing first question');
    showLandingQuestion();
  }, 300);
}

/**
 * Birthday Page - Confetti and floating hearts
 */
function initializeBirthdayPage() {
  const container = document.querySelector('.page-container');

  // Create confetti
  Animations.createConfetti(container);

  // Create floating hearts
  setTimeout(() => {
    Animations.createFloatingHearts(container, 15);
  }, 500);

  // Add heartbeat animation to background element
  const heartbeat = document.querySelector('.bg-heartbeat');
  if (heartbeat) {
    heartbeat.classList.add('heartbeat');
  }

  // Don't autoplay - browser policy requires user interaction first
  // User can click the music toggle button to enable music
}

/**
 * Love Report Page - Medical document styling
 */
function initializeLoveReportPage() {
  const report = document.querySelector('.medical-report');
  if (report) {
    Animations.fadeIn(report, 200);
  }
  
  // Set report date
  const reportDate = document.getElementById('report-date');
  if (reportDate) {
    const today = new Date();
    reportDate.textContent = today.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
}

/**
 * Memories Page - Photo gallery with hover effects
 */
function initializeMemoriesPage() {
  // Custom implementation - see memories.html for grid population
  // This function is overridden in the memories.html page
}

/**
 * Reasons Page - Prescription cards with stagger
 */
function initializeReasonsPage() {
  // The reasons page now generates cards dynamically - see reasons.html
  // This initialization happens there instead
}

/**
 * Future Page - Prescription styling
 */
function initializeFuturePage() {
  const prescription = document.querySelector('.prescription-form');
  if (prescription) {
    Animations.fadeIn(prescription, 200);
  }
}

/**
 * Heart Monitor Page - ECG visualization and diagnosis reveal
 */
function initializeHeartMonitorPage() {
  // The page HTML already has the health bars and analyze button
  // The animation is handled by the page's own script tags
  const container = document.querySelector('.page-container');
  if (container) {
    Animations.fadeIn(container, 200);
  }
}

/**
 * Forever Page - Floating hearts background
 */
function initializeForeverPage() {
  const container = document.querySelector('.page-container');

  // Create initial floating hearts
  Animations.createFloatingHearts(container, 10);

  // Continue creating hearts periodically
  setInterval(() => {
    Animations.createFloatingHearts(container, 2);
  }, 2000);

  // Initialize hidden heart icon
  initializeHiddenHeartIcon();
}

/**
 * Secret Letter Page - Glow animation and reveal
 */
function initializeSecretLetterPage() {
  const letterContent = document.querySelector('.secret-letter-content');
  if (letterContent) {
    letterContent.classList.add('glow');
    Animations.vibrate([50, 100, 50, 100, 50, 100]);
    // Don't autoplay - browser policy requires user interaction first
  }
}

/**
 * Initialize hidden heart icon for unlocking secret page
 */
function initializeHiddenHeartIcon() {
  const heartIcon = document.querySelector('.hidden-heart-icon');
  if (!heartIcon) return;

  heartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    const unlocked = AppState.clickHiddenHeart();

    if (unlocked) {
      heartIcon.classList.add('active');
      Animations.vibrate([100, 50, 100, 50, 100]);

      // Show unlock notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 3000;
        text-align: center;
        animation: slideInModal 0.4s ease;
      `;
      notification.innerHTML = `
        <h2 style="color: #FF99C5; margin-bottom: 1rem;">💌 Secret Unlocked!</h2>
        <p style="margin-bottom: 1.5rem;">A hidden love letter has appeared...</p>
        <button class="btn" onclick="navigateTo('secret_letter.html')">Read the Letter</button>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 5000);
    }
  });
}

/**
 * Heartbeat Button Feature
 */
function initializeHeartbeatButton() {
  const heartbeatBtn = document.querySelector('.heartbeat-button');
  if (!heartbeatBtn) return;

  heartbeatBtn.addEventListener('click', () => {
    const ecgLine = document.querySelector('.ecg-line-container svg');
    if (ecgLine) {
      // Accelerate ECG animation
      ecgLine.style.animationDuration = '1s';
      setTimeout(() => {
        ecgLine.style.animationDuration = '4s';
      }, 5000);
    }

    // Show message
    const msg = document.createElement('div');
    msg.style.cssText = `
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 2rem;
      border-radius: 10px;
      border: 2px solid #FF99C5;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      z-index: 500;
      text-align: center;
      animation: slideInDown 0.4s ease;
      max-width: 300px;
    `;
    msg.innerHTML = `
      <p style="font-size: 1.2rem; font-style: italic; color: #FF99C5; margin: 0;">
        "Every beat here has been saying your name."
      </p>
    `;
    document.body.appendChild(msg);

    // Vibrate pattern
    Animations.vibrate([50, 100, 50, 100, 50, 100, 50, 100]);

    setTimeout(() => msg.remove(), 4000);
  });
}

/**
 * Navigation helper
 */
function navigateTo(page) {
  // Reset hidden page clicks when navigating away from Forever page
  if (document.body.getAttribute('data-page') === 'forever') {
    AppState.resetHiddenPageClicks();
  }

  window.location.href = page;
}

// ============================================
// INTERACTIVE FEATURES
// ============================================

/**
 * Birthday Page - Celebrate Birthday (Cake Click)
 */
let cakeClicks = 0;
function celebrateBirthday() {
  cakeClicks++;
  const container = document.querySelector('.page-container');
  
  // Create confetti and hearts
  Animations.createConfetti(container);
  Animations.createFloatingHearts(container, 8);
  
  // Vibrate feedback
  Animations.vibrate([100, 50, 100]);
}

/**
 * Reveal Birthday Message Parts
 */
let messageParts = [
  'Every single day with you feels like a birthday celebration.',
  'You\'ve brought color to a life that was once just shades of gray.',
  'And today, I want the whole world to know how much you mean to me.',
  'Happy Birthday to the woman who is my greatest love story.'
];
let messageIndex = 0;

function revealMessage() {
  const report = document.querySelector('.medical-report');
  if (!report) {
    // Fallback: create a simple reveal modal
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed; top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: white; padding: 2rem; border-radius: 10px;
      max-width: 400px; z-index: 1000;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      text-align: center;
    `;
    
    if (messageIndex < messageParts.length) {
      modal.innerHTML = `
        <p style="color: #666; font-style: italic; line-height: 1.8; margin-bottom: 1.5rem;">
          "${messageParts[messageIndex]}"
        </p>
        <button class="btn" onclick="this.parentElement.remove(); revealMessage();">
          ${messageIndex < messageParts.length - 1 ? 'Next' : 'Finished'}
        </button>
      `;
      messageIndex++;
      document.body.appendChild(modal);
      Animations.vibrate([50, 30, 50]);
    }
  }
}

/**
 * Heartbeat Check Modal
 */
function checkHeartbeat() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: white; padding: 2rem; border-radius: 10px;
    max-width: 400px; z-index: 1000;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    text-align: center;
  `;
  
  modal.innerHTML = `
    <h2 style="color: #FF99C5; margin-bottom: 1.5rem;">💓 Heartbeat Analysis</h2>
    <div style="font-size: 2rem; margin: 1.5rem 0; animation: pulse 1.5s ease infinite;">
      ❤️
    </div>
    <div id="heartbeat-lines" style="margin: 1.5rem 0; text-align: left; color: #666; font-style: italic;">
      <!-- Diagnosis lines will appear here -->
    </div>
    <button class="btn" onclick="this.parentElement.remove();">Close</button>
  `;
  
  document.body.appendChild(modal);
  
  const heartbeatLines = [
    '✓ Heart rate: 120 bpm (elevated, as expected)',
    '✓ Rhythm: Steady (because you calm me)',
    '✓ Murmur detected: Love, permanent',
    '✓ Prognosis: Incurable, beautifully managed'
  ];
  
  let lineIndex = 0;
  const linesDiv = modal.querySelector('#heartbeat-lines');
  
  const displayInterval = setInterval(() => {
    if (lineIndex < heartbeatLines.length) {
      const line = document.createElement('div');
      line.textContent = heartbeatLines[lineIndex];
      line.style.animation = 'slideInUp 0.4s ease forwards';
      linesDiv.appendChild(line);
      Animations.vibrate([50, 40, 50]);
      lineIndex++;
    } else {
      clearInterval(displayInterval);
    }
  }, 1000);
}

/**
 * Symptom Interactive Reveal
 */
const symptoms = [
  'Constant thoughts of patient about Dr. Charu',
  'Involuntary smiling when remembering her presence',
  'Persistent sense of longing during moments of silence',
  'Complete calm & peace upon hearing her voice'
];
let revealedSymptoms = [false, false, false, false];

function revealSymptom(index) {
  if (index >= symptoms.length || revealedSymptoms[index]) return;
  
  revealedSymptoms[index] = true;
  const symptomText = document.querySelector(`.symptom-${index}`);
  
  if (symptomText) {
    symptomText.textContent = symptoms[index];
    symptomText.style.opacity = '1';
    symptomText.parentElement.style.backgroundColor = 'rgba(74, 155, 158, 0.1)';
  }
  
  Animations.vibrate([70, 50, 70]);
  
  // Check if all symptoms are revealed
  if (revealedSymptoms.every(v => v)) {
    setTimeout(() => {
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: white; padding: 2rem; border-radius: 10px;
        max-width: 400px; z-index: 1000;
        text-align: center; animation: scaleIn 0.5s ease;
      `;
      modal.innerHTML = `
        <h2 style="color: #FF99C5; margin-bottom: 1rem;">✓ Diagnosis Complete</h2>
        <p style="color: #666; font-style: italic;">The diagnosis is... unconditional love.</p>
        <button class="btn" onclick="this.parentElement.remove();" style="margin-top: 1rem;">
          Got it
        </button>
      `;
      document.body.appendChild(modal);
    }, 300);
  }
}


// ============================================
// DOCUMENT READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize app state
  AppState.init();

  // Check if trying to access secret page without unlocking
  const pageName = document.body.getAttribute('data-page');
  if (pageName === 'secret-letter' && !AppState.hiddenPageUnlocked) {
    // Redirect to forever page
    window.location.href = 'forever.html';
    return;
  }

  // Initialize navigation
  initializeNavigation();

  // Initialize page-specific content
  initializePageContent();

  // Initialize heartbeat button if present
  initializeHeartbeatButton();

  // Add fade-in to main content
  const content = document.querySelector('.content-wrapper');
  if (content) {
    content.classList.add('fade-in');
  }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format date (useful for birthday wishes)
 */
function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Get current date
 */
function getTodayDate() {
  return new Date();
}

/**
 * Show Proposal Popup after Diagnosis
 */
function showProposalPopup() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;
    animation: fadeInOverlay 0.3s ease;
  `;

  // Create modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    background: linear-gradient(135deg, #FFF9FB 0%, #FFFBFE 100%);
    border: 3px solid #FF99C5;
    padding: 3rem;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 12px 24px rgba(74, 155, 158, 0.3);
    animation: slideInModal 0.4s ease;
    text-align: center;
  `;

  modal.innerHTML = `
    <div style="font-size: 3rem; margin-bottom: 1.5rem;">💕</div>
    
    <h2 style="color: #FF99C5; margin-bottom: 1.5rem; font-size: 1.8rem; font-family: 'Great Vibes', cursive; letter-spacing: 2px;">
      Successfully Diagnosed
    </h2>
    
    <p style="color: #4A9B9E; font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.8;">
      My heart has been thoroughly examined by the most beautiful doctor in the world,<br>
      and the diagnosis is clear...
    </p>
    
    <p style="color: #FF99C5; font-size: 1.3rem; font-weight: bold; margin-bottom: 2rem; font-family: 'Great Vibes', cursive;">
      Will you be my Better Half Forever?
    </p>
    
    <div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 2rem;">
      <button id="yes-btn" class="btn" style="flex: 1; padding: 1rem; font-size: 1.1rem; background: #4A9B9E;">
        💚 Yes, Forever!
      </button>
      <button id="no-btn" class="btn btn-secondary" style="flex: 1; padding: 1rem; font-size: 1.1rem;">
        No, Maybe Not...
      </button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');

  // Handle Yes click
  yesBtn.addEventListener('click', function() {
    overlay.remove();
    showSuccessMessage();
  });

  // Handle No button - make it run away
  noBtn.addEventListener('mouseover', function() {
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.2s ease';
  });

  // Also run away on touch/tap for mobile
  noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transition = 'all 0.2s ease';
  });
}

/**
 * Show Success Message after Yes
 */
function showSuccessMessage() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;
    animation: fadeInOverlay 0.3s ease;
  `;

  const modal = document.createElement('div');
  modal.style.cssText = `
    background: linear-gradient(135deg, #FFE8F0 0%, #FFF9FB 100%);
    border: 3px solid #4A9B9E;
    padding: 3rem;
    border-radius: 20px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 12px 24px rgba(74, 155, 158, 0.3);
    animation: slideInModal 0.4s ease;
    text-align: center;
  `;

  modal.innerHTML = `
    <div style="font-size: 4rem; margin-bottom: 1.5rem; animation: heartbeat 1.2s infinite;">💖</div>
    
    <h2 style="color: #4A9B9E; margin-bottom: 1.5rem; font-size: 2rem; font-family: 'Great Vibes', cursive; letter-spacing: 2px;">
      Yah! I already knew it.
    </h2>
    
    <p style="color: #666; font-size: 1.1rem; margin-bottom: 1.5rem; line-height: 1.8; font-style: italic;">
      Your love has been written in every beat of my heart since the moment I met you.
    </p>
    
    <p style="color: #FF99C5; font-size: 1.2rem; font-weight: bold; font-family: 'Great Vibes', cursive;">
      Let's write our story together, forever and always.
    </p>
    
    <button class="btn" onclick="this.parentElement.parentElement.remove();" style="margin-top: 2rem; padding: 1rem 2rem;">
      Close Your Beautiful Eyes & Dream 💭
    </button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Create confetti
  Animations.createConfetti(document.body);
  Animations.vibrate([100, 50, 100, 50, 100]);
}

// Make functions available globally
window.navigateTo = navigateTo;
window.Animations = Animations;
window.AppState = AppState;
window.AudioManager = AudioManager;
window.showProposalPopup = showProposalPopup;

// Interactive functions
window.celebrateBirthday = celebrateBirthday;
window.revealMessage = revealMessage;
window.checkHeartbeat = checkHeartbeat;
window.revealSymptom = revealSymptom;
window.updateInteractionCounter = updateInteractionCounter;
