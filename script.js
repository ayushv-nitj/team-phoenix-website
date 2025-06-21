


document.addEventListener("DOMContentLoaded", () => {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle('show');
    });
  }

  // Dark mode toggle
  const toggle = document.getElementById("darkToggle");
  const body = document.body;
  if (toggle && body) {
    toggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      toggle.textContent = body.classList.contains("dark-mode") ? "☀" : "🌙";
    });
  }

  // Navbar shrink on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('shrink', window.scrollY > 50);
    }
  });

  // Mobile dropdown toggle on click
const dropdownParents = document.querySelectorAll('.dropdown-parent > a');

if (dropdownParents.length > 0) {
  dropdownParents.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // prevent anchor jump
        const parent = link.parentElement;
        parent.classList.toggle('active');
      }
    });
  });
}


  

  // Scroll reveal animation
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  if (scrollElements.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    scrollElements.forEach(el => observer.observe(el));
  }

  // Chatbot toggle
  const chatToggle = document.getElementById("chatToggle");
  const chatbot = document.getElementById("chatbot");
  if (chatToggle && chatbot) {
    chatToggle.addEventListener("click", () => {
      chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
    });
  }

  // Chatbot logic
  const chatForm = document.getElementById("chatForm");
  const chatBody = document.getElementById("chatBody");
  const userInput = document.getElementById("userInput");
  const typingSound = document.getElementById("typingSound");

  if (chatForm && chatBody && userInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = userInput.value.trim();
      if (!msg) return;
      appendMessage(msg, "user");
      respondToMessage(msg.toLowerCase());
      userInput.value = "";
    });
  }

  function appendMessage(message, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender + "-message";
    msgDiv.textContent = message;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingDots() {
    const dotsDiv = document.createElement("div");
    dotsDiv.className = "bot-message typing-dots";
    dotsDiv.innerHTML = `
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    `;
    chatBody.appendChild(dotsDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingDots() {
    const typingDiv = document.querySelector(".typing-dots");
    if (typingDiv) typingDiv.remove();
  }

  function animateReply(text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "bot-message";
    chatBody.appendChild(msgDiv);

    const words = text.split(" ");
    let i = 0;

    const interval = setInterval(() => {
      if (i < words.length) {
        msgDiv.innerHTML += words[i] + " ";
        chatBody.scrollTop = chatBody.scrollHeight;
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }

  async function respondToMessage(msg) {
    showTypingDots();
    if (typingSound) {
      typingSound.loop = true;
      typingSound.play();
    }

    try {
      const res = await fetch("https://phoenix-chatbot-api.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, something went wrong.";

      removeTypingDots();
      if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
      }

      animateReply(reply); // 👈 reply is animated word-by-word

    } catch (err) {
      removeTypingDots();
      appendMessage("Unable to connect to server 😞", "bot");
      if (typingSound) {
        typingSound.pause();
        typingSound.currentTime = 0;
      }
    }
  }
});

// Typed.js effect (optional)
if (typeof Typed !== 'undefined') {
  new Typed("#typed", {
    strings: [
      "We build autonomous flying machines.",
      "We innovate. We fly. We lead.",
      "Team Phoenix — Rising Beyond Limits."
    ],
    typeSpeed: 10,
    backSpeed: 5,
    loop: true
  });
}

// Embla Carousel (optional)
if (typeof EmblaCarousel !== 'undefined') {
  const emblaNode = document.querySelector('.embla');
  if (emblaNode) {
    EmblaCarousel(emblaNode, {
      loop: true,
      draggable: true,
      align: 'center'
    });
  }
}
