import React, { useEffect } from "react";
import {
    AnonAadhaarProof,
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    useProver,
} from "@anon-aadhaar/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";


type HomeProps = {
    setUseTestAadhaar: (state: boolean) => void;
    useTestAadhaar: boolean;
};

const Home: React.FC<HomeProps> = ({ setUseTestAadhaar, useTestAadhaar }) => {
    const [anonAadhaar] = useAnonAadhaar();
    const [, latestProof] = useProver();

    useEffect(() => {
        if (anonAadhaar.status === "logged-in") {
            console.log(anonAadhaar.status);
        }
    }, [anonAadhaar]);

    const switchAadhaar = () => {
        setUseTestAadhaar(!useTestAadhaar);
    };

    return (
    <>
        <div>
            <main className="flex flex-col gap-5 justify-center align-middle">
                <h1 className="font-bold text-5xl">Welcome to Assurance</h1>
                <p>Prove your Identity anonymously using your Aadhaar card.</p>
                <div className="isolate aspect-video w-96 rounded-xl bg-white/20 shadow-lg ring-1 ring-black/5 flex flex-col align-middle gap-4">
                    <LogInWithAnonAadhaar nullifierSeed={1234} useTestAadhaar={true} />
                    <ConnectButton
                                                    client={client}
                                                    appMetadata={{
                                                        name: "Example app",
                                                        url: "https://example.com",
                                                    }}
                                                />
                    {useTestAadhaar ? (
                        <p>
                            You&apos;re using the <strong>test</strong> Aadhaar mode
                        </p>
                    ) : (
                        <p>
                            You&apos;re using the <strong>real</strong> Aadhaar mode
                        </p>
                    )}
                    <button
                        onClick={switchAadhaar}
                        type="button"
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Switch to {useTestAadhaar ? "real" : "test"} Aadhaar mode
                    </button>
                </div>
            </main>
            <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8">
                {anonAadhaar.status === "logged-in" && (
                    <>
                        <p>✅ Proof is valid</p>
                        <p>Got your Aadhaar Identity Proof</p>
                        <p>Welcome anon!</p>
                        {latestProof && (
                            <AnonAadhaarProof
                                code={JSON.stringify(latestProof, null, 2)}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    </>
    );
}

export default Home;
