/* ========================================
   CHATBOT - SIMPLE & RELIABLE VERSION
   ======================================== */

// Wait for DOM to be fully loaded
function initChatbot() {
    console.log('Initializing chatbot...');

    // Get all elements
    const chatFloatBtn = document.getElementById('chatFloatBtn');
    const chatbotModal = document.getElementById('chatbotModal');
    const closeChatbot = document.getElementById('closeChatbot');
    const clearChatbot = document.getElementById('clearChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSendBtn = document.getElementById('chatbotSendBtn');
    const chatbotQuickReplies = document.getElementById('chatbotQuickReplies');

    // Check if all elements exist
    if (!chatFloatBtn || !chatbotModal) {
        console.error('Chatbot elements not found!');
        return;
    }

    console.log('All chatbot elements found!');

    // Knowledge Base
    const knowledgeBase = [
        {
            keywords: ['practice', 'area', 'service', 'specialty', 'offer'],
            answer: `We handle many legal matters:<br><br>
⚖️ <strong>Criminal Defense</strong><br>
🏢 <strong>Corporate Law</strong><br>
👨‍👩‍👧 <strong>Family Law</strong><br>
💰 <strong>Personal Injury</strong><br>
📜 <strong>Estate Planning</strong><br>
🏠 <strong>Real Estate Law</strong><br><br>
Which interests you?`
        },
        {
            keywords: ['consultation', 'free', 'meeting', 'schedule'],
            answer: `<strong>Yes! FREE 30-minute consultation!</strong> 🎯<br><br>
📞 Call: (505) 555-0199<br>
✉️ Email: contact@saulgoodmanlaw.com<br><br>
Mon-Fri 8AM-7PM, Sat 9AM-4PM`
        },
        {
            keywords: ['fee', 'cost', 'much', 'price', 'payment'],
            answer: `<strong>Fees depend on case complexity.</strong><br><br>
💰 Hourly, flat fee, or contingency<br>
✓ Payment plans available<br>
✓ Free consultation for estimate<br><br>
What type of case?`
        },
        {
            keywords: ['contact', 'phone', 'email', 'address', 'location'],
            answer: `<strong>Contact us:</strong><br><br>
📍 9800 Montgomery Blvd NE, Suite 200<br>
Albuquerque, NM 87111<br><br>
📞 (505) 555-0199 (24/7)<br>
✉️ contact@saulgoodmanlaw.com`
        },
        {
            keywords: ['criminal', 'defense', 'dui', 'arrest', 'charge'],
            answer: `<strong>Criminal Defense is our specialty!</strong> ⚖️<br><br>
Jimmy McGill leads with 15+ years experience.<br><br>
🔹 DUI, drugs, assault, theft<br>
🔹 24/7 emergency availability<br><br>
📞 (505) 555-0199`
        },
        {
            keywords: ['attorney', 'lawyer', 'team', 'who'],
            answer: `<strong>Three skilled attorneys:</strong><br><br>
👔 Jimmy McGill - Criminal (15+ yrs)<br>
👩‍💼 Kim Wexler - Corporate (12+ yrs)<br>
🏛️ Howard Hamlin - Managing (25+ yrs)<br><br>
1800+ cases handled!`
        },
        {
            keywords: ['hello', 'hi', 'hey', 'start'],
            answer: `<strong>Hello! Welcome to Saul Goodman!</strong> 👋<br><br>
Ask me about:<br>
• Practice areas<br>
• Fees<br>
• Consultations<br><br>
How can I help?`
        },
        {
            keywords: ['thank', 'thanks'],
            answer: `<strong>You're welcome!</strong> 😊<br><br>
📞 (505) 555-0199<br>
✉️ contact@saulgoodmanlaw.com<br><br>
Better Call Saul!`
        }
    ];

    const defaultResponse = `For personalized help:<br><br>
📞 (505) 555-0199<br>
✉️ contact@saulgoodmanlaw.com<br><br>
Schedule a free consultation!`;

    // Get current time
    function getTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Add message to chat
    function addMessage(content, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message' + (isUser ? ' user-message' : ' bot-message');
        msgDiv.innerHTML = `
            <div class="message-avatar">${isUser ? '👤' : '⚖️'}</div>
            <div class="message-content">
                <div class="message-bubble"><p>${content}</p></div>
                <span class="message-time">${getTime()}</span>
            </div>
        `;
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">⚖️</div>
            <div class="message-content">
                <div class="message-bubble typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return typingDiv;
    }

    // Find response
    function getResponse(input) {
        const lower = input.toLowerCase();
        for (const entry of knowledgeBase) {
            const matches = entry.keywords.filter(k => lower.includes(k)).length;
            if (matches >= 1) return entry.answer;
        }
        return defaultResponse;
    }

    // Process user message
    function processMessage(message) {
        if (!message.trim()) return;

        addMessage(message, true);
        chatbotInput.value = '';

        const typing = showTyping();

        setTimeout(() => {
            typing.remove();
            addMessage(getResponse(message));
        }, 800 + Math.random() * 700);
    }

    // Send message function
    function sendMessage() {
        processMessage(chatbotInput.value);
    }

    // ===== EVENT LISTENERS =====

    // Open chat
    chatFloatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Opening chat...');
        chatbotModal.classList.add('active');
        setTimeout(() => chatbotInput.focus(), 100);
    });

    // Close chat
    if (closeChatbot) {
        closeChatbot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            chatbotModal.classList.remove('active');
        });
    }

    // Clear chat
    if (clearChatbot) {
        clearChatbot.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            chatbotMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar">⚖️</div>
                    <div class="message-content">
                        <div class="message-bubble">
                            <p>Chat cleared! How can I help?</p>
                        </div>
                        <span class="message-time">${getTime()}</span>
                    </div>
                </div>
            `;
        });
    }

    // Send button
    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sendMessage();
        });
    }

    // Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            e.stopPropagation();
            if (e.key === 'Enter') sendMessage();
        });
    }

    // Quick replies
    if (chatbotQuickReplies) {
        const buttons = chatbotQuickReplies.querySelectorAll('.quick-reply-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const query = this.getAttribute('data-query');
                if (query) processMessage(query);
            });
        });
    }

    // Close on outside click
    chatbotModal.addEventListener('click', function(e) {
        if (e.target === chatbotModal) {
            chatbotModal.classList.remove('active');
        }
    });

    // Prevent close when clicking inside
    if (chatbotMessages) {
        chatbotMessages.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    const inputArea = document.querySelector('.chatbot-input-area');
    if (inputArea) {
        inputArea.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    const quickRepliesArea = document.querySelector('.chatbot-quick-replies');
    if (quickRepliesArea) {
        quickRepliesArea.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && chatbotModal.classList.contains('active')) {
            chatbotModal.classList.remove('active');
        }
    });

    console.log('Chatbot initialized successfully!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    // DOM already loaded - run immediately
    initChatbot();
}
