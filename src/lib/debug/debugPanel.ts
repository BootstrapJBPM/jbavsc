import { window, ExtensionContext, ViewColumn } from "vscode";
import AppState from "./appState";
import { getDebugContent } from "./content/debugContent";
import { getMedia } from "../shared/utils";

export async function createDebugPanel(
	context: ExtensionContext,
	appState: AppState
) {
	const createDebugPanel = window.createWebviewPanel(
		"jbpmAppDebugger",
		`jBPM App Debugger - ${appState.url}`,
		ViewColumn.One,
		{
			enableScripts: true
		}
	);

	const media = getMedia(context);

	createDebugPanel.onDidDispose(
		() => {
			// panel cleanup code here...
		},
		null,
		context.subscriptions
	);

	createDebugPanel.webview.html = getDebugContent(context, appState, media);

	createDebugPanel.webview.onDidReceiveMessage(
		message => {
			switch (message.command) {
				case "info":
					window.showInformationMessage(message.text);
					return;
				case "alert":
					window.showErrorMessage(message.text);
					return;
			}
		},
		undefined,
		context.subscriptions
	);
}
