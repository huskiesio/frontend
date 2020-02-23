import React, {useState} from "react";
import {useRouter} from "next/router";
import {ipcRenderer} from 'electron'
import Link from "next/link";
import "./styles/sign-in.scss";

export default (): React.ReactElement<{}> => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);

  const handleSignIn: React.FormEventHandler = async (e: React.FormEvent): Promise<void> => {
	e.preventDefault();

  // Validate login
  try {
    // await ipcRenderer.invoke("sign-in", {username, password});
    router.push("/home");
  } catch (_) {
    setError(true);
  }
  };

  return (
	<div className="sign-in">
		<div className="box">
		<h1>Sign In</h1>

    {
      isError ? (
        <h3>Error signing in.</h3>
      ) : (<div/>)
    }

		<form onSubmit={handleSignIn}>
			<input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
			<input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
			<button className="blue">Sign in</button>
		</form>

	<span>or <Link href="/signup"><a>sign up</a></Link></span>
		</div>
	</div>
  );
};
