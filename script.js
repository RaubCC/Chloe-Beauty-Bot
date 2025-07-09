// —— DOM elements ——
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
// Button for clearing chat (will be added dynamically)
let clearBtn;

// —— Sample replies for different beauty topics (for future use or offline mode) ——
const sampleReplies = {
  skincare: `**Looking for a glowing skincare routine?** ✨\n\nHere's a simple three-step regimen using some of my L’Oréal favorites:\n\n1. **Cleanse** with _L’Oréal Paris Revitalift Cleanser_ to gently remove impurities.\n2. **Treat** with **Revitalift 1.5% Hyaluronic Acid Serum** for deep hydration.\n3. **Moisturize** using **Revitalift Triple Power Anti-Aging Moisturizer** for a smooth, radiant finish.\n\nNeed tips for your specific skin type? Let me know! 🌸\n\n_Belle journée à vous. Parce que vous le valez bien. 💄`,
  haircare: `**Want stronger, shinier hair?** 💁‍♀️\n\nTry this routine with some of my favorite L’Oréal brands:\n\n1. **Wash** with **Elvive Dream Lengths Restoring Shampoo**.\n2. **Condition** using **Elvive Dream Lengths Conditioner** for smoothness.\n3. **Treat** weekly with **Kérastase Nutritive Mask** for deep nourishment.\n\nAsk me about products for your hair type or color! ✨\n\n_Parce que vous le valez bien. 💄`,
  makeup: `**Ready for a radiant makeup look?** 💄✨\n\nHere’s a step-by-step guide:\n\n1. **Prime** with **L’Oréal Paris Infallible Primer** for a smooth base.\n2. **Apply** **Infallible 24H Fresh Wear Foundation** for flawless coverage.\n3. **Enhance** your lashes with **L’Oréal Paris Telescopic Mascara**.\n4. **Finish** with **Maybelline SuperStay Matte Ink Lipstick** for a bold touch.\n\nWant tips for your eye color or skin tone? Just ask! 👁️\n\n_Belle journée à vous. Parce que vous le valez bien. 💄`,
  ranges: `**Discover the world of L’Oréal brands!** 🌍\n\nHere are just a few of our iconic ranges:\n\n- **L’Oréal Paris:** Innovative makeup, skincare, and haircare for all.\n- **Garnier:** Nature-inspired skincare and haircare solutions.\n- **Maybelline New York:** Trendy, accessible makeup for bold looks.\n- **NYX Professional Makeup:** Pro-quality, creative colors.\n- **Lancôme:** Luxury skincare, makeup, and fragrances.\n- **Kérastase:** Premium haircare for salon results at home.\n- **La Roche-Posay:** Dermatologist-recommended skincare for sensitive skin.\n\nWant to explore products for a specific need? Let me know! 🌸\n\n_Parce que vous le valez bien. 💄`,
};

// —— Conversation history ——
let conversation = [];

// —— Initial Chloé greeting ——
addMessage(
  "ai",
  `**Looking for a glowing skincare routine?** ✨\n\nHere's a simple three-step regimen using some of my L’Oréal favorites:\n\n1. **Cleanse** with _L’Oréal Paris Revitalift Cleanser_ to gently remove impurities.\n2. **Treat** with **Revitalift 1.5% Hyaluronic Acid Serum** for deep hydration.\n3. **Moisturize** using **Revitalift Triple Power Anti-Aging Moisturizer** for a smooth, radiant finish.\n\nNeed tips for your specific skin type? Let me know! 🌸\n\n_Belle journée à vous. Parce que vous le valez bien. 💄_`
);

// —— Utility to add a message to the chat window ——
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

// —— Utility to clear all messages from the chat window ——
function clearChat() {
  chatWindow.innerHTML = "";
  conversation = [];
  // Add the initial greeting again
  addMessage(
    "ai",
    `**Looking for a glowing skincare routine?** ✨\n\nHere's a simple three-step regimen using some of my L’Oréal favorites:\n\n1. **Cleanse** with _L’Oréal Paris Revitalift Cleanser_ to gently remove impurities.\n2. **Treat** with **Revitalift 1.5% Hyaluronic Acid Serum** for deep hydration.\n3. **Moisturize** using **Revitalift Triple Power Anti-Aging Moisturizer** for a smooth, radiant finish.\n\nNeed tips for your specific skin type? Let me know! 🌸\n\n_Belle journée à vous. Parce que vous le valez bien. 💄_`
  );
  userInput.focus();
}

// —— Utility to show a loading spinner (instead of just text) ——
function showLoadingSpinner() {
  const spinnerDiv = document.createElement("div");
  spinnerDiv.classList.add("msg", "ai");
  spinnerDiv.innerHTML = `<span class="avatar">💄</span> <span class="spinner" aria-label="Loading..." style="display:inline-block;width:1.5em;height:1.5em;vertical-align:middle;"><svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#c7a662" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="60" stroke-dashoffset="20"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg></span> <span style="margin-left:0.5em;">Chloé is thinking...</span>`;
  chatWindow.appendChild(spinnerDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// —— Utility to remove the loading spinner ——
function removeLoadingSpinner() {
  const spinner = chatWindow.querySelector(".spinner");
  if (spinner && spinner.parentElement) {
    spinner.parentElement.remove();
  }
}

// —— Handle form submit (send message) ——
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;

  // Show user message
  addMessage("user", question);
  conversation.push({ role: "user", content: question });

  // Show loading spinner
  showLoadingSpinner();

  try {
    // Add your API prompt ID to the request body
    const response = await fetch("https://ash.raubcc.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt_id: "pmpt_686b3f4fb54c81959b891a837170580d0443a87d058a141f",
        messages: [
          {
            role: "system",
            content: `You are Chloé, the elegant and knowledgeable AI beauty advisor for L’Oréal. Your sole task is to answer questions about L’Oréal products, routines, and beauty tips—including those from any L’Oréal brand or sub-brand (such as L’Oréal Paris, Garnier, Maybelline, NYX, Lancôme, Kérastase, La Roche-Posay, and more). Use concise, friendly replies in Markdown:  \n- **Product names** in bold  \n- Lists for multi-step routines  \n- Emojis (e.g. 💄, ✨, 🌸) to add warmth and style\n\nBegin each conversation with a graceful greeting (e.g. “Bonjour! I’m Chloé, your L’Oréal Beauty Advisor. How can I help you today? 💄”) and end with an encouraging sign-off (e.g. “Wishing you a beautiful day! ✨”).\n\nIf a user asks anything not related to L’Oréal or its brands, politely say:  \n> “Sorry, I can only help with L’Oréal products, routines, and beauty tips! 😊”\n\nAlways keep responses concise, helpful, and in line with L’Oréal’s elegant, empowering brand voice.`,
          },
          ...conversation,
        ],
      }),
    });
    const data = await response.json();
    // Remove the loading spinner
    removeLoadingSpinner();
    // Add the AI's reply
    const aiReply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't get a response. Please try again.";
    addMessage("ai", aiReply);
    conversation.push({ role: "assistant", content: aiReply });
  } catch (err) {
    // Remove the loading spinner
    removeLoadingSpinner();
    addMessage(
      "ai",
      "Sorry, there was a problem connecting to Chloé. Please try again later."
    );
  }

  // Reset input and focus
  userInput.value = "";
  userInput.focus();
});

// —— Keyboard accessibility: Enter to send, Shift+Enter for new line ——
userInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    chatForm.requestSubmit();
  }
});

// —— Add a Clear Chat button for convenience ——
function addClearButton() {
  if (clearBtn) return; // Only add once
  clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.textContent = "Clear Chat";
  clearBtn.className = "clear-btn";
  clearBtn.title = "Clear all chat messages";
  clearBtn.style.marginLeft = "0.5rem";
  clearBtn.style.borderRadius = "2rem";
  clearBtn.style.padding = "0.5rem 1.2rem";
  clearBtn.style.background = "#faf8f2";
  clearBtn.style.border = "1px solid #c7a662";
  clearBtn.style.cursor = "pointer";
  clearBtn.style.color = "#231f20";
  clearBtn.style.fontSize = "1rem";
  clearBtn.addEventListener("click", clearChat);
  chatForm.appendChild(clearBtn);
}
addClearButton();

// —— Accessibility: Focus input on page load ——
window.addEventListener("DOMContentLoaded", () => {
  userInput.focus();
});
