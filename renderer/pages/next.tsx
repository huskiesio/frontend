import React from "react";
import Head from "next/head";
import Link from "next/link";
import MessageRenderer from '@huskiesio/message-renderer'

const code = "```javascript\nconst hello = 'world';\n```\n$\\sqrt{3}$";

const Next: React.ComponentType = (): React.ReactElement<{}> => {
  return (
	<React.Fragment>
		<Head>
		<title>Next - Nextron (with-typescript)</title>
		</Head>
		<div>
		<p>
			⚡ Electron + Next.js ⚡ -
			<Link href="/home">
			<a>Go to home page</a>
			</Link>
		</p>
    <p>
      <MessageRenderer text={code}/>
    </p>
		</div>
	</React.Fragment>
  );
};

export default Next;
