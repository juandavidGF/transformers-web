"use client"
import Image from 'next/image'
import { useState } from 'react';

export default function Home() {
  const [prediction, setPrediction] = useState<any>()
  const [inputValue, setInputValue] = useState("");
  // let pipe = await pipeline('sentiment-analysis');
  const [result, setResult] = useState(true);
	const [ready, setReady] = useState(false);


  const classify = async (text: string) => {
		if (!text) return;
		if (ready === null) setReady(false);
		
		// Make a request to the /classify route on the server.
		const result = await fetch(`/api/classify?text=${encodeURIComponent(text)}`);
		
		// If this is the first time we've made a request, set the ready flag.
		if (!ready) setReady(true);
		
		const json = await result.json();
		setResult(json);
	};

  async function predict() {
    const resJ = await fetch('/api/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: inputValue
      })
    });
    if(!resJ.ok) {
      alert('err');
    }
    const res = await resJ.json();
    console.log(res);
    // setPrediction(out);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <h1 className="text-5xl font-bold mb-2 text-center">Transformers.js</h1>
      <h2 className="text-2xl mb-4 text-center">Next.js template (server-side)</h2>
      <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter text here"
        onChange={e => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded">
          {
            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  )
}
