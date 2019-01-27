import { QuickPickItem } from "vscode";

export default interface State {
	title: string;
	step: number;
	totalSteps: number;
	appType: QuickPickItem;
	appName: string;
	packageName: string;
	appVersion: QuickPickItem;
	appComponents: QuickPickItem;
}
