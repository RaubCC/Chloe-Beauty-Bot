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

    try {
      const apiKey = env.OPENAI_API_KEY; // Make sure to name your secret OPENAI_API_KEY in the Cloudflare Workers dashboard
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const userInput = await request.json();

      const requestBody = {
        model: "gpt-4o",
        messages: userInput.messages,
        max_tokens: 300,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();

      // Forward OpenAI's response and status
      return new Response(responseText, {
        status: response.status,
        headers: corsHeaders,
      });
    } catch (err) {
      // Give yourself more error detail!
      return new Response(
        JSON.stringify({ error: err.message || err.toString() }),
        { status: 500, headers: corsHeaders }
      );
    }
  },
};
