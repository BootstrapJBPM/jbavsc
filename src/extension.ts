"use strict";

import { window, commands, ExtensionContext, QuickPickItem } from "vscode";
import { getDefaultApp } from "./genDefaultApp";
import { genConfigureApp } from "./genConfigureApp";

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand("jbpm.jbavsc", async () => {
			const quickPick = window.createQuickPick();
			const items: QuickPickItem[] = [
				{
					label: "Generate default Business App",
					description: "Uses default settings to generate"
				},
				{
					label: "Configure Business App",
					description: "Configure app settings before generating"
				}
			];
			quickPick.items = items;
			quickPick.onDidChangeSelection(selection => {
				if (selection[0]) {
					if (selection[0].label === items[0].label) {
						getDefaultApp(context)
							.then(message => {
								window.showInformationMessage(`${message}`);
							})
							.catch(err => {
								window.showInformationMessage(`Error: ${err}`);
							});
						quickPick.dispose();
					} else if (selection[0].label === items[1].label) {
						genConfigureApp(context)
							.then(message => {
								window.showInformationMessage(`${message}`);
							})
							.catch(err => {
								window.showInformationMessage(`Error: ${err}`);
							});
					} else {
						window.showInformationMessage(
							`Invalid command ${selection[0]}`
						);
					}
				}
			});
			quickPick.onDidHide(() => quickPick.dispose());
			quickPick.show();
		})
	);
}
