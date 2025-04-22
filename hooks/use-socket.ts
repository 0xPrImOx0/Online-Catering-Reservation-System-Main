// hooks/useSocket.ts
import {
  initSocket,
  subscribeToMenuCreated,
  subscribeToMenuUpdates,
  unsubscribeFromMenuCreated,
  unsubscribeFromMenuUpdates,
} from "@/lib/socket";
import { MenuItem } from "@/types/menu-types";
import { useEffect } from "react";

const useSocket = (onMenuChanges: (menu: MenuItem) => void) => {
  useEffect(() => {
    initSocket(); // Initialize socket connection

    // Subscribe to menu updates
    subscribeToMenuUpdates(onMenuChanges);
    subscribeToMenuCreated(onMenuChanges);

    // Clean up the socket event listener when component is unmounted
    return () => {
      unsubscribeFromMenuUpdates();
      unsubscribeFromMenuCreated();
    };
  }, [onMenuChanges]);
};

export default useSocket;
