import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = process.env.SPREADSHEET_ID as string;


    const values = [
      [
        body.q1 || '',
        body.q2 || '',
        Array.isArray(body.q3) ? body.q3.join(', ') : body.q3 || '',
        body.q4 || '',
        body.q5 || '',
        new Date().toISOString(),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Responses!A:F',
      valueInputOption: 'RAW',
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Google Sheets API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
