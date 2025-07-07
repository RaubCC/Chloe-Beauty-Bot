// DOM elements
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

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

  // Replace this with your actual API call later
  setTimeout(() => {
    // Remove the "Chloé is thinking..." message
    const lastMsg = chatWindow.querySelector(".msg.ai:last-child");
    if (lastMsg && lastMsg.textContent.includes("Chloé is thinking")) {
      chatWindow.removeChild(lastMsg);
    }
    // Add a placeholder response
    addMessage(
      "ai",
      `**Looking for a glowing skincare routine?** ✨\n\nHere's a simple three-step regimen using some of my L’Oréal favorites:\n\n1. **Cleanse** with _L’Oréal Paris Revitalift Cleanser_ to gently remove impurities.\n2. **Treat** with **Revitalift 1.5% Hyaluronic Acid Serum** for deep hydration.\n3. **Moisturize** using **Revitalift Triple Power Anti-Aging Moisturizer** for a smooth, radiant finish.\n\nNeed tips for your specific skin type? Let me know! 🌸\n\n_Belle journée à vous. Parce que vous le valez bien. 💄_`
    );
    conversation.push({
      role: "assistant",
      content: `**Looking for a glowing skincare routine?** ✨\n\nHere's a simple three-step regimen using some of my L’Oréal favorites:\n\n1. **Cleanse** with _L’Oréal Paris Revitalift Cleanser_ to gently remove impurities.\n2. **Treat** with **Revitalift 1.5% Hyaluronic Acid Serum** for deep hydration.\n3. **Moisturize** using **Revitalift Triple Power Anti-Aging Moisturizer** for a smooth, radiant finish.\n\nNeed tips for your specific skin type? Let me know! 🌸\n\n_Belle journée à vous. Parce que vous le valez bien. 💄_`,
    });
  }, 1000);

  // Reset input
  userInput.value = "";
});
