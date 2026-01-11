export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    const body = await request.json();
    const { prompt } = body;

    console.log('[AI] Received prompt length:', prompt ? prompt.length : 0);

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Missing prompt' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI service error', status: geminiResponse.status }),
        { status: geminiResponse.status, headers: corsHeaders }
      );
    }

    const geminiData = await geminiResponse.json();

    console.log('[AI] Gemini status:', geminiResponse.status);

    let responseText = 'No response';

    if (geminiData.candidates && geminiData.candidates.length > 0) {
      const candidate = geminiData.candidates[0];

      // Check for finish_reason (může být SAFETY, MAX_TOKENS, atd.)
      if (candidate.finishReason && candidate.finishReason !== 'STOP') {
        console.warn('Gemini finish reason:', candidate.finishReason);
      }

      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        responseText = candidate.content.parts[0].text;
      }
    }

    if (!responseText || responseText === 'No response') {
      console.error('Empty response from Gemini:', JSON.stringify(geminiData));
      return new Response(
        JSON.stringify({
          error: 'AI returned empty response',
          finishReason: geminiData.candidates?.[0]?.finishReason
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    console.log('[AI] Response length:', responseText.length);
    console.log('[AI] Finish reason:', geminiData.candidates?.[0]?.finishReason);

    return new Response(
      JSON.stringify({ response: responseText }),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestOptions(context) {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
