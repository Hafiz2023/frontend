import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'contacts.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Simple validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newContact = {
            id: Date.now().toString(),
            name,
            email,
            subject: subject || 'No Subject',
            message,
            date: new Date().toISOString(),
        };

        let contacts = [];
        if (fs.existsSync(DATA_FILE)) {
            const fileData = fs.readFileSync(DATA_FILE, 'utf-8');
            try {
                contacts = JSON.parse(fileData);
            } catch {
                contacts = [];
            }
        }

        contacts.push(newContact);
        fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));

        return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const fileData = fs.readFileSync(DATA_FILE, 'utf-8');
            const contacts = JSON.parse(fileData);
            return NextResponse.json(contacts);
        }
        return NextResponse.json([]);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}
