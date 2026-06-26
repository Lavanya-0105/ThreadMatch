import Groq from "groq-sdk";

export const getRecommendations = async (req, res) => {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { userContext, wardrobe } = req.body;

    if (!userContext || !wardrobe) {
      return res
        .status(400)
        .json({ message: "Missing userContext or wardrobe" });
    }

    const tops = wardrobe.tops || [];
    const bottoms = wardrobe.bottoms || [];
    const layers = wardrobe.outerwear || [];

    // If no colors selected for an item, skip color dimension entirely
    // just use the item name without color prefix
    const getColors = (item) => (item.colors.length > 0 ? item.colors : [""]);

    // Build all combinations
    const combinations = [];
    tops.forEach((top) => {
      getColors(top).forEach((tc) => {
        bottoms.forEach((bottom) => {
          getColors(bottom).forEach((bc) => {
            if (layers.length > 0) {
              layers.forEach((layer) => {
                getColors(layer).forEach((lc) => {
                  combinations.push({
                    top: top.label,
                    topColor: tc || null,
                    bottom: bottom.label,
                    bottomColor: bc || null,
                    layer: layer.label,
                    layerColor: lc || null,
                  });
                });
              });
            } else {
              combinations.push({
                top: top.label,
                topColor: tc || null,
                bottom: bottom.label,
                bottomColor: bc || null,
                layer: null,
                layerColor: null,
              });
            }
          });
        });
      });
    });

    // Cap at 12 — keeps prompt short and model focused
    const capped = combinations.sort(() => Math.random() - 0.5).slice(0, 12);

    const combinationsList = capped
      .map((c, i) => {
        const top = c.topColor ? `${c.topColor} ${c.top}` : c.top;
        const bottom = c.bottomColor
          ? `${c.bottomColor} ${c.bottom}`
          : c.bottom;
        const layer = c.layer
          ? c.layerColor
            ? ` + ${c.layerColor} ${c.layer}`
            : ` + ${c.layer}`
          : "";
        return `${i + 1}. ${top} + ${bottom}${layer}`;
      })
      .join("\n");

    const prompt = `You are a personal stylist AI. Return ONLY a raw JSON array with no markdown, no code blocks, no explanation.

USER PROFILE:
- Vibe: ${userContext.vibe}
- Occasion: ${userContext.occasion}
- Weather: ${userContext.weather}
- Body type: ${userContext.bodyType}
${userContext.freeText ? `- Request: "${userContext.freeText}"` : ""}

AVAILABLE COMBINATIONS:
${combinationsList}

OCCASION RULES — be strict about these:
- Work/Professional: NO crop tops, camisoles, tube tops, graphic tees, hoodies, shorts, oversized tees. YES to shirts, polos, blouses, blazers, trousers, chinos.
- Formal: ONLY formal shirts, blazers, suit jackets, dress trousers. Nothing casual.
- Casual/Outdoor: Anything goes.
- Party/Date Night: Bold, stylish choices. Avoid overly casual (plain hoodies, cargo pants).

If the user selected items that don't match their occasion, still include them but rank them lower and add a stylingNote explaining how to adapt (e.g. "tuck in and layer with a blazer to dress this up").

Pick 3 best combinations from the list. If a combination has a mismatch, add a short "stylingNote" like "Layer with a blazer to make this work-appropriate".

Return ONLY this JSON object:
{"recommendations":[{"rank":1,"name":"Name","top":"top","topColor":"color","bottom":"bottom","bottomColor":"color","layer":null,"layerColor":null,"reason":"honest reason","stylingNote":null},{"rank":2,"name":"Name","top":"top","topColor":"color","bottom":"bottom","bottomColor":"color","layer":null,"layerColor":null,"reason":"honest reason","stylingNote":"optional tip if mismatch"},{"rank":3,"name":"Name","top":"top","topColor":"color","bottom":"bottom","bottomColor":"color","layer":null,"layerColor":null,"reason":"honest reason","stylingNote":null}]}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a JSON-only API. Output only a raw JSON object with a recommendations array. No markdown. No explanation. No code blocks.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0,
      max_tokens: 1000,
    });

    const raw = completion.choices[0].message.content.trim();

    let recommendations;

    // json_object mode guarantees valid JSON — just parse it
    try {
      const parsed = JSON.parse(raw);
      // Handle both {recommendations: [...]} and direct array
      recommendations = Array.isArray(parsed)
        ? parsed
        : parsed.recommendations || Object.values(parsed)[0] || [];
    } catch {
      // Fallback: extract array from anywhere in response
      const match = raw.match(/\[[\s\S]*\]/);
      if (match) {
        try {
          recommendations = JSON.parse(match[0]);
        } catch {}
      }
    }

    if (!recommendations || recommendations.length === 0) {
      throw new Error("Could not parse AI response");
    }

    res.json({ recommendations: recommendations.slice(0, 3) });
  } catch (error) {
    console.error("Recommendation error:", error.message);
    res
      .status(500)
      .json({ message: error.message || "Failed to generate recommendations" });
  }
};
