import { window, ExtensionContext, ViewColumn, Uri } from "vscode";
import AppState from "./appState";
import { getDebugContent } from "./content/debugContent";
import * as path from "path";

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

	const media = {
		extlogo: getMediaUri(context, "ext_logo.png"),
		extcss: getMediaUri(context, "ext_style.css")
	};

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

function getMediaUri(context: ExtensionContext, mediaName: string): string {
	var onDiskPath = Uri.file(
		path.join(context.extensionPath, "media", mediaName)
	);
	return onDiskPath.with({ scheme: "vscode-resource" }).toString();
}
