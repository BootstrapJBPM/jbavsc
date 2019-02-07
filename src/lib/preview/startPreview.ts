import { window, ExtensionContext, Uri, ViewColumn, workspace } from "vscode";
import PreviewState from "./previewState";
import { getPreviewContent } from "./previewContent";
import { getMedia } from "../shared/utils";
import * as path from "path";
import * as fs from "fs";

export async function startPreview(context: ExtensionContext, fileurl: Uri) {
	workspace.openTextDocument(fileurl).then(document => {
		let fileContent = document.getText().replace(/(?:\r\n|\r|\n)/g, " ");
		fileContent = fileContent.replace(/\\([\s\S])|(")/g, "\\$1$2");

		let previewState = {
			uri: fileurl,
			content: fileContent
		} as PreviewState;

		let folderPath: string | undefined =
			path.dirname(fileurl.fsPath) + path.sep;
		if (folderPath) {
			previewState.processdirpath = folderPath;
		}

		// get the process id out of the xml
		let processidregex = /bpmn2:process id="(.*?)"\s/gm;
		let processidmatches = processidregex.exec(document.getText());
		if (processidmatches !== null) {
			previewState.processid = processidmatches[1];
		}

		createPreviewPanel(context, previewState);
	});
}

async function createPreviewPanel(
	context: ExtensionContext,
	previewState: PreviewState
) {
	const previewPanel = window.createWebviewPanel(
		"processPreview",
		`Process Preview - ${previewState.uri.path.replace(/^.*[\\\/]/, "")}`,
		ViewColumn.One,
		{
			enableScripts: true
		}
	);

	previewPanel.onDidDispose(
		() => {
			// panel cleanup code here...
		},
		null,
		context.subscriptions
	);

	const media = getMedia(context);

	previewPanel.webview.html = getPreviewContent(context, previewState, media);

	previewPanel.webview.onDidReceiveMessage(
		message => {
			switch (message.command) {
				case "info":
					window.showInformationMessage(message.text);
					return;
				case "alert":
					window.showErrorMessage(message.text);
					return;
				case "savesvg":
					// start at <svg .../>
					var svgStart = message.svg.indexOf("<svg");
					let modifiedSvg = message.svg.substr(svgStart);

					fs.writeFile(message.filename, modifiedSvg, function(err) {
						if (err) {
							window.showErrorMessage(
								"Unable to save svg to file: " + err
							);
						} else {
							window.showInformationMessage(
								"Successfully saved process svg to file"
							);
						}
					});
					return;
			}
		},
		undefined,
		context.subscriptions
	);
}
