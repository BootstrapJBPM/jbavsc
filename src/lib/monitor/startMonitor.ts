import { window, ExtensionContext } from "vscode";
import AppState from "./appState";
import MultiStepInput from "../shared/multistep";
import { createMonitorPanel } from "./monitorPanel";

export async function startMonitor(context: ExtensionContext) {
	const title = "Monitor your jBPM Business App";

	async function collectInputs() {
		const appState = {} as Partial<AppState>;
		await MultiStepInput.run(input => inputAppUrl(input, appState));
		return appState as AppState;
	}

	async function inputAppUrl(
		input: MultiStepInput,
		appState: Partial<AppState>
	) {
		appState.url = await input.showInputBox({
			title,
			step: 1,
			totalSteps: 3,
			value:
				typeof appState.url === "string"
					? appState.url
					: "http://localhost:8090",
			prompt: "Enter app rest URL",
			validate: validateInput,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => inputAppUserName(input, appState);
	}

	async function inputAppUserName(
		input: MultiStepInput,
		appState: Partial<AppState>
	) {
		appState.username = await input.showInputBox({
			title,
			step: 2,
			totalSteps: 3,
			value:
				typeof appState.username === "string"
					? appState.username
					: "user",
			prompt: "Auth username (leave blank if no auth configured)",
			validate: validateInput,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => inputAppUserPassword(input, appState);
	}

	async function inputAppUserPassword(
		input: MultiStepInput,
		appState: Partial<AppState>
	) {
		appState.password = await input.showInputBox({
			title,
			step: 3,
			totalSteps: 3,
			value:
				typeof appState.password === "string"
					? appState.password
					: "user",
			prompt: "Auth password (leave blank if no auth configured)",
			validate: validateInput,
			shouldResume: shouldResume
		});
	}

	function shouldResume() {
		return new Promise<boolean>((resolve, reject) => {});
	}

	async function validateInput(name: string) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return name.length < 0 ? "Invalid Input" : undefined;
	}

	const appState = await collectInputs();

	// make sure appState url ends with slash
	if (!appState.url.endsWith("/")) {
		appState.url = appState.url + "/";
	}
	createMonitorPanel(context, appState);
}
