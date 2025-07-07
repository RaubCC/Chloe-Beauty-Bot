// Copy this code into your Cloudflare Worker script

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Change to your domain in production!
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    };

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const apiKey = env.OPENAI_API_KEY; // Make sure to name your secret OPENAI_API_KEY in the Cloudflare Workers dashboard
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const userInput = await request.json();

    const requestBody = {
      model: "gpt-4o",
      messages: [{ role: "system", content: "Say hello!" }],
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // Extract the assistant's message from the response
    const assistantMessage = data.choices[0].message.content;

    // Forward the assistant's message as the response
    return new Response(JSON.stringify({ message: assistantMessage }), {
      status: response.status,
      headers: corsHeaders,
    });
  },
};
