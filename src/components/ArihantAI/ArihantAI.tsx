import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import gsap from "gsap";

import {
  queryPortfolio,
  type PortfolioQueryResult,
} from "../../data/portfolioQuery";
import "./ArihantAI.css";

type MessageRole = "assistant" | "user";

interface ConversationMessage {
  id: string;
  role: MessageRole;
  text: string;
  suggestions?: string[];
  intent?: PortfolioQueryResult["intent"];
}

interface ArihantAIProps {
  isOpen: boolean;
  onClose: () => void;
}

const starterQuestions = [
  "Who are you?",
  "What skills do you have?",
  "What projects use React?",
  "Tell me about the Portfolio Website",
];

function ArihantAI({ isOpen, onClose }: ArihantAIProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: createMessageId(idRef),
          role: "assistant",
          text: "I’m Arihant’s portfolio knowledge engine. Ask about skills, projects, technologies, or experience.",
          suggestions: starterQuestions,
          intent: "about",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useLayoutEffect(() => {
    const panel = panelRef.current;

    if (!panel || !shouldRender) {
      return;
    }

    if (isOpen) {
      gsap.set(panel, {
        opacity: 0,
        scale: 0.18,
        yPercent: -50,
        xPercent: -50,
      });

      gsap.to(panel, {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
      });

      gsap.fromTo(
        panel.querySelectorAll(".arihant-ai__message, .arihant-ai__suggestion"),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.12,
        }
      );
      return;
    }

    gsap.to(panel, {
      opacity: 0,
      scale: 0.3,
      duration: 0.32,
      ease: "power2.in",
      onComplete: () => setShouldRender(false),
    });
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!conversationRef.current || messages.length === 0) {
      return;
    }

    conversationRef.current.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });

    const lastMessage = conversationRef.current.querySelector(
      ".arihant-ai__message:last-child"
    );

    if (lastMessage) {
      gsap.fromTo(
        lastMessage,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
      );
    }
  }, [messages]);

  if (!shouldRender) {
    return null;
  }

  const submitQuestion = (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    const result = queryPortfolio(trimmedQuestion);

    setMessages((current) => [
      ...current,
      {
        id: createMessageId(idRef),
        role: "user",
        text: trimmedQuestion,
      },
      {
        id: createMessageId(idRef),
        role: "assistant",
        text: result.answer,
        suggestions: result.suggestions,
        intent: result.intent,
      },
    ]);

    setInputValue("");
  };

  return (
    <div
      ref={panelRef}
      className="arihant-ai"
      aria-hidden={!isOpen}
      aria-label="Ask Arihant interface"
    >
      <div className="arihant-ai__shell">
        <div className="arihant-ai__header">
          <div>
            <p className="arihant-ai__eyebrow">Ask Arihant</p>
            <h2 className="arihant-ai__title">Knowledge Engine</h2>
          </div>

          <button
            type="button"
            className="arihant-ai__close"
            onClick={onClose}
            aria-label="Close Ask Arihant"
          >
            Close
          </button>
        </div>

        <div ref={conversationRef} className="arihant-ai__conversation">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`arihant-ai__message arihant-ai__message--${message.role}`}
            >
              <p className="arihant-ai__speaker">
                {message.role === "assistant" ? "Arihant AI" : "You"}
              </p>
              <p className="arihant-ai__text">{message.text}</p>

              {message.role === "assistant" && message.suggestions?.length ? (
                <div className="arihant-ai__suggestions">
                  {message.suggestions.map((suggestion) => (
                    <button
                      key={`${message.id}-${suggestion}`}
                      type="button"
                      className="arihant-ai__suggestion"
                      onClick={() => submitQuestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="arihant-ai__composer">
          <div className="arihant-ai__quick-list">
            {starterQuestions.map((question) => (
              <button
                key={question}
                type="button"
                className="arihant-ai__quick-question"
                onClick={() => submitQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <form
            className="arihant-ai__form"
            onSubmit={(event) => {
              event.preventDefault();
              submitQuestion(inputValue);
            }}
          >
            <input
              className="arihant-ai__input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Ask about skills, projects, or technologies"
            />

            <button type="submit" className="arihant-ai__submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function createMessageId(idRef: MutableRefObject<number>): string {
  idRef.current += 1;
  return `message-${idRef.current}`;
}

export default ArihantAI;