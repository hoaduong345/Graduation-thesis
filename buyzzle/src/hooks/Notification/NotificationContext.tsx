import React, { createContext, useContext } from "react";

export default function useNotificationContext() {
  return <div>NotificationContextProvider</div>;
}
type NotificationContextType = ReturnType<typeof useNotificationContext>;

export const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
);

export const useNotification = () => useContext(NotificationContext);
