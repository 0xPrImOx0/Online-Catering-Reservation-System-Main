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

const useSocket = ({
  onMenuUpdated,
  onMenuCreated,
}: {
  onMenuUpdated: (menu: MenuItem) => void;
  onMenuCreated: (menu: MenuItem) => void;
}) => {
  useEffect(() => {
    initSocket();

    subscribeToMenuUpdates(onMenuUpdated);
    subscribeToMenuCreated(onMenuCreated);

    return () => {
      unsubscribeFromMenuUpdates();
      unsubscribeFromMenuCreated();
    };
  }, [onMenuUpdated, onMenuCreated]);
};

export default useSocket;
