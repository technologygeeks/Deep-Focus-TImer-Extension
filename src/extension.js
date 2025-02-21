const vscode = require("vscode");
const getBreakScreenHTML = require("./Web_load");
const formatTime = require("./Timer/format_time");

let timerInterval = null;
let countdown = 0;
let isPaused = false;
const focus_history = [];
function activate(context) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  const cmd = "Focus.Timer";
  statusBar.text = "⏰ Focus Timer";
  statusBar.command = cmd;
  statusBar.show();

  let disposable = vscode.commands.registerCommand(cmd, async function () {
    if (timerInterval) {
      return vscode.window.showWarningMessage(
        "A timer is already running! Please finish or cancel it first."
      );
    }

    const selected = await vscode.window.showQuickPick(getTimeOptions(), {
      placeHolder: "Select a focus time duration",
    });
    if (!selected) return;

    startTimer(selected.duration * 60, statusBar);
  });

  let pauseCommand = vscode.commands.registerCommand(
    "Focus.Pause",
    function () {
      togglePause(statusBar);
    }
  );

  context.subscriptions.push(disposable, pauseCommand);
}

function getTimeOptions() {
  return [
    { label: "Testing the Extension", duration: 0.1 },
    { label: "25 minutes (Pomodoro)", duration: 25 },
    { label: "45 minutes (Deep Work)", duration: 45 },
    { label: "60 minutes (Extended Session)", duration: 60 },
  ];
}

async function startTimer(duration, statusBar) {
  if (duration === "custom") {
    const input = await vscode.window.showInputBox({
      prompt: "Enter focus duration in minutes",
    });
    duration = parseInt(input) * 60;
    if (isNaN(duration) || duration <= 0)
      return vscode.window.showErrorMessage("Invalid time entered!");
  }

  countdown = duration;
  isPaused = false;

  statusBar.text = `⏳ Starting... ${formatTime(countdown)} remaining`;
  vscode.window.showInformationMessage(
    `Focus session started for ${duration / 60} minutes!`
  );

  timerInterval = setInterval(() => {
    if (isPaused) return;

    if (--countdown <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      statusBar.text = "✅ Time's up!";
      vscode.window.showInformationMessage(
        "Take a break."
      );
      showBreakScreen();
      focus_history.push({
        date: new Date().toISOString(),
        duration: duration / 60,
      });
      // console.log(focus_history);
    } else {
      statusBar.text = `⏳ Time left: ${formatTime(countdown)}`;
    }
  }, 1000);
}

function togglePause(statusBar) {
  if (!timerInterval)
    return vscode.window.showWarningMessage("No timer is running!");

  isPaused = !isPaused;
  statusBar.text = isPaused
    ? "⏸️ Timer Paused"
    : `⏳ Time left: ${formatTime(countdown)}`;
  vscode.window.showInformationMessage(
    isPaused ? "Timer Paused!" : "Timer Resumed!"
  );
}

function showBreakScreen() {
  const panel = vscode.window.createWebviewPanel(
    "breakScreen",
    "Take a Break! ⏳",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );
  panel.webview.html = getBreakScreenHTML(focus_history);
  setTimeout(() => panel.dispose(), 5 * 60 * 1000);
}

function deactivate() {
  if (timerInterval) clearInterval(timerInterval);
}

module.exports = { activate, deactivate };
