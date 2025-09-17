export default class Alert {
  constructor(url) {
    this.url = url;
  }

  async init() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error("Failed to load alerts");
      const alerts = await response.json();

      if (alerts.length > 0) {
        this.renderAlerts(alerts);
      }
    } catch (error) {
      console.error("Alert load error:", error);
    }
  }

  renderAlerts(alerts) {
    const main = document.querySelector("main");
    if (!main) return;

    // Create container
    const section = document.createElement("section");
    section.classList.add("alert-list");

    // Loop through alerts
    alerts.forEach((alert) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("alert");
      wrapper.style.background = alert.background;
      wrapper.style.color = alert.color;
      wrapper.style.padding = "1rem";
      wrapper.style.marginBottom = "0.5rem";
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "space-between";
      wrapper.style.alignItems = "center";
      wrapper.style.borderRadius = "6px";

      // Message
      const message = document.createElement("span");
      message.textContent = alert.message;

      // Dismiss button
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "✖";
      closeBtn.style.background = "transparent";
      closeBtn.style.border = "none";
      closeBtn.style.color = alert.color;
      closeBtn.style.fontSize = "1.2rem";
      closeBtn.style.cursor = "pointer";

      closeBtn.addEventListener("click", () => {
        wrapper.remove();
      });

      wrapper.appendChild(message);
      wrapper.appendChild(closeBtn);
      section.appendChild(wrapper);
    });

    // Prepend to main
    main.prepend(section);
  }
}