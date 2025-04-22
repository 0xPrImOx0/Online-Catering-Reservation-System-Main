// utils/socket.ts
import { MenuItem } from "@/types/menu-types";
import { io, Socket } from "socket.io-client";

let socket: Socket;

const SOCKET_URL = "http://localhost:5500"; // Adjust your backend URL here

export const initSocket = () => {
  if (typeof window !== "undefined") {
    socket = io(SOCKET_URL, {
      transports: ["websocket"], // Use WebSocket for communication
      withCredentials: true, // Enable cookie-based authentication if necessary
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
