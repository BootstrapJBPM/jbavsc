import {
	QuickPickItem,
	window,
	Disposable,
	QuickInputButton,
	QuickInput,
	ExtensionContext,
	QuickInputButtons
} from "vscode";
import { runConfiguredApp } from "./genApp";
import State from "./configState";

export async function genConfigureApp(context: ExtensionContext) {
	window.showInformationMessage("Configuring...");

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
		{ label: "7.17.0-SNAPSHOT" },
		{ label: "7.16.0.Final" },
		{ label: "7.15.0.Final" },
		{ label: "7.14.0.Final" },
		{ label: "7.15.0.Final" },
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

	return await new Promise<string>((resolve, reject) => {
		try {
			runConfiguredApp(context, confState);
			resolve("Successfully generated your jBPM Business Application");
		} catch (e) {
			reject(`Error generating your jBPM Business Application: ${e}`);
		}
	});
}

// -------------------------------------------------------
// Helper code that wraps the API for the multi-step case.
// -------------------------------------------------------

class InputFlowAction {
	private constructor() {}
	static back = new InputFlowAction();
	static cancel = new InputFlowAction();
	static resume = new InputFlowAction();
}

type InputStep = (input: MultiStepInput) => Thenable<InputStep | void>;

interface QuickPickParameters<T extends QuickPickItem> {
	title: string;
	step: number;
	totalSteps: number;
	items: T[];
	activeItem?: T;
	placeholder: string;
	buttons?: QuickInputButton[];
	shouldResume: () => Thenable<boolean>;
}

interface InputBoxParameters {
	title: string;
	step: number;
	totalSteps: number;
	value: string;
	prompt: string;
	validate: (value: string) => Promise<string | undefined>;
	buttons?: QuickInputButton[];
	shouldResume: () => Thenable<boolean>;
}

class MultiStepInput {
	static async run<T>(start: InputStep) {
		const input = new MultiStepInput();
		return input.stepThrough(start);
	}

	private current?: QuickInput;
	private steps: InputStep[] = [];

	private async stepThrough<T>(start: InputStep) {
		let step: InputStep | void = start;
		while (step) {
			this.steps.push(step);
			if (this.current) {
				this.current.enabled = false;
				this.current.busy = true;
			}
			try {
				step = await step(this);
			} catch (err) {
				if (err === InputFlowAction.back) {
					this.steps.pop();
					step = this.steps.pop();
				} else if (err === InputFlowAction.resume) {
					step = this.steps.pop();
				} else if (err === InputFlowAction.cancel) {
					step = undefined;
				} else {
					throw err;
				}
			}
		}
		if (this.current) {
			this.current.dispose();
		}
	}

	async showQuickPick<
		T extends QuickPickItem,
		P extends QuickPickParameters<T>
	>({
		title,
		step,
		totalSteps,
		items,
		activeItem,
		placeholder,
		buttons,
		shouldResume
	}: P) {
		const disposables: Disposable[] = [];
		try {
			return await new Promise<
				T | (P extends { buttons: (infer I)[] } ? I : never)
			>((resolve, reject) => {
				const input = window.createQuickPick<T>();
				input.title = title;
				input.step = step;
				input.totalSteps = totalSteps;
				input.placeholder = placeholder;
				input.items = items;
				if (activeItem) {
					input.activeItems = [activeItem];
				}
				input.buttons = [
					...(this.steps.length > 1 ? [QuickInputButtons.Back] : []),
					...(buttons || [])
				];
				disposables.push(
					input.onDidTriggerButton(item => {
						if (item === QuickInputButtons.Back) {
							reject(InputFlowAction.back);
						} else {
							resolve(<any>item);
						}
					}),
					input.onDidChangeSelection(items => resolve(items[0])),
					input.onDidHide(() => {
						(async () => {
							reject(
								shouldResume && (await shouldResume())
									? InputFlowAction.resume
									: InputFlowAction.cancel
							);
						})().catch(reject);
					})
				);
				if (this.current) {
					this.current.dispose();
				}
				this.current = input;
				this.current.show();
			});
		} finally {
			disposables.forEach(d => d.dispose());
		}
	}

	async showInputBox<P extends InputBoxParameters>({
		title,
		step,
		totalSteps,
		value,
		prompt,
		validate,
		buttons,
		shouldResume
	}: P) {
		const disposables: Disposable[] = [];
		try {
			return await new Promise<
				string | (P extends { buttons: (infer I)[] } ? I : never)
			>((resolve, reject) => {
				const input = window.createInputBox();
				input.title = title;
				input.step = step;
				input.totalSteps = totalSteps;
				input.value = value || "";
				input.prompt = prompt;
				input.buttons = [
					...(this.steps.length > 1 ? [QuickInputButtons.Back] : []),
					...(buttons || [])
				];
				let validating = validate("");
				disposables.push(
					input.onDidTriggerButton(item => {
						if (item === QuickInputButtons.Back) {
							reject(InputFlowAction.back);
						} else {
							resolve(<any>item);
						}
					}),
					input.onDidAccept(async () => {
						const value = input.value;
						input.enabled = false;
						input.busy = true;
						if (!(await validate(value))) {
							resolve(value);
						}
						input.enabled = true;
						input.busy = false;
					}),
					input.onDidChangeValue(async text => {
						const current = validate(text);
						validating = current;
						const validationMessage = await current;
						if (current === validating) {
							input.validationMessage = validationMessage;
						}
					}),
					input.onDidHide(() => {
						(async () => {
							reject(
								shouldResume && (await shouldResume())
									? InputFlowAction.resume
									: InputFlowAction.cancel
							);
						})().catch(reject);
					})
				);
				if (this.current) {
					this.current.dispose();
				}
				this.current = input;
				this.current.show();
			});
		} finally {
			disposables.forEach(d => d.dispose());
		}
	}
}
