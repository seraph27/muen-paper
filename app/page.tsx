"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface OutputData {
  [key: string]: number;
}

export default function Home() {
  const [textValue, setTextValue] = useState("");
  const [outputData, setOutputData] = useState<OutputData>({});
  //'http://127.0.0.1:5000' for local;
  const handleClick = async () => {
    const response = await fetch(`/api/run-script`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_text: textValue }),
    });
    const data = await response.json();
    setOutputData(data);
    setTextValue("");
  };

  return (
    <main className="flex min-h-screen flex-col bg-primary items-center justify-between p-24">
      <div className="flex-col items-center justify-center space-y-8 gap-2 w-[80vw] max-w-[600px]">
        <div className="w-full">
          <Textarea
            placeholder="輸入論文名稱... (例 : 開發與驗證創新的整合人工智慧與人體平衡模型)"
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
        <div className="rounded-lg text-white bg-primary p-4 overflow-auto w-full">
          <pre className="whitespace-pre-wrap break-words">
            <div>
              {Object.keys(outputData).length === 0 ? (
                <p>No results to display.</p>
              ) : (
                Object.entries(outputData)
                  .sort(([, a], [, b]) => b - a) // Sort entries by value in descending order
                  .map(([key, value]) => (
                    <div key={key} className="space-y-5">
                      <strong>{key}</strong>: {value}{" "}
                      <Button variant="outline" asChild>
                        <Link
                          className="bg-primary flex hover:bg-accent items-center"
                          href={`https://www.google.com/search?q=${encodeURIComponent(
                            key
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer" 
                        >
                          <ChevronRight className="icon" />
                        </Link>
                      </Button>
                    </div>
                  ))
              )}
            </div>
          </pre>
        </div>
      </div>
    </main>
  );
}
