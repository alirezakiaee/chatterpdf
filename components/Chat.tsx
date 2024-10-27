"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
// import ChatMessage from "./ChatMessage";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { askQuestion } from "@/actions/askQuestion";

export type Message = {
  id?: string;
  role: "human" | "ai" | "placeholder";
  message: string;
  createdAt: Date;
};
function Chat({ id }: { id: string }) {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  useEffect(() => {
    if (!snapshot) return;
    console.log("Updated snapshot", snapshot.docs);

    const lastMessage = messages.pop();
    if (lastMessage?.role === "ai" && lastMessage.message === "Thinking...") {
      // return as this is a dummy placeholder message return;
    }

    const newMessages = snapshot.docs.map((doc) => {
      const { role, message, createdAt } = doc.data();
      return {
        id: doc.id,
        role,
        message,
        createdAt: createdAt.toDate(),
      };
    });
    setMessages(newMessages);

    // Ignore messages dependancy warning here ... we don't want an infinite loop
  }, [snapshot]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = input;
    setInput("");

    //optimistic ui update
    setMessages((prev) => [
      ...prev,
      {
        role: "human",
        message: q,
        createdAt: new Date(),
      },
      {
        role: "ai",
        message: "Thinking...",
        createdAt: new Date(),
      },
    ]);
    startTransition(async () => {
      const { success, message } = await askQuestion(id, q);

      if (!success) {
        // toast...
        setMessages((prev) =>
          prev.slice(0, prev.length - 1).concat([
            {
              role: "ai",
              message: `Whoops... ${message}`,
              createdAt: new Date(),
            },
          ])
        );
      }
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-scroll">
      {/* Chat content */}
      <div className="flex-1 w-full">
        {/* Chat messages */}

        {loading && (
          <div className="flex items-center justify-center h-full">
            <Loader2Icon className="w-6 h-6 animate-spin" />
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "human" ? "justify-end" : ""}`}
          >
            <div
              className={`${
                message.role === "human"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100"
              } p-4 rounded-lg m-3`}
            >
              <p
                className={`text-sm ${
                  message.role === "human"
                    ? "text-right text-white-600"
                    : "text-left"
                }`}
              >
                {message.message}
              </p>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 space-x-2 items-center bg-indigo-600 p-5"
      >
        <Input
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-slate-100 "
        />
        <Button type="submit" disabled={!input || isPending}>
          {isPending ? <Loader2Icon className="w-6 h-6 animate-spin" /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}

export default Chat;
