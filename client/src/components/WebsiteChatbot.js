import React, { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import './WebsiteChatbot.css';

const greeting = {
  role: 'assistant',
  content: 'नमस्ते! मैं कुंडू नेचुरल्स का सहायक हूँ। हमारे उत्पादों या व्यवसाय के बारे में पूछें।\nHi! I’m the Kundu Naturals assistant. Ask me about our products or business.',
};

function WebsiteChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const messageListRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      messageListRef.current?.scrollTo({
        top: messageListRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [isOpen, messages, isSending]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || isSending || content.length > 500) return;

    const nextMessages = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => message !== greeting)
            .slice(-8)
            .map(({ role, content: messageContent }) => ({ role, content: messageContent })),
        }),
      });
      const result = await response.json();

      if (!response.ok || !result?.success || typeof result.answer !== 'string') {
        throw new Error(result?.message || 'Could not send your message. Please try again.');
      }

      setMessages((current) => [...current, { role: 'assistant', content: result.answer }]);
    } catch (requestError) {
      setError(requestError.message || 'Could not send your message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`website-chatbot ${isOpen ? 'is-open' : ''}`}>
      {isOpen && (
        <section className="website-chat-panel" aria-label="Kundu Naturals chat">
          <header className="website-chat-header">
            <span className="website-chat-avatar" aria-hidden="true"><img src="/chatbot-icon-40.png" alt="" className="website-chat-avatar-img" /></span>
            <div className="website-chat-heading">
              <strong>Kundu Naturals</strong>
              <span><span className="website-chat-status-dot" /> Online assistant</span>
            </div>
            <button
              type="button"
              className="website-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>

          <div className="website-chat-messages" ref={messageListRef} aria-live="polite">
            <div className="website-chat-intro">
              <Sparkles size={14} aria-hidden="true" />
              <span>Ask about our products and business</span>
            </div>
            {messages.map((message, index) => (
              <div
                className={`website-chat-message ${message.role === 'user' ? 'from-user' : 'from-assistant'}`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </div>
            ))}
            {isSending && (
              <div className="website-chat-message from-assistant website-chat-typing" role="status">
                <span /><span /><span /><span className="sr-only">Assistant is replying</span>
              </div>
            )}
          </div>

          {error && <p className="website-chat-error" role="alert">{error}</p>}

          <form className="website-chat-form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="website-chat-input">Ask Kundu Naturals</label>
            <input
              id="website-chat-input"
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              maxLength={500}
              disabled={isSending}
              autoComplete="off"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={isSending || !input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
          <p className="website-chat-footnote">For current prices and availability, please contact us.</p>
        </section>
      )}

      <button
        type="button"
        className="website-chat-launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close Kundu Naturals chat' : 'Chat with Kundu Naturals'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <svg className="website-chat-launcher-icon" viewBox="0 0 32 32" aria-hidden="true">
              <rect x={4} y={4} width={24} height={24} rx={8} fill="#ffffff" />
              <circle cx={12} cy={14} r={1.5} fill="#2b3a4f" />
              <circle cx={20} cy={14} r={1.5} fill="#2b3a4f" />
              <path d="M12 20 Q16 24 20 20" stroke="#2b3a4f" strokeWidth={2} strokeLinecap="round" fill="none" />
            </svg>
            {!isOpen && <span className="website-chat-launcher-label">Ask us</span>}
          </>
        )}
      </button>
    </div>
  );
}

export default WebsiteChatbot;
