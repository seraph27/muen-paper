"use client"
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
    const [textValue, setTextValue] = useState("");
    const [outputText, setOutputText] = useState("This is the output text.");
    //const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
    const handleClick = async () => {
        const response = await fetch(`/api/run-script`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input_text: textValue }),
        });
        const data = await response.json();
        setOutputText(data.output_text);
        setTextValue("");
    };

    return (
        <main className="flex min-h-screen flex-col bg-primary items-center justify-between p-24">
            <div className="flex-col items-center justify-center space-y-8 gap-2 w-[80vw] max-w-[600px]">
                <div className="w-full">
                    <Textarea
                        placeholder="輸入論文名稱..."
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        className="h-[150px] rounded-lg bg-primary text-white p-4 focus:outline-none focus:ring-2 focus:ring-[#4d4d4d]"
                    />
                    <Button
                        className="w-full border border-secondary mt-2 hover:bg-foreground"
                        onClick={handleClick}
                    >
                        Submit
                    </Button>
                </div>
                <div className="h-[200px] rounded-lg text-white bg-primary p-4 overflow-auto w-full">
                    <pre className="whitespace-pre-wrap break-words">
                        {outputText}
                    </pre>
                </div>
            </div>
        </main>
    );
}
