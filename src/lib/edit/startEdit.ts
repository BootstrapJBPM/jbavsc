import { window, ExtensionContext, Uri, ViewColumn, workspace } from "vscode";
import EditState from "./editstate";
import { getEditContent } from "./editContent";
import { getMedia } from "../shared/utils";
import * as path from "path";
import * as fs from "fs";

export async function startEdit(context: ExtensionContext, fileurl: Uri) {
	workspace.openTextDocument(fileurl).then(document => {
		let fileContent = document.getText().replace(/(?:\r\n|\r|\n)/g, " ");
		fileContent = fileContent.replace(/\\([\s\S])|(")/g, "\\$1$2");

		let editState = {
			uri: fileurl,
			content: fileContent
		} as EditState;

		let folderPath: string | undefined =
			path.dirname(fileurl.fsPath) + path.sep;
		if (folderPath) {
			editState.processdirpath = folderPath;
		}

		// get the process id out of the xml
		let processidregex = /bpmn2:process id="(.*?)"\s/gm;
		let processidmatches = processidregex.exec(document.getText());
		if (processidmatches !== null) {
			editState.processid = processidmatches[1];
		}

		createEditPanel(context, editState);
	});
}

async function createEditPanel(
	context: ExtensionContext,
	editState: EditState
) {
	const editPanel = window.createWebviewPanel(
		"processEdit",
		`Edit Process - ${editState.uri.path.replace(/^.*[\\\/]/, "")}`,
		ViewColumn.One,
		{
			enableScripts: true
		}
	);

	editPanel.onDidDispose(
		() => {
			// panel cleanup code here...
		},
		null,
		context.subscriptions
	);

	const media = getMedia(context);

	editPanel.webview.html = getEditContent(context, editState, media);

	editPanel.webview.onDidReceiveMessage(
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
