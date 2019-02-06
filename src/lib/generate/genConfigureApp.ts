import { QuickPickItem, ExtensionContext } from "vscode";
import { runConfiguredApp } from "./genApp";
import State from "./configState";
import { confirmAndGen } from "./confirmAndGen";
import MultiStepInput from "../shared/multistep";

export async function genConfigureApp(context: ExtensionContext) {
	const title = "Configure your jBPM Business App";

	const appTypes: QuickPickItem[] = [
		{
			label: "Business Automation",
			description: "Process, case, decision management and optimization"
		},
		{
			label: "Decision Management",
			description: "Decision and rules features"
		},
		{
			label: "Business Optimization",
			description: "Planning problems and solutions"
		}
	];

	const appVersions: QuickPickItem[] = [
		{ label: "7.18.0-SNAPSHOT" },
		{ label: "7.17.0.Final" },
		{ label: "7.16.0.Final" },
		{ label: "7.15.0.Final" },
		{ label: "7.14.0.Final" },
		{ label: "7.13.0.Final" },
		{ label: "7.12.0.Final" }
	];

	const appComponents: QuickPickItem[] = [
		{
			label: "Business Assets",
			description: "Includes Business Assets, Data Model, and Service"
		},
		{
			label: "Dynamic Assets",
			description:
				"Includes Dynamic Assets (Case Managements), Data Model, and Service"
		}
	];

	async function collectInputs() {
		const state = {} as Partial<State>;
		await MultiStepInput.run(input => pickApplicationType(input, state));
		return state as State;
	}

	async function pickApplicationType(
		input: MultiStepInput,
		state: Partial<State>
	) {
		const pick = await input.showQuickPick({
			title,
			step: 1,
			totalSteps: 5,
			placeholder: "Pick Application Type",
			items: appTypes,
			activeItem:
				typeof state.appType !== "string" ? state.appType : undefined,
			shouldResume: shouldResume
		});
		state.appType = pick;
		return (input: MultiStepInput) => inputAppName(input, state);
	}

	async function inputAppName(input: MultiStepInput, state: Partial<State>) {
		state.appName = await input.showInputBox({
			title,
			step: 2,
			totalSteps: 5,
			value:
				typeof state.appName === "string"
					? state.appName
					: "business-application",
			prompt: "Choose a name for your app",
			validate: validateAppName,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => inputAppPackage(input, state);
	}

	async function inputAppPackage(
		input: MultiStepInput,
		state: Partial<State>
	) {
		state.packageName = await input.showInputBox({
			title,
			step: 3,
			totalSteps: 5,
			value:
				typeof state.packageName === "string"
					? state.packageName
					: "com.company",
			prompt: "Choose a package name for your app",
			validate: validateAppName,
			shouldResume: shouldResume
		});
		return (input: MultiStepInput) => pickApplicationVersion(input, state);
	}

	async function pickApplicationVersion(
		input: MultiStepInput,
		state: Partial<State>
	) {
		const pick = await input.showQuickPick({
			title,
			step: 4,
			totalSteps: 5,
			placeholder: "Pick Application Version",
			items: appVersions,
			activeItem:
				typeof state.appVersion !== "string"
					? state.appVersion
					: undefined,
			shouldResume: shouldResume
		});
		state.appVersion = pick;
		return (input: MultiStepInput) => pickAppComponents(input, state);
	}

	async function pickAppComponents(
		input: MultiStepInput,
		state: Partial<State>
	) {
		const pick = await input.showQuickPick({
			title,
			step: 5,
			totalSteps: 5,
			placeholder: "Pick Application Components",
			items: appComponents,
			activeItem:
				typeof state.appComponents !== "string"
					? state.appComponents
					: undefined,
			shouldResume: shouldResume
		});
		state.appComponents = pick;
	}

	function shouldResume() {
		// Could show a notification with the option to resume.
		return new Promise<boolean>((resolve, reject) => {});
	}

	async function validateAppName(name: string) {
		await new Promise(resolve => setTimeout(resolve, 1000));
		return name.length < 1 ? "Invalid app name" : undefined;
	}

	const confState = await collectInputs();
	confirmAndGen(runConfiguredApp, context, confState);
}
