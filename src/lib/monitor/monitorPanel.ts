import { window, ExtensionContext, ViewColumn, Uri } from "vscode";
import AppState from "./appState";
import { getMonitorContent } from "./content/monitorContent";
import * as path from "path";

export async function createMonitorPanel(
	context: ExtensionContext,
	appState: AppState
) {
	const createMonitorPanel = window.createWebviewPanel(
		"jbpmAppMonitor",
		`jBPM App Monitor - ${appState.url}`,
		ViewColumn.One,
		{
			enableScripts: true
		}
	);

	const media = {
		extlogo: getMediaUri(context, "ext_logo.png"),
		extcss: getMediaUri(context, "ext_style.css")
	};

	createMonitorPanel.onDidDispose(
		() => {
			// panel cleanup code here...
		},
		null,
		context.subscriptions
	);

	createMonitorPanel.webview.html = getMonitorContent(
		context,
		appState,
		media
	);

	createMonitorPanel.webview.onDidReceiveMessage(
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
