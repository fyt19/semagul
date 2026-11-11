"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { whatsappPresets } from "@/lib/constants";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

const WELCOME_MESSAGE =
  "Merhaba! Ben Öğr. Gör. Dr. Sema Gül klinik asistanıyım. Randevu, ücret veya adres hakkında size yardımcı olabilirim. Nasıl destek olmamı istersiniz?";

const BOT_REPLIES: Record<string, string> = {
  appointment:
    "Randevu talebinizi aldım. Uygun gün ve saatleri birlikte belirlemek için WhatsApp üzerinden devam edelim.",
  pricing:
    "Manuel terapi ve ücretler hakkında detaylı bilgi için WhatsApp hattımıza yönlendiriyorum.",
  location:
    "Klinik adresimiz ve ulaşım bilgilerini WhatsApp üzerinden paylaşacağım.",
  treatment:
    "Tedavi ve rehabilitasyon süreci hakkında bilgi için WhatsApp üzerinden devam edelim.",
};

function formatCustomWhatsAppMessage(text: string, name: string) {
  return `Merhaba Fzt. ${name}, ${text} konusunda yardım almak istiyorum.`;
}

export function WhatsAppWidget() {
  const config = useSiteConfig();

  const getWhatsAppUrl = (message: string) =>
    `https://wa.me/${config.phoneRaw}?text=${encodeURIComponent(message)}`;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [pendingWhatsApp, setPendingWhatsApp] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, pendingWhatsApp]);

  useEffect(() => {
    if (!isOpen) return;

    setMessages([]);
    setPendingWhatsApp(null);
    setCustomMessage("");
    setIsTyping(true);

    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages([
        { id: "welcome", role: "bot", text: WELCOME_MESSAGE },
      ]);
    }, 900);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const openWhatsApp = (message: string) => {
    window.open(getWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setMessages([]);
    setPendingWhatsApp(null);
    setCustomMessage("");
  };

  const addBotReply = (reply: string, whatsappMessage: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, role: "bot", text: reply },
      ]);
      setPendingWhatsApp(whatsappMessage);
    }, 700);
  };

  const handlePreset = (label: string, message: string, id: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text: label },
    ]);
    setPendingWhatsApp(null);
    addBotReply(BOT_REPLIES[id] ?? "Size yardımcı olmak için WhatsApp hattımıza yönlendiriyorum.", message);
  };

  const handleCustomSend = () => {
    const text = customMessage.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", text },
    ]);
    setCustomMessage("");
    addBotReply(
      "Mesajınızı aldım. En kısa sürede WhatsApp üzerinden yanıtlayacağız.",
      formatCustomWhatsAppMessage(text, config.name),
    );
  };

  const directWhatsAppUrl = getWhatsAppUrl(config.whatsappMessage);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl shadow-navy-900/20 ring-1 ring-slate-200/80"
              role="dialog"
              aria-label="Canlı sohbet asistanı"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] px-4 py-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                      <WhatsAppIcon className="h-5 w-5 text-white" />
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#128C7E] bg-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Fzt. {config.name}
                      </p>
                      <p className="text-xs text-emerald-100">
                        Canlı Asistan · Çevrimiçi
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Sohbeti kapat"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex h-80 flex-col bg-[#ECE5DD]">
                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                          msg.role === "user"
                            ? "rounded-tr-sm bg-[#DCF8C6] text-slate-800"
                            : "rounded-tl-sm bg-white text-slate-700",
                        )}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}

                  {pendingWhatsApp && !isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-center pt-1"
                    >
                      <button
                        type="button"
                        onClick={() => openWhatsApp(pendingWhatsApp)}
                        className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#20BD5A]"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        WhatsApp&apos;ta Devam Et
                      </button>
                    </motion.div>
                  )}

                  {!isTyping &&
                    messages.length === 1 &&
                    !pendingWhatsApp && (
                      <div className="space-y-2 pt-1">
                        {whatsappPresets.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() =>
                              handlePreset(
                                preset.label,
                                preset.message,
                                preset.id,
                              )
                            }
                            className="block w-full rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-left text-sm font-medium text-navy-900 shadow-sm transition-all hover:border-[#25D366]/40 hover:bg-[#25D366]/5"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-slate-200/60 bg-[#F0F0F0] px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Mesajınızı yazın..."
                      className="h-10 flex-1 rounded-full border-0 bg-white px-4 text-sm text-slate-800 shadow-sm outline-none ring-1 ring-slate-200/80 placeholder:text-slate-400 focus:ring-2 focus:ring-[#25D366]/40"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCustomSend();
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleCustomSend}
                      disabled={!customMessage.trim()}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#20BD5A] disabled:opacity-40"
                      aria-label="Mesaj gönder"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating pill: WhatsApp icon = direct link, text = open assistant */}
        <motion.div
          className="flex h-14 items-center overflow-hidden rounded-full bg-primary-dark text-white shadow-xl shadow-primary-dark/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-14 shrink-0 items-center justify-center bg-[#25D366] transition-colors hover:bg-[#20BD5A]"
            aria-label="WhatsApp ile doğrudan iletişime geç"
            onClick={(e) => e.stopPropagation()}
          >
            <WhatsAppIcon className="h-6 w-6 text-white" />
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-full items-center gap-2 px-4 pr-5 transition-colors hover:bg-navy-800 sm:px-5"
            aria-label={isOpen ? "Asistanı kapat" : "Canlı asistanı aç"}
            aria-expanded={isOpen}
          >
            <span className="text-sm font-semibold">Canlı Asistan</span>
            {!isOpen && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
              </span>
            )}
          </button>
        </motion.div>
      </div>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy-900/20 backdrop-blur-[2px] sm:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
