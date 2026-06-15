(function () {
  const config = window.DATE_APP_CONFIG;
  const state = {
    date: null,
    time: null,
    food: null,
    watch: null,
  };

  const panels = Array.from(document.querySelectorAll(".step-panel"));
  const inviteActions = document.querySelector("#invite-actions");
  const noButton = document.querySelector("#no-button");
  const yesButton = document.querySelector("#yes-button");
  const dateGrid = document.querySelector("#date-grid");
  const timeGrid = document.querySelector("#time-grid");
  const selectedDateNote = document.querySelector("#selected-date-note");
  const foodGrid = document.querySelector("#food-grid");
  const watchGrid = document.querySelector("#watch-grid");
  const finishButton = document.querySelector("#finish-button");
  const finalMessage = document.querySelector("#final-message");
  const copyButton = document.querySelector("#copy-button");
  const copyFeedback = document.querySelector("#copy-feedback");
  const mailLink = document.querySelector("#mail-link");

  function showStep(stepId) {
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.id === stepId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function formatDate(dateValue) {
    const date = new Date(`${dateValue}T12:00:00`);
    return new Intl.DateTimeFormat("es-UY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  function getTimeParts(dateValue, timeUy) {
    const [hours, minutes] = timeUy.split(":").map(Number);
    const utcDate = zonedTimeToUtc(dateValue, hours, minutes, config.hostTimeZone);
    const uyTime = new Intl.DateTimeFormat("es-UY", {
      timeZone: config.hostTimeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(utcDate);
    const germanyTime = new Intl.DateTimeFormat("es-UY", {
      timeZone: config.guestTimeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(utcDate);

    return { uyTime, germanyTime };
  }

  function zonedTimeToUtc(dateValue, hours, minutes, timeZone) {
    const baseUtc = new Date(`${dateValue}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00Z`);
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(baseUtc);

    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    const asUtc = Date.UTC(
      Number(values.year),
      Number(values.month) - 1,
      Number(values.day),
      Number(values.hour),
      Number(values.minute),
      Number(values.second)
    );
    const offset = asUtc - baseUtc.getTime();
    return new Date(baseUtc.getTime() - offset);
  }

  function moveNoButton() {
    const area = inviteActions.getBoundingClientRect();
    const button = noButton.getBoundingClientRect();
    const padding = 8;
    const maxX = Math.max(area.width - button.width - padding, padding);
    const maxY = Math.max(area.height - button.height - padding, padding);
    const x = Math.floor(padding + Math.random() * (maxX - padding));
    const y = Math.floor(padding + Math.random() * (maxY - padding));

    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
    noButton.textContent = pickNoText();
  }

  function pickNoText() {
    const options = ["No", "Ni ahi", "Casi", "Fallaste", "Uy"];
    return options[Math.floor(Math.random() * options.length)];
  }

  function createButton(text, className, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  function renderDates() {
    dateGrid.innerHTML = "";
    config.dateOptions.forEach((option) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "date-card";
      card.innerHTML = `
        <span class="date-card-day">${formatDate(option.date)}</span>
        <strong>${option.title}</strong>
        <small>${option.note}</small>
      `;
      card.addEventListener("click", () => {
        state.date = option;
        state.time = null;
        renderTimes();
        showStep("step-time");
      });
      dateGrid.appendChild(card);
    });
  }

  function renderTimes() {
    const times = state.date.timesUy && state.date.timesUy.length ? state.date.timesUy : config.defaultTimesUy;
    timeGrid.innerHTML = "";
    selectedDateNote.textContent = `${formatDate(state.date.date)}. ${state.date.note}`;

    times.forEach((timeUy) => {
      const { uyTime, germanyTime } = getTimeParts(state.date.date, timeUy);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "time-card";
      button.innerHTML = `
        <strong>${uyTime}</strong>
        <span>Uruguay</span>
        <small>${germanyTime} en Alemania</small>
      `;
      button.addEventListener("click", () => {
        state.time = { uyTime, germanyTime };
        showStep("step-food");
      });
      timeGrid.appendChild(button);
    });
  }

  function renderChoiceGrid(grid, options, key) {
    grid.innerHTML = "";
    options.forEach((option) => {
      const button = createButton(option, "pill-button", () => {
        state[key] = option;
        Array.from(grid.children).forEach((child) => child.classList.remove("is-selected"));
        button.classList.add("is-selected");
        updateFinishState();
      });
      grid.appendChild(button);
    });
  }

  function updateFinishState() {
    finishButton.disabled = !(state.food && state.watch);
  }

  function buildMessage() {
    const dateText = formatDate(state.date.date);
    return `Mi amor precioso, mi bb bello, gracias por hacer esta cita y estas perdonado por la demora. Quiero el ${dateText} a las ${state.time.uyTime} de Uruguay (${state.time.germanyTime} en Alemania), comer ${state.food} y mirar ${state.watch} juntos. Te quiero un monton.`;
  }

  function finish() {
    const message = buildMessage();
    finalMessage.value = message;
    mailLink.href = `mailto:${encodeURIComponent(config.yourEmail)}?subject=${encodeURIComponent("Cita con Ari confirmada")}&body=${encodeURIComponent(message)}`;
    copyFeedback.textContent = "";
    showStep("step-result");
  }

  async function copyFinalMessage() {
    try {
      await navigator.clipboard.writeText(finalMessage.value);
      copyFeedback.textContent = "Copiado. Ahora WhatsApp puede recibir esta obra romantica.";
    } catch (error) {
      finalMessage.select();
      document.execCommand("copy");
      copyFeedback.textContent = "Copiado. Si el navegador se puso dramatico, el texto quedo seleccionado.";
    }
  }

  noButton.addEventListener("pointerenter", moveNoButton);
  noButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    moveNoButton();
  });
  noButton.addEventListener("click", (event) => {
    event.preventDefault();
    moveNoButton();
  });

  yesButton.addEventListener("click", () => showStep("step-date"));
  finishButton.addEventListener("click", finish);
  copyButton.addEventListener("click", copyFinalMessage);

  document.querySelectorAll("[data-back]").forEach((button) => {
    button.addEventListener("click", () => showStep(button.dataset.back));
  });

  renderDates();
  renderChoiceGrid(foodGrid, config.foodOptions, "food");
  renderChoiceGrid(watchGrid, config.watchOptions, "watch");
})();
