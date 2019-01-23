import { window, ExtensionContext } from "vscode";
import { runDefaultApp } from "./genApp";

export async function getDefaultApp(context: ExtensionContext) {
	window.showInformationMessage("Generating...");
	return await new Promise<string>((resolve, reject) => {
		try {
			runDefaultApp(context);
			resolve("Successfully generated your jBPM Business Application");
		} catch (e) {
			reject(`Error generating your jBPM Business Application: ${e}`);
		}
	});
}
