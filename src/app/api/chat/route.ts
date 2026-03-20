import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, documentContext } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is missing" },
        { status: 500 },
      );
    }

    const systemInstruction = `
      You are a helpful AI assistant integrated into a collaborative document editor.
      Use the provided Document Context to accurately answer the user's questions.
      CRITICAL RULE: Always use standard Unicode characters for subscripts and superscripts (e.g., H₂O, X², O₂). Do NOT use HTML tags like <sub> or <sup> in your responses.
    `;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Document Context:\n${documentContext}\n\nUser Query: ${prompt}`,
            },
          ],
        },
      ],
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
    };

    // We use fetch and Promises here to handle the async network request to Google's servers.
    // By awaiting the Promise, we ensure our backend pauses until the AI finishes generating.
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error Details:", data);
      throw new Error(data.error?.message || "Failed to fetch AI response");
    }

    const aiText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return NextResponse.json({ text: aiText });
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please check server logs." },
      { status: 500 },
    );
  }
}
