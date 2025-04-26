// hooks/useSocket.ts
import {
  initSocket,
  subscribeToMenuCreated,
  subscribeToMenuDeleted,
  subscribeToMenuUpdates,
  unsubscribeFromMenuCreated,
  unsubscribeFromMenuDeleted,
  unsubscribeFromMenuUpdates,
} from "@/lib/socket";
import { MenuItem } from "@/types/menu-types";
import { useEffect } from "react";

const useSocket = ({
  onMenuUpdated,
  onMenuCreated,
  onMenuDeleted,
}: {
  onMenuUpdated: (menu: MenuItem) => void;
  onMenuCreated: (menu: MenuItem) => void;
  onMenuDeleted: (menu: MenuItem) => void;
}) => {
  useEffect(() => {
    initSocket();

    subscribeToMenuUpdates(onMenuUpdated);
    subscribeToMenuCreated(onMenuCreated);
    subscribeToMenuDeleted(onMenuDeleted);

    return () => {
      unsubscribeFromMenuUpdates();
      unsubscribeFromMenuCreated();
      unsubscribeFromMenuDeleted();
    };
  }, [onMenuUpdated, onMenuCreated, onMenuDeleted]);
};

export default useSocket;
