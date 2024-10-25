"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
// import { askQuestion, Message } from "@/actions/askQuestion";
import { Loader2Icon } from "lucide-react";
// import ChatMessage from "./ChatMessage";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

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

  const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    if (!snapshot) return;
    console.log("Updated snapshot", snapshot.docs);

    const lastMessage = messages.pop();
  }, [snapshot, messages]);

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
      <div className="flex-1 w-full">{/* Chat messages */}</div>

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
