import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaShoppingBag, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useCart } from "../context/CartContext";
import apiClient from "../services/apiClient";
import { toast } from "react-toastify";

const QUICK_PROMPTS = [
  "Tư vấn chu trình cho da dầu mụn",
  "Cách phục hồi da khô bong tróc",
  "Có dùng chung Retinol và BHA được không?",
  "Gợi ý kem chống nắng kiềm dầu tốt nhất",
];

const AIAgentChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      sender: "ai",
      text: "Xin chào! Tôi là **Cosmetica AI Beauty Advisor** - Chuyên gia da liễu số của bạn. Hãy chia sẻ với tôi về tình trạng da của bạn hoặc loại mỹ phẩm bạn đang tìm kiếm nhé!",
      suggestedProducts: [],
      tips: ["Bạn có thể bấm vào các câu hỏi gợi ý bên dưới để được tư vấn tức thì."],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || loading) return;

    const userMsg = {
      id: "user-" + Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await apiClient.post("/ai/chat", {
        message: text,
      });

      const data = response.data?.data || response.data;
      const aiReply = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: data.reply || "Tôi đã tìm thấy những thông tin phù hợp cho bạn:",
        suggestedProducts: data.suggestedProducts || [],
        tips: data.tips || [],
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("Lỗi khi kết nối AI Agent:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "ai",
          text: "Hiện tại máy chủ AI đang bận. Bạn vui lòng thử lại sau giây lát hoặc liên hệ hotline để được tư vấn viên hỗ trợ trực tiếp nhé!",
          suggestedProducts: [],
          tips: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdd = (product) => {
    addToCart(product, 1);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`, {
      icon: "🛍️",
      position: "top-right",
      autoClose: 1500,
    });
  };

  const formatPrice = (val) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val);

  return (
    <>
      {/* 1. Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#C98A60] via-[#D4AF37] to-[#C98A60] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(201,138,96,0.45)] hover:shadow-[0_12px_32px_rgba(201,138,96,0.6)] hover:scale-105 transition-all duration-300 border border-white/30"
          >
            <div className="relative">
              <HiSparkles className="text-xl animate-spin text-amber-100" style={{ animationDuration: "6s" }} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>
            <span className="tracking-wide">AI Tư Vấn Da</span>
          </button>
        )}
      </div>

      {/* 2. Chat Modal Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] bg-[#FAF8F5] rounded-3xl shadow-[0_20px_60px_-15px_rgba(28,25,23,0.3)] border border-[#E7E5E4] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#1C1917] via-[#292524] to-[#1C1917] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C98A60] to-[#D4AF37] flex items-center justify-center text-white shadow-inner">
                <FaRobot size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  Cosmetica AI Advisor
                  <HiSparkles className="text-amber-300 text-xs" />
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Trực tuyến 24/7 • Chuẩn Y Khoa
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2.5 bg-white/70 border-b border-[#E7E5E4] overflow-x-auto flex gap-2 scrollbar-none">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#F7EFE9] border border-[#E7E5E4] hover:border-[#C98A60] text-stone-700 hover:text-[#C98A60] transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                {/* Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#C98A60] text-white rounded-br-xs shadow-sm font-medium"
                      : "bg-white text-stone-800 rounded-bl-xs border border-[#E7E5E4] shadow-xs"
                  }`}
                >
                  <p className="whitespace-pre-line m-0">{m.text}</p>

                  {/* Tips List */}
                  {m.tips && m.tips.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100 space-y-1">
                      {m.tips.map((tip, idx) => (
                        <div key={idx} className="text-[11px] text-amber-700 flex items-start gap-1.5 font-medium">
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Suggested Products inside Chat */}
                {m.suggestedProducts && m.suggestedProducts.length > 0 && (
                  <div className="w-full mt-2 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-stone-600 tracking-wider mb-1">
                      Sản phẩm đề xuất cho bạn:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {m.suggestedProducts.map((p) => (
                        <div
                          key={p.sku || p._id || p.id}
                          className="bg-white rounded-xl border border-stone-200 p-2.5 flex items-center justify-between gap-3 shadow-xs hover:border-[#C98A60]/50 transition-all"
                        >
                          <img
                            src={p.image || "/img/San Pham/SP1.jpg"}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-lg border border-stone-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <h4 className="text-[11px] font-bold text-stone-900 truncate m-0">
                              {p.name}
                            </h4>
                            <p className="text-[10px] text-stone-600 m-0 truncate">
                              Thương hiệu: {p.brand || "COSMETICA"}
                            </p>
                            <p className="text-xs font-bold text-[#C98A60] m-0">
                              {formatPrice(p.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleQuickAdd(p)}
                            className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#C98A60] text-[#C98A60] hover:text-white border border-[#E7E5E4] transition-colors shrink-0"
                            title="Thêm vào giỏ hàng"
                          >
                            <FaShoppingBag size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-stone-600 text-xs py-2">
                <div className="w-2 h-2 rounded-full bg-[#C98A60] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#C98A60] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#C98A60] animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[11px] italic">Chuyên gia AI đang phân tích dữ liệu da liễu...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#E7E5E4] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Hỏi về da dầu mụn, thành phần mỹ phẩm..."
              className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF8F5] border border-stone-300 focus:outline-none focus:border-[#C98A60] text-xs text-stone-800 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#C98A60] to-[#D4AF37] hover:brightness-105 disabled:opacity-50 text-white flex items-center justify-center transition-all shrink-0"
            >
              <FaPaperPlane size={12} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIAgentChatModal;
