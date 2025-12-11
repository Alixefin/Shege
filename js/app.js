/**
 * Shege Wrapped 2025
 * Main Application Logic
 */

// ==========================================
// QUESTIONS DATA - Including Student Questions
// ==========================================
const questions = [
    // General Life Shege
    {
        id: 1,
        category: 'general',
        question: "What was your biggest 'wahala' of 2025?",
        type: 'options',
        options: [
            'Money problems 💸',
            'Relationship drama 💔',
            'Work/School stress 📚',
            'Health issues 🏥',
            'Family palava 👨‍👩‍👧‍👦',
            'All of the above 😭'
        ]
    },
    {
        id: 2,
        category: 'infrastructure',
        question: "How many times did NEPA disappoint you this year?",
        type: 'scale',
        min: 0,
        max: 100,
        step: 10,
        unit: 'times',
        labels: ['Never (lies!)', 'Lost count']
    },
    {
        id: 3,
        category: 'infrastructure',
        question: "Rate your fuel queue experience this year",
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        labels: ['No wahala', 'Maximum shege']
    },
    {
        id: 4,
        category: 'finance',
        question: "How many times did your salary/allowance finish before month-end?",
        type: 'scale',
        min: 0,
        max: 12,
        step: 1,
        unit: 'months',
        labels: ['Never', 'Every month']
    },
    {
        id: 5,
        category: 'hustle',
        question: "Rate your 'side hustle' energy this year",
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        labels: ['No hustle', 'Hustle master']
    },
    // Student-Specific Questions
    {
        id: 6,
        category: 'student',
        question: "How many all-nighters did you pull this year?",
        type: 'scale',
        min: 0,
        max: 50,
        step: 5,
        unit: 'nights',
        labels: ['I sleep well', 'Sleep is a myth']
    },
    {
        id: 7,
        category: 'student',
        question: "Rate your lecturer/teacher wahala level",
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        labels: ['Angels', 'Wicked people']
    },
    {
        id: 8,
        category: 'student',
        question: "How many times did you miss a deadline?",
        type: 'scale',
        min: 0,
        max: 20,
        step: 1,
        unit: 'times',
        labels: ['Never', 'Too many']
    },
    {
        id: 9,
        category: 'student',
        question: "Rate your school fees/tuition stress",
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        labels: ['No stress', 'Maximum pressure']
    },
    // More General Questions
    {
        id: 10,
        category: 'spiritual',
        question: "How many times did you say 'God when?' this year?",
        type: 'scale',
        min: 0,
        max: 100,
        step: 10,
        unit: 'times',
        labels: ['Rarely', 'Daily devotion']
    },
    {
        id: 11,
        category: 'general',
        question: "What was your biggest 'shege' moment of 2025?",
        type: 'options',
        options: [
            'Lost money/got scammed 💔',
            'Embarrassing moment in public 😅',
            'Heartbreak/breakup 💔',
            'Failed exam/interview 📝',
            'Got stuck in traffic for hours 🚗',
            'Phone/laptop crashed 📱'
        ]
    },
    {
        id: 12,
        category: 'survival',
        question: "How many times did you eat noodles as a main meal?",
        type: 'scale',
        min: 0,
        max: 100,
        step: 10,
        unit: 'times',
        labels: ['Fancy life', 'Indomie gang']
    },
    {
        id: 13,
        category: 'housing',
        question: "Rate your landlord/accommodation wahala",
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        labels: ['No issues', 'Worst nightmare']
    },
    {
        id: 14,
        category: 'hustle',
        question: "How many job/internship applications did you send?",
        type: 'scale',
        min: 0,
        max: 100,
        step: 10,
        unit: 'applications',
        labels: ['None', 'Spray & pray']
    },
    {
        id: 15,
        category: 'transport',
        question: "What's the longest you waited for transport?",
        type: 'options',
        options: [
            'Under 30 minutes ⚡',
            '30 mins - 1 hour 😤',
            '1 - 2 hours 😫',
            '2 - 3 hours 💀',
            '3+ hours (I walked) 🚶'
        ]
    },
    {
        id: 16,
        category: 'infrastructure',
        question: "Rate your network/data wahala (MTN, Glo, Airtel)",
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        labels: ['Smooth', 'Worst thing ever']
    },
    {
        id: 17,
        category: 'social',
        question: "How many 'owanbe'/parties did you attend?",
        type: 'scale',
        min: 0,
        max: 20,
        step: 1,
        unit: 'parties',
        labels: ['Homebody', 'Party animal']
    },
    {
        id: 18,
        category: 'health',
        question: "Rate your 'body no be firewood' energy this year",
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        labels: ['Strong body', 'I need rest']
    },
    {
        id: 19,
        category: 'tech',
        question: "How many times did you restart your device to fix something?",
        type: 'scale',
        min: 0,
        max: 50,
        step: 5,
        unit: 'times',
        labels: ['Rarely', 'Tech support mode']
    },
    {
        id: 20,
        category: 'vibe',
        question: "Pick your survival anthem for 2025",
        type: 'options',
        options: [
            '"E go better" - Optimist 🌟',
            '"We move" - Hustler 💪',
            '"Na God" - Faithful 🙏',
            '"Nothing spoil" - Unbothered 😎',
            '"I don see shege" - Realistic 😭',
            '"Money must made" - Focused 💰'
        ]
    }
];

// ==========================================
// APPLICATION STATE
// ==========================================
let currentScreen = 'loading';
let currentQuestion = 0;
let answers = {};

// ==========================================
// DOM ELEMENTS
// ==========================================
const screens = {
    loading: document.getElementById('loading-screen'),
    home: document.getElementById('home-screen'),
    questions: document.getElementById('questions-screen'),
    wrapped: document.getElementById('wrapped-screen')
};

const elements = {
    startBtn: document.getElementById('start-btn'),
    backBtn: document.getElementById('back-btn'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    shareBtn: document.getElementById('share-btn'),
    restartBtn: document.getElementById('restart-btn'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    questionContainer: document.getElementById('question-container'),
    storyContainer: document.getElementById('story-container'),
    storyProgress: document.getElementById('story-progress')
};

// ==========================================
// SCREEN NAVIGATION
// ==========================================
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.add('hidden');
    });

    // Show target screen
    screens[screenName].classList.remove('hidden');
    currentScreen = screenName;
}

// ==========================================
// LOADING SCREEN
// ==========================================
function initLoadingScreen() {
    setTimeout(() => {
        showScreen('home');
    }, 3000);
}

// ==========================================
// QUESTIONS LOGIC
// ==========================================
function renderQuestion() {
    const question = questions[currentQuestion];
    const questionNum = currentQuestion + 1;
    const totalQuestions = questions.length;

    // Update progress
    const progress = (questionNum / totalQuestions) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressText.textContent = `${questionNum}/${totalQuestions}`;

    // Update navigation buttons
    elements.prevBtn.disabled = currentQuestion === 0;
    elements.nextBtn.textContent = currentQuestion === totalQuestions - 1 ? 'Get My Wrapped!' : 'Next';

    // Generate question HTML
    let inputHTML = '';

    if (question.type === 'options') {
        inputHTML = `
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <button class="option-btn ${answers[question.id] === index ? 'selected' : ''}" 
                            data-value="${index}">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    } else if (question.type === 'scale') {
        const currentValue = answers[question.id] !== undefined ? answers[question.id] : Math.round((question.min + question.max) / 2);
        inputHTML = `
            <div class="scale-container">
                <div class="scale-value" id="scale-value">${currentValue}${question.unit ? '' : ''}</div>
                <input type="range" 
                       class="scale-input" 
                       id="scale-input"
                       min="${question.min}" 
                       max="${question.max}" 
                       step="${question.step}"
                       value="${currentValue}">
                <div class="scale-labels">
                    <span>${question.labels[0]}</span>
                    <span>${question.labels[1]}</span>
                </div>
            </div>
        `;
    } else if (question.type === 'text') {
        inputHTML = `
            <input type="text" 
                   class="text-input" 
                   id="text-input"
                   placeholder="Type your answer..."
                   value="${answers[question.id] || ''}">
        `;
    }

    elements.questionContainer.innerHTML = `
        <div class="question-card">
            <div class="question-number">Question ${questionNum}</div>
            <h2 class="question-text">${question.question}</h2>
            ${inputHTML}
        </div>
    `;

    // Add event listeners
    if (question.type === 'options') {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                answers[question.id] = parseInt(e.target.dataset.value);
            });
        });
    } else if (question.type === 'scale') {
        const scaleInput = document.getElementById('scale-input');
        const scaleValue = document.getElementById('scale-value');

        scaleInput.addEventListener('input', (e) => {
            scaleValue.textContent = e.target.value;
            answers[question.id] = parseInt(e.target.value);
        });

        // Set initial value if not answered
        if (answers[question.id] === undefined) {
            answers[question.id] = parseInt(scaleInput.value);
        }
    } else if (question.type === 'text') {
        const textInput = document.getElementById('text-input');
        textInput.addEventListener('input', (e) => {
            answers[question.id] = e.target.value;
        });
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        generateWrapped();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

// ==========================================
// WRAPPED GENERATION
// ==========================================
let currentStory = 0;
let storyCards = [];

function calculateShegeLevel() {
    // Calculate overall shege score based on answers
    let totalScore = 0;
    let maxPossible = 0;

    questions.forEach(q => {
        if (q.type === 'scale') {
            totalScore += (answers[q.id] || 0);
            maxPossible += q.max;
        } else if (q.type === 'options') {
            // Higher option index = more shege
            totalScore += (answers[q.id] || 0) * 10;
            maxPossible += (q.options.length - 1) * 10;
        }
    });

    return Math.round((totalScore / maxPossible) * 100);
}

function getShegeTitle(level) {
    if (level >= 80) return { title: 'Shege Master 💀', desc: 'You have truly seen it all. You deserve a medal for surviving 2025!' };
    if (level >= 60) return { title: 'Wahala Captain 😤', desc: 'The struggle was real for you this year. But you pulled through!' };
    if (level >= 40) return { title: 'Stress Soldier 😅', desc: 'You experienced a fair share of shege. Not too bad, not too good.' };
    if (level >= 20) return { title: 'Low-Key Survivor 😎', desc: "You managed to dodge most wahala this year. Teach us your ways!" };
    return { title: 'Butter Life Gang ✨', desc: "Either you're blessed or you're lying. Either way, we're jealous!" };
}

function generateWrapped() {
    const shegeLevel = calculateShegeLevel();
    const shegeTitle = getShegeTitle(shegeLevel);

    // Get specific answers for stats
    const nepaCount = answers[2] || 0;
    const allNighters = answers[6] || 0;
    const noodleCount = answers[12] || 0;
    const godWhenCount = answers[10] || 0;
    const jobApps = answers[14] || 0;

    // Get selected options text
    const biggestWahala = questions[0].options[answers[1] || 0];
    const shegeMoment = questions[10].options[answers[11] || 0];
    const anthem = questions[19].options[answers[20] || 0];

    storyCards = [
        // Intro Card
        {
            type: 'card-intro',
            emoji: '📊',
            title: 'Your 2025',
            value: 'Shege Wrapped',
            description: "Let's see how much wahala you experienced this year..."
        },
        // Shege Level Card
        {
            type: 'card-highlight',
            emoji: shegeLevel >= 60 ? '🔥' : '✨',
            title: 'Your Shege Level',
            value: `${shegeLevel}%`,
            description: shegeTitle.desc
        },
        // Title Card
        {
            type: 'card-stat',
            emoji: shegeLevel >= 80 ? '💀' : shegeLevel >= 50 ? '😤' : '😎',
            title: 'You Are A',
            value: shegeTitle.title,
            description: 'This is your official 2025 shege certificate'
        },
        // NEPA Stats
        {
            type: 'card-dark',
            emoji: '💡',
            title: 'NEPA Wahala',
            value: nepaCount + '+',
            label: 'power outages survived',
            description: nepaCount >= 50 ? "You're basically living in candlelight!" : "The darkness couldn't stop you!"
        },
        // Student Stats (if applicable)
        {
            type: 'card-stat',
            emoji: '📚',
            title: 'Academic Hustle',
            value: allNighters,
            label: 'all-nighters pulled',
            description: allNighters >= 20 ? 'Your eye bags have eye bags!' : 'The grind never stops!'
        },
        // Survival Stats
        {
            type: 'card-highlight',
            emoji: '🍜',
            title: 'Indomie Gang',
            value: noodleCount + '+',
            label: 'noodle meals consumed',
            description: noodleCount >= 50 ? 'Noodles are basically your sponsor now' : 'A true survivor\'s diet!'
        },
        // God When Count
        {
            type: 'card-intro',
            emoji: '🙏',
            title: 'Faith Tested',
            value: godWhenCount + '+',
            label: 'times you said "God when?"',
            description: 'But you kept the faith strong!'
        },
        // Summary Card
        {
            type: 'card-summary',
            emoji: '🏆',
            title: '2025 Summary',
            anthem: anthem,
            description: `Despite all the shege, you made it! Here's to a better 2025! 🎉`
        }
    ];

    renderStoryCards();
    showScreen('wrapped');
}

function renderStoryCards() {
    // Render story cards
    elements.storyContainer.innerHTML = storyCards.map((card, index) => `
        <div class="story-card ${card.type} ${index === 0 ? 'active' : ''}" id="story-${index}">
            <div class="story-emoji">${card.emoji}</div>
            <h2 class="story-title">${card.title}</h2>
            ${card.value ? `<div class="story-value">${card.value}</div>` : ''}
            ${card.label ? `<div class="story-label">${card.label}</div>` : ''}
            ${card.anthem ? `<div class="story-label" style="font-size: 1.2rem; margin-bottom: 1rem;">${card.anthem}</div>` : ''}
            <p class="story-description">${card.description}</p>
            <div class="story-brand">
                <img src="images/light-logo.png" alt="Shege" class="story-brand-logo">
                <div class="story-brand-text">ShegeWrapped2025@Max</div>
            </div>
        </div>
    `).join('');

    // Render progress dots
    elements.storyProgress.innerHTML = storyCards.map((_, index) => `
        <div class="progress-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');

    // Add click listeners for navigation
    elements.storyContainer.addEventListener('click', handleStoryClick);

    // Add dot click listeners
    document.querySelectorAll('.progress-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            goToStory(parseInt(e.target.dataset.index));
        });
    });
}

function handleStoryClick(e) {
    const containerRect = elements.storyContainer.getBoundingClientRect();
    const clickX = e.clientX - containerRect.left;
    const containerWidth = containerRect.width;

    // Click on right half = next, left half = previous
    if (clickX > containerWidth / 2) {
        nextStory();
    } else {
        prevStory();
    }
}

function goToStory(index) {
    if (index < 0 || index >= storyCards.length) return;

    // Update active card
    document.querySelectorAll('.story-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });

    // Update progress dots
    document.querySelectorAll('.progress-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentStory = index;
}

function nextStory() {
    if (currentStory < storyCards.length - 1) {
        goToStory(currentStory + 1);
    }
}

function prevStory() {
    if (currentStory > 0) {
        goToStory(currentStory - 1);
    }
}

// ==========================================
// SAVE AS IMAGE
// ==========================================
async function saveAsImage() {
    const activeCard = document.querySelector('.story-card.active');
    if (!activeCard) return;

    try {
        // Temporarily make card visible for capture
        const canvas = await html2canvas(activeCard, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            logging: false
        });

        // Create download link
        const link = document.createElement('a');
        link.download = `shege-wrapped-${currentStory + 1}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error('Error saving image:', error);
        alert('Could not save image. Please try again.');
    }
}

// ==========================================
// RESTART FUNCTION
// ==========================================
function restart() {
    currentQuestion = 0;
    currentStory = 0;
    answers = {};
    storyCards = [];
    showScreen('home');
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function initEventListeners() {
    elements.startBtn.addEventListener('click', () => {
        showScreen('questions');
        renderQuestion();
    });

    elements.backBtn.addEventListener('click', () => {
        showScreen('home');
        currentQuestion = 0;
    });

    elements.prevBtn.addEventListener('click', prevQuestion);
    elements.nextBtn.addEventListener('click', nextQuestion);

    elements.shareBtn.addEventListener('click', saveAsImage);
    elements.restartBtn.addEventListener('click', restart);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (currentScreen === 'questions') {
            if (e.key === 'ArrowRight' || e.key === 'Enter') nextQuestion();
            if (e.key === 'ArrowLeft') prevQuestion();
        } else if (currentScreen === 'wrapped') {
            if (e.key === 'ArrowRight') nextStory();
            if (e.key === 'ArrowLeft') prevStory();
        }
    });

    // Touch swipe support for stories
    let touchStartX = 0;
    let touchEndX = 0;

    elements.storyContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    elements.storyContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextStory();
            } else {
                prevStory();
            }
        }
    }
}

// ==========================================
// INITIALIZE APP
// ==========================================
function init() {
    initLoadingScreen();
    initEventListeners();
}

// Start the app
init();
