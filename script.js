const templates = {
  selected: (name, position) => `
    Dear ${name},

    We are pleased to inform you that you have been selected for the position of ${position}.

    Please reply to this email to confirm your acceptance.

    Best regards,
    HR Team
  `,
  rejected: (name, position) => `
    Dear ${name},

    Thank you for applying for the position of ${position}.

    We regret to inform you that we have decided to move forward with other candidates.

    Best regards,
    HR Team
  `
};

function previewEmail() {
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const status = document.querySelector('input[name="status"]:checked');

  if (!name || !position || !status) {
    alert("Please fill all fields and select status");
    return;
  }

  const content = templates[status.value](name, position);
  document.getElementById("previewContent").innerText = content;
  document.getElementById("previewBox").classList.remove("hidden");
}

document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const position = document.getElementById("position").value;
  const status = document.querySelector('input[name="status"]:checked').value;

  const response = await fetch("http://localhost:5000/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, position, status })
  });

  const result = await response.json();
  document.getElementById("message").innerText = result.message;
});
