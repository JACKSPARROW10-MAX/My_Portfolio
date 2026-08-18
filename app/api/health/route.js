export const runtime = 'edge';

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      system: "Prathamesh Portfolio Terminal API",
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0"
      }
    }
  );
}
