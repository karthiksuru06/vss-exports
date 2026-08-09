import React from 'react';
import { MessageCircle } from 'lucide-react';

import { CONTACT_INFO, getWhatsAppUrl } from '../../utils/constants';

const WhatsAppButton = ({ phoneNumber = CONTACT_INFO.whatsapp }) => {
  const whatsappUrl = getWhatsAppUrl(phoneNumber);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={32} fill="white" />
      <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
