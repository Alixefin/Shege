/**
 * Shege Wrapped 2025
 * Main Application Logic
 */

// ==========================================
// QUESTIONS DATA - 10 Fun Direct Questions
// ==========================================
const questions = [
    {
        id: 1,
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
        question: "Rate your fuel queue shege this year",
        type: 'scale',
        min: 1,
        max: 10,
        step: 1,
        labels: ['No wahala', 'Maximum shege']
    },
    {
        id: 3,
        question: "Which network showed you shege this year?",
        type: 'multiselect',
        options: [
            'MTN 💛',
            'Glo 🟢',
            'Airtel ❤️',
            '9mobile 💚',
            'All of them! 😤'
        ]
    },
    {
        id: 4,
        question: "How much did you spend on data & recharge this year?",
        type: 'options',
        options: [
            'Under ₦10,000 📱',
            '₦10,000 - ₦50,000 💸',
            '₦50,000 - ₦100,000 😰',
            '₦100,000 - ₦200,000 💀',
            'Over ₦200,000 (I dont want to think about it) 😭'
        ]
    },
    {
        id: 5,
        question: "How many times did you sigh and say 'Omo' this year?",
        type: 'scale',
        min: 0,
        max: 100,
        step: 10,
        labels: ['Rarely', 'Every single day']
    },
    {
        id: 6,
        question: "Which month did you see SHEGE the most?",
        type: 'options',
        options: [
            'January 🥶',
            'February 💔',
            'March 🌧️',
            'April 😤',
            'May 🔥',
            'June ☀️',
            'July 💦',
            'August 📚',
            'September 😰',
            'October 🎃',
            'November 🍂',
            'December 🎄'
        ]
    },
    {
        id: 7,
        question: "Which month did you enjoy the most?",
        type: 'options',
        options: [
            'January 🎉',
            'February ❤️',
            'March 🌸',
            'April 🌈',
            'May 🌻',
            'June ☀️',
            'July 🏖️',
            'August 🎊',
            'September 📖',
            'October 🎃',
            'November 🦃',
            'December 🎄'
        ]
    },
    {
        id: 8,
        question: "How many times did NEPA take light this year?",
        type: 'scale',
        min: 0,
        max: 100,
        step: 10,
        labels: ['Never (lies!)', 'Lost count']
    },
    {
        id: 9,
        question: "How many times did you eat noodles as a main meal?",
        type: 'scale',
        min: 0,
        max: 100,
        step: 10,
        labels: ['Fancy life', 'Indomie gang']
    },
    {
        id: 10,
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
    Object.values(screens).forEach(screen => {
        screen.classList.add('hidden');
    });
    screens[screenName].classList.remove('hidden');
    currentScreen = screenName;
}

// ==========================================
// LOADING SCREEN
// ==========================================
function initLoadingScreen() {
    setTimeout(() => {
        showScreen('home');
    }, 5000); // 5 seconds loading
}

// ==========================================
// VALIDATION - Check if question is answered
// ==========================================
function isQuestionAnswered() {
    const question = questions[currentQuestion];
    const answer = answers[question.id];

    if (question.type === 'options') {
        return answer !== undefined;
    } else if (question.type === 'multiselect') {
        return answer && answer.length > 0;
    } else if (question.type === 'scale') {
        return answer !== undefined;
    }
    return false;
}

function showValidationError() {
    const questionCard = document.querySelector('.question-card');
    questionCard.classList.add('shake');

    // Show error message
    let errorMsg = document.querySelector('.validation-error');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'validation-error';
        errorMsg.textContent = 'Please answer this question to continue!';
        questionCard.appendChild(errorMsg);
    }

    setTimeout(() => {
        questionCard.classList.remove('shake');
    }, 500);
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
    } else if (question.type === 'multiselect') {
        const selectedOptions = answers[question.id] || [];
        inputHTML = `
            <div class="options-container multiselect">
                <p class="multiselect-hint">Select all that apply</p>
                ${question.options.map((option, index) => `
                    <button class="option-btn ${selectedOptions.includes(index) ? 'selected' : ''}" 
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
                <div class="scale-value" id="scale-value">${currentValue}</div>
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
                removeValidationError();
            });
        });
    } else if (question.type === 'multiselect') {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const value = parseInt(e.target.dataset.value);
                if (!answers[question.id]) answers[question.id] = [];

                const idx = answers[question.id].indexOf(value);
                if (idx > -1) {
                    answers[question.id].splice(idx, 1);
                    e.target.classList.remove('selected');
                } else {
                    answers[question.id].push(value);
                    e.target.classList.add('selected');
                }
                removeValidationError();
            });
        });
    } else if (question.type === 'scale') {
        const scaleInput = document.getElementById('scale-input');
        const scaleValue = document.getElementById('scale-value');

        // Set initial value
        if (answers[question.id] === undefined) {
            answers[question.id] = parseInt(scaleInput.value);
        }

        scaleInput.addEventListener('input', (e) => {
            scaleValue.textContent = e.target.value;
            answers[question.id] = parseInt(e.target.value);
            removeValidationError();
        });
    }
}

function removeValidationError() {
    const errorMsg = document.querySelector('.validation-error');
    if (errorMsg) errorMsg.remove();
}

function nextQuestion() {
    if (!isQuestionAnswered()) {
        showValidationError();
        return;
    }

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
    let totalScore = 0;
    let maxPossible = 0;

    questions.forEach(q => {
        if (q.type === 'scale') {
            totalScore += (answers[q.id] || 0);
            maxPossible += q.max;
        } else if (q.type === 'options') {
            totalScore += (answers[q.id] || 0) * 10;
            maxPossible += (q.options.length - 1) * 10;
        } else if (q.type === 'multiselect') {
            totalScore += ((answers[q.id] || []).length) * 10;
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

    // Get specific answers
    const nepaCount = answers[8] || 0;
    const noodleCount = answers[9] || 0;
    const omoCount = answers[5] || 0;
    const shegeMonth = questions[5].options[answers[6] || 0];
    const enjoyMonth = questions[6].options[answers[7] || 0];
    const anthem = questions[9].options[answers[10] || 0];

    // Get network names
    const networkOptions = questions[2].options;
    const selectedNetworks = (answers[3] || []).map(i => networkOptions[i]).join(', ') || 'None';

    storyCards = [
        {
            type: 'card-intro',
            emoji: '📊',
            title: 'Your 2025',
            value: 'Shege Wrapped',
            description: "Let's see how much wahala you experienced this year..."
        },
        {
            type: 'card-highlight',
            emoji: shegeLevel >= 60 ? '🔥' : '✨',
            title: 'Your Shege Level',
            value: `${shegeLevel}%`,
            description: shegeTitle.desc
        },
        {
            type: 'card-stat',
            emoji: shegeLevel >= 80 ? '💀' : shegeLevel >= 50 ? '😤' : '😎',
            title: 'You Are A',
            value: shegeTitle.title,
            description: 'This is your official 2025 shege certificate'
        },
        {
            type: 'card-dark',
            emoji: '📱',
            title: 'Network Wahala',
            value: selectedNetworks.split(',')[0],
            description: `These networks showed you maximum shege: ${selectedNetworks}`
        },
        {
            type: 'card-stat',
            emoji: '😮‍💨',
            title: '"Omo" Count',
            value: omoCount + '+',
            label: 'times you sighed "Omo"',
            description: omoCount >= 50 ? 'You said it so much it became your mantra!' : 'Classic Nigerian expression!'
        },
        {
            type: 'card-highlight',
            emoji: '📅',
            title: 'Worst Month',
            value: shegeMonth,
            description: 'This month really tested your patience and strength!'
        },
        {
            type: 'card-intro',
            emoji: '🎉',
            title: 'Best Month',
            value: enjoyMonth,
            description: 'At least you had some good times this year!'
        },
        {
            type: 'card-summary',
            emoji: '🏆',
            title: '2025 Summary',
            anthem: anthem,
            description: `Despite all the shege, you made it! Here's to a better 2026! 🎉`
        }
    ];

    renderStoryCards();
    showScreen('wrapped');
}

function renderStoryCards() {
    const isLastCard = (index) => index === storyCards.length - 1;

    elements.storyContainer.innerHTML = storyCards.map((card, index) => `
        <div class="story-card ${card.type} ${index === 0 ? 'active' : ''}" id="story-${index}">
            <div class="story-emoji">${card.emoji}</div>
            <h2 class="story-title">${card.title}</h2>
            ${card.value ? `<div class="story-value">${card.value}</div>` : ''}
            ${card.label ? `<div class="story-label">${card.label}</div>` : ''}
            ${card.anthem ? `<div class="story-label" style="font-size: 1.2rem; margin-bottom: 1rem;">${card.anthem}</div>` : ''}
            <p class="story-description">${card.description}</p>
            ${isLastCard(index) ? `<button class="btn btn-home" onclick="restart()">🏠 Go Home</button>` : ''}
            <div class="story-brand">
                <img src="images/dark-logo.png" alt="Shege" class="story-brand-logo">
                <div class="story-brand-text">Designed by Maxwell</div>
            </div>
        </div>
    `).join('');

    elements.storyProgress.innerHTML = storyCards.map((_, index) => `
        <div class="progress-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
    `).join('');

    elements.storyContainer.addEventListener('click', handleStoryClick);

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

    if (clickX > containerWidth / 2) {
        nextStory();
    } else {
        prevStory();
    }
}

function goToStory(index) {
    if (index < 0 || index >= storyCards.length) return;

    document.querySelectorAll('.story-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });

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
        const canvas = await html2canvas(activeCard, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            logging: false
        });

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

    document.addEventListener('keydown', (e) => {
        if (currentScreen === 'questions') {
            if (e.key === 'ArrowRight' || e.key === 'Enter') nextQuestion();
            if (e.key === 'ArrowLeft') prevQuestion();
        } else if (currentScreen === 'wrapped') {
            if (e.key === 'ArrowRight') nextStory();
            if (e.key === 'ArrowLeft') prevStory();
        }
    });

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

init();
