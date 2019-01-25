import { window, ExtensionContext } from "vscode";
import { runDefaultApp } from "./genApp";

export function getDefaultApp(context: ExtensionContext) {
	try {
		runDefaultApp(context);
		window.showInformationMessage(
			"Successfully generated your jBPM Business Application"
		);
	} catch (e) {
		window.showInformationMessage(
			`Error generating your jBPM Business Application: ${e}`
		);
	}
}
