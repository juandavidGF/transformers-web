import { pipeline } from '@xenova/transformers';

export async function POST(req: Request) {
  const { input } = await req.json();
  let pipe = await pipeline('sentiment-analysis');

  let out = await pipe(input);
 
  return Response.json({out});
}

export async function GET() {  
  const data = {
    hola: 'hola',
  };
 
  return Response.json(data)
}