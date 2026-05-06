exports.handler = async (event) => {
  try {
    const { topic } = JSON.parse(event.body);
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        messages: [{
          role: "user",
          content: `"${topic}" 주제로 포토 챌린지 미션 10개를 한국어로 만들어줘. 이모지 없이, 각각 한 문장으로, 번호 없이 줄바꿈으로만 구분해서 출력해.`
        }]
      })
    });
    const data = await res.json();
    const text = data.content?.[0]?.text?.trim() || "";
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ text })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
