// DOM elements
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Sample replies for different beauty topics
const sampleReplies = {
  skincare: `**Looking for a glowing skincare routine?** ✨\n\nHere's a simple three-step regimen using some of my L’Oréal favorites:\n\n1. **Cleanse** with _L’Oréal Paris Revitalift Cleanser_ to gently remove impurities.\n2. **Treat** with **Revitalift 1.5% Hyaluronic Acid Serum** for deep hydration.\n3. **Moisturize** using **Revitalift Triple Power Anti-Aging Moisturizer** for a smooth, radiant finish.\n\nNeed tips for your specific skin type? Let me know! 🌸\n\n_Belle journée à vous. Parce que vous le valez bien. 💄`,

  haircare: `**Want stronger, shinier hair?** 💁‍♀️\n\nTry this routine with some of my favorite L’Oréal brands:\n\n1. **Wash** with **Elvive Dream Lengths Restoring Shampoo**.\n2. **Condition** using **Elvive Dream Lengths Conditioner** for smoothness.\n3. **Treat** weekly with **Kérastase Nutritive Mask** for deep nourishment.\n\nAsk me about products for your hair type or color! ✨\n\n_Parce que vous le valez bien. 💄`,

  makeup: `**Ready for a radiant makeup look?** 💄✨\n\nHere’s a step-by-step guide:\n\n1. **Prime** with **L’Oréal Paris Infallible Primer** for a smooth base.\n2. **Apply** **Infallible 24H Fresh Wear Foundation** for flawless coverage.\n3. **Enhance** your lashes with **L’Oréal Paris Telescopic Mascara**.\n4. **Finish** with **Maybelline SuperStay Matte Ink Lipstick** for a bold touch.\n\nWant tips for your eye color or skin tone? Just ask! 👁️\n\n_Belle journée à vous. Parce que vous le valez bien. 💄`,

  ranges: `**Discover the world of L’Oréal brands!** 🌍\n\nHere are just a few of our iconic ranges:\n\n- **L’Oréal Paris:** Innovative makeup, skincare, and haircare for all.\n- **Garnier:** Nature-inspired skincare and haircare solutions.\n- **Maybelline New York:** Trendy, accessible makeup for bold looks.\n- **NYX Professional Makeup:** Pro-quality, creative colors.\n- **Lancôme:** Luxury skincare, makeup, and fragrances.\n- **Kérastase:** Premium haircare for salon results at home.\n- **La Roche-Posay:** Dermatologist-recommended skincare for sensitive skin.\n\nWant to explore products for a specific need? Let me know! 🌸\n\n_Parce que vous le valez bien. 💄`,
};

// Conversation history
let conversation = [];

// Initial Chloé greeting
addMessage(
  "ai",
  `**Looking for a glowing skincare routine?** ✨\n\nHere's a simple three-step regimen using some of my L’Oréal favorites:\n\n1. **Cleanse** with _L’Oréal Paris Revitalift Cleanser_ to gently remove impurities.\n2. **Treat** with **Revitalift 1.5% Hyaluronic Acid Serum** for deep hydration.\n3. **Moisturize** using **Revitalift Triple Power Anti-Aging Moisturizer** for a smooth, radiant finish.\n\nNeed tips for your specific skin type? Let me know! 🌸\n\n_Belle journée à vous. Parce que vous le valez bien. 💄_`
);

// Utility to add a message (with Markdown for AI, plain for user)
function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("msg", sender);

  // If it's the AI (Chloé), add the lipstick emoji and render Markdown
  if (sender === "ai") {
    msgDiv.innerHTML = `<span class="avatar">💄</span> ${marked.parse(text)}`;
  } else {
    msgDiv.textContent = text;
  }

  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Handle form submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;

  // Show user message
  addMessage("user", question);
  conversation.push({ role: "user", content: question });

  // Show loading animation/message
  addMessage("ai", "Chloé is thinking...💭");

  // Choose a sample reply based on keywords
  let reply = sampleReplies.ranges; // Default reply

  const lowerQ = question.toLowerCase();
  if (
    lowerQ.includes("skin") ||
    lowerQ.includes("face") ||
    lowerQ.includes("cleanse") ||
    lowerQ.includes("serum")
  ) {
    reply = sampleReplies.skincare;
  } else if (
    lowerQ.includes("hair") ||
    lowerQ.includes("shampoo") ||
    lowerQ.includes("conditioner") ||
    lowerQ.includes("kerastase")
  ) {
    reply = sampleReplies.haircare;
  } else if (
    lowerQ.includes("makeup") ||
    lowerQ.includes("mascara") ||
    lowerQ.includes("foundation") ||
    lowerQ.includes("lipstick")
  ) {
    reply = sampleReplies.makeup;
  }

  // Remove the "Chloé is thinking..." message
  const lastMsg = chatWindow.querySelector(".msg.ai:last-child");
  if (lastMsg && lastMsg.textContent.includes("Chloé is thinking")) {
    chatWindow.removeChild(lastMsg);
  }
  // Add the sample reply
  addMessage("ai", reply);
  conversation.push({ role: "assistant", content: reply });

  // Reset input
  userInput.value = "";
});
