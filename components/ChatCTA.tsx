'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageCircle, Send, ArrowRight, Mail, Sparkles } from 'lucide-react';

// Typing Indicator Component
const TypingIndicator = () => (
  <motion.div
    className="flex items-center gap-1 px-4 py-3 bg-gray-100 rounded-2xl w-fit"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.2 }}
  >
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-[#FF7F3E] rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          delay: i * 0.12,
        }}
      />
    ))}
  </motion.div>
);

// Chat Container with message state management
const ChatContainer = ({ messages, conversationKey }: { messages: any[]; conversationKey: number }) => {
  const [visibleMessages, setVisibleMessages] = useState<boolean[]>([]);
  const [typingIndex, setTypingIndex] = useState<number>(-1);

  useEffect(() => {
    // Reset state when conversation changes
    setVisibleMessages(new Array(messages.length).fill(false));
    setTypingIndex(-1);

    // Schedule message reveals
    messages.forEach((msg, index) => {
      // Show typing indicator
      const typingTimer = setTimeout(() => {
        setTypingIndex(index);
      }, msg.delay - 600);

      // Show actual message
      const messageTimer = setTimeout(() => {
        setVisibleMessages(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
        setTypingIndex(-1);
      }, msg.delay);

      return () => {
        clearTimeout(typingTimer);
        clearTimeout(messageTimer);
      };
    });
  }, [conversationKey, messages]);

  return (
    <div className="space-y-4 md:space-y-5">
      {messages.map((msg, index) => (
        <div key={`${conversationKey}-${index}`} className="min-h-[60px] md:min-h-[70px]">
          {/* Show typing indicator for current message */}
          <AnimatePresence mode="wait">
            {typingIndex === index && !visibleMessages[index] && (
              <motion.div
                className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TypingIndicator />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual message */}
          <motion.div
            className={`flex gap-2 md:gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: visibleMessages[index] ? 1 : 0,
              y: visibleMessages[index] ? 0 : 10,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0 ${
                msg.isMe 
                  ? 'bg-gradient-to-br from-[#FF7F3E] to-[#FFB67B]' 
                  : 'bg-gradient-to-br from-[#3AB0FF] to-[#7DD3FC]'
              }`}
            >
              {msg.avatar}
            </div>

            {/* Message Content */}
            <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} max-w-[75%] md:max-w-[70%]`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs md:text-sm font-semibold text-[#1F2937]">{msg.sender}</span>
                <span className="text-[10px] md:text-xs text-[#9CA3AF]">{msg.time}</span>
              </div>
              <div
                className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.isMe
                    ? 'bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] text-white rounded-tr-sm'
                    : 'bg-gray-100 text-[#1F2937] rounded-tl-sm'
                }`}
              >
                {msg.message}
              </div>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default function ChatCTA() {
  const [currentConversation, setCurrentConversation] = useState(0);
  const [key, setKey] = useState(0);

  const conversations = [
    {
      channel: "#new-project",
      messages: [
        {
          sender: "You",
          avatar: "Y",
          message: "Hey Dhananjay! We need a full-stack developer for our startup. Are you available?",
          time: "2m ago",
          isMe: false,
          delay: 500,
        },
        {
          sender: "Dhananjay",
          avatar: "DK",
          message: "Hi! Yes, I'd love to hear about your project. What tech stack are you looking at? 🚀",
          time: "1m ago",
          isMe: true,
          delay: 2500,
        },
        {
          sender: "You",
          avatar: "Y",
          message: "We're building a SaaS platform. Need Node.js, React, and MongoDB expertise.",
          time: "just now",
          isMe: false,
          delay: 4500,
        },
      ],
    },
    {
      channel: "#freelance",
      messages: [
        {
          sender: "Startup",
          avatar: "ST",
          message: "We loved your portfolio! Can you help us build an API for our mobile app?",
          time: "3m ago",
          isMe: false,
          delay: 500,
        },
        {
          sender: "Dhananjay",
          avatar: "DK",
          message: "Thanks! I specialize in scalable REST APIs. Let's discuss your requirements 💪",
          time: "2m ago",
          isMe: true,
          delay: 2500,
        },
        {
          sender: "Startup",
          avatar: "ST",
          message: "Perfect! When can we schedule a call?",
          time: "just now",
          isMe: false,
          delay: 4500,
        },
      ],
    },
    {
      channel: "#collaboration",
      messages: [
        {
          sender: "Dev Team",
          avatar: "DT",
          message: "Your Evolve AI project is impressive! Would you like to collaborate on an open-source project?",
          time: "5m ago",
          isMe: false,
          delay: 500,
        },
        {
          sender: "Dhananjay",
          avatar: "DK",
          message: "Absolutely! I'm always excited about open-source contributions. What's the project? 🔥",
          time: "3m ago",
          isMe: true,
          delay: 2500,
        },
        {
          sender: "Dev Team",
          avatar: "DT",
          message: "It's a developer tools platform. Your microservices experience would be valuable!",
          time: "just now",
          isMe: false,
          delay: 4500,
        },
      ],
    },
    {
      channel: "#hiring",
      messages: [
        {
          sender: "HR Manager",
          avatar: "HR",
          message: "Hi Dhananjay! We have a backend developer position. Your hackathon wins caught our attention!",
          time: "4m ago",
          isMe: false,
          delay: 500,
        },
        {
          sender: "Dhananjay",
          avatar: "DK",
          message: "Thanks for reaching out! I'm open to opportunities. What's the role about? ✨",
          time: "2m ago",
          isMe: true,
          delay: 2500,
        },
        {
          sender: "HR Manager",
          avatar: "HR",
          message: "Remote position, working with Node.js and microservices. Great team culture!",
          time: "just now",
          isMe: false,
          delay: 4500,
        },
      ],
    },
  ];

  // Cycle through conversations
  useEffect(() => {
    const conversationDuration = 7000;
    const interval = setInterval(() => {
      setCurrentConversation((prev) => (prev + 1) % conversations.length);
      setKey((prev) => prev + 1);
    }, conversationDuration);

    return () => clearInterval(interval);
  }, [conversations.length]);

  const current = conversations[currentConversation];

  return (
    <section className="py-16 md:py-24 lg:py-32 relative bg-[#F9F9F9] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-20 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-[#FF7F3E]/10 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-tr from-[#3AB0FF]/10 to-transparent rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1F2937] text-white text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <MessageCircle className="w-4 h-4" />
            Let's Connect
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1F2937] mb-4">
            Start a <span className="text-[#FF7F3E]">Conversation</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#4B5563] max-w-2xl mx-auto">
            Whether it's a project, collaboration, or just a chat about tech — I'm always excited to connect!
          </p>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          className="max-w-xl md:max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-ping opacity-50"></div>
                </div>
                <motion.span 
                  key={current.channel}
                  className="font-semibold text-sm md:text-base text-[#1F2937]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {current.channel}
                </motion.span>
              </div>
              <span className="text-xs md:text-sm text-[#6B7280] flex items-center gap-1">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#FF7F3E]" />
                Live
              </span>
            </div>

            {/* Chat Messages - Fixed Height Container */}
            <div className="p-4 md:p-6 h-[290px] md:h-[340px] overflow-hidden">
              <ChatContainer 
                messages={current.messages} 
                conversationKey={key}
              />
            </div>

            {/* Chat Input (Decorative) */}
            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex-1 bg-white rounded-xl md:rounded-2xl px-3 md:px-4 py-2 md:py-3 border border-gray-200 text-sm md:text-base text-[#9CA3AF]">
                  Type your message...
                </div>
                <motion.button
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] flex items-center justify-center shadow-lg shadow-orange-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Conversation Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {conversations.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  index === currentConversation
                    ? 'w-6 md:w-8 bg-[#FF7F3E]'
                    : 'w-1.5 md:w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-10 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#1F2937] text-white rounded-xl md:rounded-2xl font-semibold text-sm md:text-base shadow-xl shadow-gray-900/20 hover:bg-[#374151] transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5" />
            Get in Touch
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
