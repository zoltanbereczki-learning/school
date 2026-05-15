const STORAGE_KEY = "learningSchool.learnerName";

const dialog = document.getElementById("name-dialog");
const input = document.getElementById("learner-input");
const greeting = document.getElementById("hero-greeting");
const chipName = document.getElementById("chip-name");

function readName() {
  try {
    return (localStorage.getItem(STORAGE_KEY) || "").trim();
  } catch {
    return "";
  }
}

function saveName(name) {
  const trimmed = name.trim();
  if (!trimmed) return "";
  try {
    localStorage.setItem(STORAGE_KEY, trimmed);
  } catch {
    /* ignore */
  }
  return trimmed;
}

function updateUi(name) {
  const hasName = Boolean(name);
  if (greeting) {
    greeting.textContent = hasName ? `Szia, ${name}! 👋` : "Szia! 👋";
    greeting.hidden = false;
  }
  if (chipName) chipName.textContent = hasName ? name : "Név";
}

function openDialog(prefill = "") {
  if (!dialog || !input) return;
  input.value = prefill;
  dialog.hidden = false;
  input.focus();
  input.select();
}

function closeDialog() {
  if (dialog) dialog.hidden = true;
}

function submitName() {
  const name = saveName(input?.value || "");
  if (!name) {
    input?.focus();
    return;
  }
  updateUi(name);
  closeDialog();
}

document.getElementById("open-name")?.addEventListener("click", () => openDialog(readName()));
document.getElementById("save-name")?.addEventListener("click", submitName);
document.getElementById("skip-name")?.addEventListener("click", closeDialog);
input?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") submitName();
});

document.querySelector('[data-app="romanian"]')?.addEventListener("click", () => {
  window.location.href = "tanuljromanul.html";
});

const saved = readName();
updateUi(saved);
if (!saved) openDialog();
