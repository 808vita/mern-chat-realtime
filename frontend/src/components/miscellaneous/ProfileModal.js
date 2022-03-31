import React from "react";

import { useDisclosure } from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return <div>ProfileModal</div>;
};

export default ProfileModal;
