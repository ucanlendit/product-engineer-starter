import predict from '@/server-utils/predict';

export async function POST(req, res) {
  const data = await req.json();
  const prediction = await predict(data);
  return new Response(JSON.stringify(prediction));
}