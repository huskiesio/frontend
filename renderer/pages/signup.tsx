import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import "./styles/sign-in.scss";

export default (): React.ReactElement<{}> => {
  const router = useRouter();
  const [shouldShow2FA, show2FA] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");

  const handleFirstStep: React.FormEventHandler = (e: React.FormEvent): void => {
	e.preventDefault();

	// Confirm email and password are valid.
	show2FA(true);
  };

  const handleSecondStep: React.FormEventHandler = (e: React.FormEvent): void => {
	e.preventDefault();

	// Confirm 2FA code is valid
	router.push("/home");
  };

  return (
	<div className="sign-in">
		<div className="box">
		<h1>Sign Up</h1>

		{shouldShow2FA ? (
			<form onSubmit={handleSecondStep}>
			<input type="number" placeholder="2FA code" value={code} onChange={e => setCode(e.target.value)}/>
			<button>Submit</button>
			</form>
		) : (
			<form onSubmit={handleFirstStep}>
			<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
			<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
		<input placeholder="Device name" value={deviceName} onChange={e => setDeviceName(e.target.value)}/>
      <input placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
      <input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)}/> 
			<button className="blue">Sign up</button>
			</form>
		)}
		</div>
	</div>
  );
};
