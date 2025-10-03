import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Clock, Check } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered';
}

const supportResponses: Record<string, string> = {
  'hello': 'Hi there! 👋 I\'m here to help you with PeakAI. What questions do you have?',
  'hi': 'Hello! Welcome to PeakAI. How can I assist you today?',
  'pricing': 'Our pricing is simple: First 100 contacts for ₹11 each (56% off), then ₹25 per contact. Enterprise plans start at ₹15/contact with volume discounts.',
  'accuracy': 'PeakAI maintains a 91% accuracy rate, which is significantly higher than competitors (40-60%). We offer 100% credit refund for any incorrect numbers.',
  'how it works': 'Simply install our Chrome extension, visit any LinkedIn profile, and click the PeakAI icon. You\'ll get the phone number in 10 seconds!',
  'refund': 'We offer 100% credit refund for any wrong numbers - no questions asked. We stand behind our 91% accuracy guarantee.',
  'support': 'You can reach our support team at support@thepeakai.com or through this chat. We typically respond within 2-4 hours.',
  'trial': 'Try our free demo on this page! No registration required. For full access, install our Chrome extension.',
  'install': 'You can install PeakAI from the Chrome Web Store: https://chromewebstore.google.com/detail/jndeeioopbcflpclpfnflmekcddknoph',
  'enterprise': 'For enterprise plans (500+ contacts/month), contact us at support@thepeakai.com for custom pricing and dedicated support.',
  'default': 'Thanks for your question! For detailed assistance, please email us at support@thepeakai.com and we\'ll get back to you within 2-4 hours. 📧'
};

export function LiveChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 👋 I\'m your PeakAI assistant. Ask me about pricing, how it works, or anything else!',
      sender: 'support',
      timestamp: new Date(),
      status: 'delivered'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findBestResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(supportResponses)) {
      if (key !== 'default' && message.includes(key)) {
        return response;
      }
    }
    
    // Check for common variations
    if (message.includes('cost') || message.includes('price') || message.includes('₹')) {
      return supportResponses.pricing;
    }
    if (message.includes('work') || message.includes('use')) {
      return supportResponses['how it works'];
    }
    if (message.includes('accurate') || message.includes('correct')) {
      return supportResponses.accuracy;
    }
    if (message.includes('money back') || message.includes('guarantee')) {
      return supportResponses.refund;
    }
    if (message.includes('download') || message.includes('chrome')) {
      return supportResponses.install;
    }
    if (message.includes('bulk') || message.includes('volume') || message.includes('enterprise')) {
      return supportResponses.enterprise;
    }
    
    return supportResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = findBestResponse(inputValue);
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'support',
        timestamp: new Date(),
        status: 'delivered'
      };
      
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-accent-600 hover:bg-accent-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
            aria-label="Open chat support"
          >
            <MessageCircle className="w-6 h-6" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-600 rounded-full border-2 border-white animate-pulse"></div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap">
                Need help? Chat with us!
                <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 transform rotate-45 -mt-1"></div>
              </div>
            </div>
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl border border-brand-200 w-80 h-96 flex flex-col">
            {/* Header */}
            <div className="bg-accent-600 text-white px-4 py-3 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent-600 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">PeakAI Support</div>
                  <div className="text-xs text-white/90 flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                    Usually replies in minutes
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      message.sender === 'user'
                        ? 'bg-accent-600 text-white'
                        : 'bg-brand-200 text-brand-700'
                    }`}>
                      {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-accent-600 text-white rounded-br-sm'
                          : 'bg-brand-50 text-brand-900 rounded-bl-sm'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className={`text-xs text-brand-500 mt-1 flex items-center ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(message.timestamp)}
                        {message.sender === 'user' && message.status === 'sent' && (
                          <Check className="w-3 h-3 ml-1 text-accent-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2 max-w-xs">
                    <div className="w-6 h-6 rounded-full bg-brand-200 flex items-center justify-center">
                      <Bot className="w-3 h-3 text-brand-700" />
                    </div>
                    <div className="bg-brand-50 rounded-2xl rounded-bl-sm px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-brand-200 p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-brand-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-accent-600 transition-colors"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-accent-600 text-white rounded-full p-2 hover:bg-accent-700 transition-colors disabled:bg-brand-600 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-brand-500 mt-2 text-center">
                For complex queries, email: support@thepeakai.com
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}