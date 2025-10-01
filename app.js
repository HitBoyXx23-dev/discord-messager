const form = document.getElementById("sendForm");
const channelInput = document.getElementById("channelId");
const messageInput = document.getElementById("message");
const tokenInput = document.getElementById("token");
const responseDiv = document.getElementById("response");
const chat = document.getElementById("chat");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  responseDiv.textContent = "";

  const channelId = channelInput.value.trim();
  const message = messageInput.value.trim();
  const token = tokenInput.value.trim();

  if (!channelId || !message || !token) {
    responseDiv.textContent = "Please fill in all fields.";
    return;
  }

  const payload = { content: message };

  try {
    const res = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      responseDiv.textContent = "Message sent successfully!";
      addLocalMessage(channelId, message);
      messageInput.value = "";
      messageInput.focus();
    } else {
      responseDiv.textContent = "Error sending message:\n" + JSON.stringify(data, null, 2);
    }
  } catch (err) {
    responseDiv.textContent = "Network/Fetch error: " + err;
  }
});

function addLocalMessage(channelId, message) {
  const wrapper = document.createElement("div");
  wrapper.className = "message";

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `[${new Date().toLocaleTimeString()}] Channel: ${channelId}`;

  const body = document.createElement("div");
  body.textContent = message;

  wrapper.appendChild(meta);
  wrapper.appendChild(body);
  chat.appendChild(wrapper);
  chat.scrollTop = chat.scrollHeight;
}
