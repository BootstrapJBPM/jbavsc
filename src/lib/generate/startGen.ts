import { window, ExtensionContext, QuickPickItem } from "vscode";
import { runDefaultApp } from "./genApp";
import { genConfigureApp } from "./genConfigureApp";
import { confirmAndGen } from "./confirmAndGen";

export function startGen(context: ExtensionContext) {
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
	quickPick.title = "Select generation option";
	quickPick.onDidChangeSelection(selection => {
		if (selection[0]) {
			if (selection[0].label === items[0].label) {
				quickPick.dispose();
				confirmAndGen(runDefaultApp, context);
			} else if (selection[0].label === items[1].label) {
				genConfigureApp(context);
			} else {
				window.showInformationMessage(
					`Invalid command ${selection[0]}`
				);
			}
		}
	});
	quickPick.onDidHide(() => quickPick.dispose());
	quickPick.show();
}
