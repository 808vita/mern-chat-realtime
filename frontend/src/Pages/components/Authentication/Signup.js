import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";

import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";

const Signup = () => {
	const toast = useToast();
	const history = useHistory();

	const [show, setShow] = useState(false);

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [confirmpassword, setConfirmpassword] = useState();
	const [password, setPassword] = useState();
	const [pic, setPic] = useState(
		"https://avatars.githubusercontent.com/u/97225946?v=4"
	);

	const handleClick = () => {
		setShow(!show);
	};

	const submitHandler = async () => {
		if (!name || !email || !password || !confirmpassword) {
			toast({
				title: "Please Fill all the Feilds",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});

			return;
		}
		if (password !== confirmpassword) {
			toast({
				title: "Passwords Do Not Match",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			return;
		}
		console.log(name, email, password, pic);
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data } = await axios.post(
				"/api/user",
				{
					name,
					email,
					password,
					pic,
				},
				config
			);
			console.log(data);
			toast({
				title: "Registration Successful",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			localStorage.setItem("userInfo", JSON.stringify(data));

			history.push("/chats");
		} catch (error) {
			toast({
				title: "Error Occured!",
				description: error.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
		}
	};

	return (
		<VStack spacing="5px">
			<FormControl id="first-name" isRequired>
				<FormLabel>Name</FormLabel>
				<Input
					placeholder="Enter Your Name"
					onChange={(e) => setName(e.target.value)}
				/>
			</FormControl>
			<FormControl id="email" isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input
					type="email"
					placeholder="Enter Your Email Address"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input
						type={show ? "text" : "password"}
						placeholder="Enter Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<FormControl id="password" isRequired>
				<FormLabel>Confirm Password</FormLabel>
				<InputGroup size="md">
					<Input
						type={show ? "text" : "password"}
						placeholder="Confirm password"
						onChange={(e) => setConfirmpassword(e.target.value)}
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={handleClick}>
							{show ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
			</FormControl>

			<Button
				colorScheme="blue"
				width="100%"
				style={{ marginTop: 15 }}
				onClick={submitHandler}
			>
				Sign Up
			</Button>
		</VStack>
	);
};

export default Signup;
