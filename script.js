// DOM elements
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Conversation history (LevelUp feature)
let conversation = [];

// Initial Ash greeting
addMessage(
  "ai",
  "🦉 Bonjour, beauty! I'm Ash, your L’Oréal Product Advisor. Ask me anything about skincare, makeup, haircare, or fragrance!"
);

// Utility to add a message
function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("msg", sender);
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);

  // Scroll to bottom for new message
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

  // Optionally, show a loading animation/message
  addMessage("ai", "Ash is thinking...💭");

  // Replace this with your actual API call later
  setTimeout(() => {
    // Remove the "Ash is thinking..." message
    const lastMsg = chatWindow.querySelector(".msg.ai:last-child");
    if (lastMsg && lastMsg.textContent === "Ash is thinking...💭") {
      chatWindow.removeChild(lastMsg);
    }
    // Add a placeholder response
    addMessage(
      "ai",
      "Here’s a L’Oréal beauty tip! (This is a placeholder. Connect to the API for real advice.)"
    );
    conversation.push({
      role: "assistant",
      content:
        "Here’s a L’Oréal beauty tip! (This is a placeholder. Connect to the API for real advice.)",
    });
  }, 1000);

  // Reset input
  userInput.value = "";
});
