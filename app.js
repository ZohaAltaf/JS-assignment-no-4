let currentMode = "forward";

const controlsEl = document.getElementById("controls");
const outputEl = document.getElementById("output");
const statusMsgEl = document.getElementById("statusMsg");
const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    renderControls();
    generateResult();
  });
});

function renderControls() {
  statusMsgEl.textContent = "";
  outputEl.innerHTML = "";

  if (currentMode === "forward" || currentMode === "backward" || currentMode === "evenodd") {
    const startVal = currentMode === "backward" ? 20 : 1;
    const endVal = currentMode === "backward" ? 1 : 20;

    controlsEl.innerHTML = `
      <div class="input-group">
        <label for="startNum">Start Number</label>
        <input type="number" id="startNum" value="${startVal}" />
      </div>
      <div class="input-group">
        <label for="endNum">End Number</label>
        <input type="number" id="endNum" value="${endVal}" />
      </div>
      <button class="action-btn" id="runBtn"> Show Numbers</button>
    `;
  } else if (currentMode === "table") {
    controlsEl.innerHTML = `
      <div class="input-group">
        <label for="tableNum">Table Of</label>
        <input type="number" id="tableNum" value="5" min="1" />
      </div>
      <div class="input-group">
        <label for="tableLimit">Up To</label>
        <input type="number" id="tableLimit" value="10" min="1" max="30" />
      </div>
      <button class="action-btn" id="runBtn">✖️ Build Table</button>
    `;
  } else if (currentMode === "calc") {
    controlsEl.innerHTML = `
      <div class="input-group">
        <label for="num1">First Number</label>
        <input type="number" id="num1" value="15" />
      </div>
      <div class="input-group">
        <label for="operator">Operation</label>
        <select id="operator">
          <option value="+">+ (Add)</option>
          <option value="-">- (Subtract)</option>
          <option value="*">× (Multiply)</option>
          <option value="/">÷ (Divide)</option>
        </select>
      </div>
      <div class="input-group">
        <label for="num2">Second Number</label>
        <input type="number" id="num2" value="9" />
      </div>
      <button class="action-btn" id="runBtn">🧮 Solve</button>
    `;
  }

  document.getElementById("runBtn").addEventListener("click", generateResult);
}

function generateResult() {
  statusMsgEl.textContent = "";
  outputEl.innerHTML = "";

  if (currentMode === "forward") {
    const start = Number(document.getElementById("startNum").value);
    const end = Number(document.getElementById("endNum").value);

    if (start > end) {
      statusMsgEl.textContent = "⚠️ Start number must be smaller than or equal to End number.";
      return;
    }
    if (end - start > 100) {
      statusMsgEl.textContent = "⚠️ Please keep the range within 100 numbers for best display.";
      return;
    }

    let colorIndex = 0;
    for (let i = start; i <= end; i++) {
      const tile = document.createElement("div");
      tile.className = `num-tile tile-${colorIndex % 4}`;
      tile.textContent = i;
      outputEl.appendChild(tile);
      colorIndex++;
    }
  } else if (currentMode === "backward") {
    const start = Number(document.getElementById("startNum").value);
    const end = Number(document.getElementById("endNum").value);

    if (start < end) {
      statusMsgEl.textContent = "⚠️ Start number must be greater than or equal to End number.";
      return;
    }
    if (start - end > 100) {
      statusMsgEl.textContent = "⚠️ Please keep the range within 100 numbers for best display.";
      return;
    }

    let colorIndex = 0;
    for (let i = start; i >= end; i--) {
      const tile = document.createElement("div");
      tile.className = `num-tile tile-${colorIndex % 4}`;
      tile.textContent = i;
      outputEl.appendChild(tile);
      colorIndex++;
    }
  } else if (currentMode === "evenodd") {
    const start = Number(document.getElementById("startNum").value);
    const end = Number(document.getElementById("endNum").value);

    if (start > end) {
      statusMsgEl.textContent = "⚠️ Start number must be smaller than or equal to End number.";
      return;
    }

    for (let i = start; i <= end; i++) {
      const isEven = i % 2 === 0;
      const tile = document.createElement("div");
      tile.className = `num-tile ${isEven ? "tile-2" : "tile-1"}`;
      tile.innerHTML = `<span>${i}</span><span class="tile-tag">${isEven ? "Even" : "Odd"}</span>`;
      outputEl.appendChild(tile);
    }
  } else if (currentMode === "table") {
    const num = Number(document.getElementById("tableNum").value);
    const limit = Number(document.getElementById("tableLimit").value);

    const grid = document.createElement("div");
    grid.className = "table-grid";

    for (let i = 1; i <= limit; i++) {
      const card = document.createElement("div");
      card.className = "table-card";
      card.innerHTML = `<span>${num} × ${i}</span> <span class="ans">= ${num * i}</span>`;
      grid.appendChild(card);
    }
    outputEl.appendChild(grid);
  } else if (currentMode === "calc") {
    const a = Number(document.getElementById("num1").value);
    const b = Number(document.getElementById("num2").value);
    const op = document.getElementById("operator").value;

    let symbol = op;
    let ans;

    if (op === "+") ans = a + b;
    if (op === "-") ans = a - b;
    if (op === "*") {
      symbol = "×";
      ans = a * b;
    }
    if (op === "/") {
      symbol = "÷";
      if (b === 0) {
        statusMsgEl.textContent = "⚠️ Cannot divide by zero!";
        return;
      }
      ans = Number.isInteger(a / b) ? a / b : (a / b).toFixed(2);
    }

    const banner = document.createElement("div");
    banner.className = "calc-banner";
    banner.textContent = `${a} ${symbol} ${b} = ${ans}`;
    outputEl.appendChild(banner);
  }
}

renderControls();
generateResult();