
import React, { useState, useRef, useEffect } from 'react';
import { Send, Camera, User, Bot, Sparkles, Loader2 } from 'lucide-react';
import { getPlantAdvice } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

const PlantDoctor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to Rooty's diagnosis room. Whether you're nurturing your first houseplant or leading large-scale plantation drives, describe the symptoms or share a photo and I will guide you."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const advice = await getPlantAdvice(input);
    const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: advice || "I am currently disconnected from the root network. Please try again later." };
    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl flex flex-col h-[650px] overflow-hidden">
      <div className="bg-[#769056] p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-md">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg serif-title leading-none mb-1">Rooty Botanist AI</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Expert Care Advisor</span>
            </div>
          </div>
        </div>
        <Sparkles size={22} className="text-white/40" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'bg-[#769056] border-[#769056] text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm font-medium ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none italic'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] flex gap-4 flex-row items-center">
              <div className="w-9 h-9 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[#769056]">
                <Loader2 size={18} className="animate-spin" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Consulting soil data...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 bg-white border-t border-slate-100">
        <div className="flex gap-3">
          <button className="p-3 text-slate-400 hover:text-[#769056] hover:bg-slate-50 rounded-2xl transition-all">
            <Camera size={22} />
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your plant's symptoms..."
              className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-1 focus:ring-[#769056] outline-none pr-14 text-slate-800 font-medium"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#769056] text-white rounded-xl hover:bg-[#8ba668] transition-all shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        <p className="text-[9px] text-slate-300 text-center mt-4 uppercase tracking-[0.2em] font-black">Environmental Intelligence by Rooted AI</p>
      </div>
    </div>
  );
};

export default PlantDoctor;
