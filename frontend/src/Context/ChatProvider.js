import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
	return <ChatContext.Provider>{children}</ChatContext.Provider>;
};

export default ChatProvider;
