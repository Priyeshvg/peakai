import React from 'react';
import { X, Mail, Phone } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  const handleEmailClick = () => {
    window.open('mailto:purvi@thepeakai.com?subject=First 100 Contacts for ₹11 - Special Offer&body=Hi, I\'m interested in the first 100 contacts for ₹11 offer. Can you help me get started?', '_blank');
    onClose();
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi, I\'m interested in the first 100 contacts for ₹11 offer. Can you help me get started?');
    window.open(`https://wa.me/919008227180?text=${message}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-500 hover:text-brand-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎉</span>
          </div>
          <h3 className="text-2xl font-bold text-brand-900 mb-2">
            Get First 100 Contacts for ₹11!
          </h3>
          <p className="text-brand-700">
            Choose how you'd like to get started with our special offer
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleEmailClick}
            className="w-full bg-accent-600 text-white p-4 rounded-xl hover:bg-accent-700 transition-colors flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            <Mail className="w-6 h-6" />
            <span>Email Us</span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-accent-600 text-white p-4 rounded-xl hover:bg-accent-700 transition-colors flex items-center justify-center space-x-3 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            <Phone className="w-6 h-6" />
            <span>WhatsApp Us</span>
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-brand-500">
          <p>📧 purvi@thepeakai.com</p>
          <p>📱 +91 9008227180</p>
        </div>
      </div>
    </div>
  );
}