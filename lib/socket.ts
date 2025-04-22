// utils/socket.ts
import { MenuItem } from "@/types/menu-types";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = () => {
  if (typeof window !== "undefined" && !socket) {
    socket = io("http://localhost:5500", {
      withCredentials: true,
    });

    // ✅ Log successful connection
    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);
    });

    // Optional: handle connection errors
    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    // Optional: listen for the custom welcome event from backend
    socket.on("connected", (data) => {
      console.log("🟢 Server says:", data.message);
    });
  }
};

export const subscribeToMenuUpdates = (callback: (menu: MenuItem) => void) => {
  if (socket) {
    socket.on("menuUpdated", callback); // Listen for menu update event
  }
};

export const unsubscribeFromMenuUpdates = () => {
  if (socket) {
    socket.off("menuUpdated"); // Stop listening for menu updates
  }
};

export const subscribeToMenuCreated = (callback: (menu: MenuItem) => void) => {
  if (socket) {
    socket.on("menuUpdated", callback); // Listen for menu created event
  }
};

export const unsubscribeFromMenuCreated = () => {
  if (socket) {
    socket.off("menuUpdated"); // Stop listening for menu created
  }
};
