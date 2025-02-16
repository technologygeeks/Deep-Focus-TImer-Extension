const vscode = require("vscode");

function activate(context) {
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBar.text = "⏰ Set Timer";
  statusBar.command = "timer.helloWorld";
  statusBar.show();

  let countdown = 0;
  let timerInterval = null;

  let disposable = vscode.commands.registerCommand("timer.helloWorld", async function () {
    if (timerInterval) {
      vscode.window.showWarningMessage("A timer is already running!");
      return;
    }

    // Get user input for timer duration
    const input = await vscode.window.showInputBox({
      prompt: "Enter timer duration (in minutes)",
      placeHolder: "e.g., 1 for 1 minute",
      validateInput: (value) => {
        return isNaN(value) || value <= 0 ? "Please enter a valid positive number." : null;
      }
    });

    if (!input) return; // If user cancels input, do nothing

    countdown = parseInt(input) * 60; // Convert minutes to seconds
    statusBar.text = `⏳ ${formatTime(countdown)}`;

    // Start the countdown
    timerInterval = setInterval(() => {
      countdown--;
      statusBar.text = `⏳ ${formatTime(countdown)}`;

      if (countdown <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        statusBar.text = "✅ Time's Up!";
        vscode.window.showInformationMessage("Pomodoro session completed! 🎉");

        // Show white screen for 30 seconds
        showWhiteScreen();
      }
    }, 1000);
  });

  context.subscriptions.push(disposable);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function showWhiteScreen() {
  const panel = vscode.window.createWebviewPanel(
    "whiteScreen",
    "Break Time ⏳",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.html = `
    <html>
      <body style="background-color: white; display: flex; justify-content: center; align-items: center; height: 100vh;">
        <h1 style="font-size: 48px; color: black;">Take a Break! ☕</h1>
      </body>
    </html>
  `;

  // Close the panel after 30 seconds
  setTimeout(() => panel.dispose(), 30000);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
