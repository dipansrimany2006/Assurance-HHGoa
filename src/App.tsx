import React, { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import Home from "./Home";

const App: React.FC = () => {
	const [ready, setReady] = useState<boolean>(false);
	const [useTestAadhaar, setUseTestAadhaar] = useState<boolean>(false);

	useEffect(() => {
		setReady(true);
	}, []);

	return (
		<><AnonAadhaarProvider
		useTestAadhaar={useTestAadhaar}
		appName="Anon Aadhaar"
	>
			<main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
				<div className="py-20">
					<div className="flex justify-center mb-20">
						{ready ? (
							
								<Home setUseTestAadhaar={setUseTestAadhaar} useTestAadhaar={useTestAadhaar} />
							
						) : null}
					</div>
				</div>
			</main></AnonAadhaarProvider>
		</>
	);
}

export default App;
