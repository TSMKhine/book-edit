import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const res = await fetch(process.env.API_URL as string, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    });

    const response = new NextResponse(res.body);
    response.headers.set('Content-type', 'audio/mpeg');
    if (res.status === 200) {
      return response;
    } else {
      return NextResponse.json({ error: 'API Error' }, { status: res.status });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
