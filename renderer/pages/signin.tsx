import React, {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import "./styles/sign-in.scss";

export default (): React.ReactElement<{}> => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn: React.FormEventHandler = (e: React.FormEvent): void => {
	e.preventDefault();

	console.log(username, password);

	// Validate login
	router.push("/home");
  };

  return (
	<div className="sign-in">
		<div className="box">
		<h1>Sign In</h1>
		<span>or <Link href="/signup"><a>sign up</a></Link></span>

		<form onSubmit={handleSignIn}>
			<input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
			<input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
			<button>Sign in</button>
		</form>
		</div>
	</div>
  );
};
