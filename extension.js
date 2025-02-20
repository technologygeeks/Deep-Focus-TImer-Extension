const vscode = require("vscode");
const getBreakScreenHTML=require("./Web_load")
function activate(context) {
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  const cmd = "Focus.Timer";
  statusBar.text = "⏰ Focus Timer";
  statusBar.command = cmd;
  statusBar.show();

  let timerInterval = null;

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

  context.subscriptions.push(disposable);
}

function getTimeOptions() {
  return [
    { label: "15 minutes (Short break)", duration: 0.1 },
    { label: "30 minutes (Perfect for focus)", duration: 30 },
    { label: "45 minutes (Deep work time)", duration: 45 },
    { label: "60 minutes (Extended session)", duration: 60 },
  ];
}

function startTimer(countdown, statusBar) {
  statusBar.text = `⏳ Starting... ${formatTime(countdown)} remaining`;
  vscode.window.showInformationMessage(`Starting focus session for ${countdown / 60} minutes...`);

  let timerInterval = setInterval(() => {
    if (--countdown <= 0) {
      clearInterval(timerInterval);
      statusBar.text = "✅ Time's up!";
      vscode.window.showInformationMessage("Pomodoro session complete! 🎉 Take a break.");
      showBreakScreen();
    } else {
      statusBar.text = `⏳ Time left: ${formatTime(countdown)}`;
    }
  }, 1000);
}

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function showBreakScreen() {
  const panel = vscode.window.createWebviewPanel(
    "whiteScreen",
    "Take a Break! ⏳",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = getBreakScreenHTML();
  setTimeout(() => panel.dispose(), 5 * 60 * 1000);
}


function deactivate() {}

module.exports = { activate, deactivate };
