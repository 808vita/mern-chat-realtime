import { useState } from "react";
import axios from "axios";

import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

const Login = () => {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const toast = useToast();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = async () => {
		if (!email || !password) {
			toast({
				title: "Please Fill all the Feilds",
				status: "warning",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});

			return;
		}

		// console.log(email, password);
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data } = await axios.post(
				"/api/user/login",
				{ email, password },
				config
			);

			// console.log(JSON.stringify(data));
			toast({
				title: "Login Successful",
				status: "success",
				duration: 5000,
				isClosable: true,
				position: "bottom",
			});
			localStorage.setItem("userInfo", JSON.stringify(data));

			history.push("/chats");

			setTimeout(function () {
				document.location.reload();
			}, 5000);
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
		<VStack spacing="10px">
			<FormControl id="email" isRequired>
				<FormLabel>Email Address</FormLabel>
				<Input
					value={email}
					type="email"
					placeholder="Enter Your Email Address"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormControl>
			<FormControl id="password" isRequired>
				<FormLabel>Password</FormLabel>
				<InputGroup size="md">
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type={show ? "text" : "password"}
						placeholder="Enter password"
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
				Login
			</Button>
			<Button
				className="expand-btn-green"
				variant="solid"
				colorScheme="green"
				onClick={() => {
					setEmail("woof@woof.com");
					setPassword("woof");
				}}
			>
				Test?
			</Button>
		</VStack>
	);
};

export default Login;
