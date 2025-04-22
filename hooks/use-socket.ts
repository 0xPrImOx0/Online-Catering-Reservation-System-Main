// hooks/useSocket.ts
import {
  initSocket,
  subscribeToMenuUpdates,
  unsubscribeFromMenuUpdates,
} from "@/lib/socket";
import { MenuItem } from "@/types/menu-types";
import { useEffect } from "react";

const useSocket = (onMenuUpdated: (menu: MenuItem) => void) => {
  useEffect(() => {
    initSocket(); // Initialize socket connection

    // Subscribe to menu updates
    subscribeToMenuUpdates(onMenuUpdated);

    // Clean up the socket event listener when component is unmounted
    return () => {
      unsubscribeFromMenuUpdates();
    };
  }, [onMenuUpdated]);
};

export default useSocket;
