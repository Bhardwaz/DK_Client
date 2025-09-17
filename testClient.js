import { io } from "socket.io-client";

const socket = io("http://localhost:4001", {
  auth: { sender: "debug-client" },
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
  socket.emit("chat:delivered", { msgId: "123" });
});

socket.on("connect_error", (err) => {
  console.error("❌ Connect error:", err.message);
});

socket.onAny((event, ...args) => {
  console.log("📩 Event:", event, args);
});
