'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Smile, MessageSquareText, Phone } from 'lucide-react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '¡Hola! 👋 Soy Leo, tu asistente. ¿Cómo te puedo ayudar hoy?',
    },
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    '📞 Solicitar presupuesto',
    '🏢 Ver servicios',
    '⏰ Horarios',
    '💬 Contacto directo',
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', text: input }]);

    setTimeout(() => {
      let botResponse = '';
      if (input.toLowerCase().includes('presupuesto')) {
        botResponse = 'Perfecto! Puedo ayudarte con eso. ¿Cuál es el área que necesitas limpiar? 📐';
      } else if (input.toLowerCase().includes('servicio')) {
        botResponse = 'Ofrecemos limpieza corporativa, residencial, industrial y más. ¿Cuál te interesa? 🏭';
      } else if (input.toLowerCase().includes('horario')) {
        botResponse = 'Estamos disponibles de lunes a domingo. ¿Necesitas un horario específico? ⏰';
      } else {
        botResponse = '¡Excelente pregunta! Déjame conectarte con un especialista. 👨‍💼';
      }

      setMessages((prev) => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);

    setInput('');
  };

  const handleQuickReply = (reply: string) => {
    setMessages([...messages, { type: 'user', text: reply }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          text: 'Perfecto! Te voy a conectar con nuestro equipo. Puedes también escribir directamente en WhatsApp. 📱',
        },
      ]);
    }, 500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <motion.a
          href="https://wa.me/593999999999"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.45)]"
          aria-label="WhatsApp"
        >
          <Phone size={28} />
        </motion.a>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 shadow-[0_18px_40px_rgba(251,191,36,0.45)]"
          aria-label="Abrir chat"
        >
          <AnimatePresence>
            {!isOpen && <MessageSquareText size={28} />}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-40 border border-gray-200"
          >
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                  <Smile size={20} />
                </div>
                <div>
                  <p className="font-bold">Leo - Tu Asistente</p>
                  <p className="text-xs text-gray-800">Siempre disponible 🌟</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-yellow-600 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="px-4 py-2 space-y-2 border-t border-gray-200">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickReply(reply)}
                  className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-yellow-100 text-gray-800 rounded-lg transition-colors text-left font-medium"
                >
                  {reply}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="p-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg hover:shadow-lg transition-shadow"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
