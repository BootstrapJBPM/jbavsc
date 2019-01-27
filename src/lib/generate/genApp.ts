import { ExtensionContext, window, workspace } from "vscode";
import State from "./configState";
import * as jba from "jba-cli";

export async function runDefaultApp(context: ExtensionContext) {
	let workspaceRoot = workspace.rootPath;
	if (!workspaceRoot) {
		window.showInformationMessage(
			`Unable to generate app - no workspace root found.'`
		);
		return;
	}
	return await new Promise<string>((resolve, reject) => {
		try {
			jba.getAndGenerate(
				{},
				true,
				"https://start.jbpm.org/gen",
				true,
				workspaceRoot
			);
			resolve("done");
		} catch (e) {
			reject(e);
		}
	});
}

export async function runConfiguredApp(
	context: ExtensionContext,
	configState: State
) {
	var appDetails = {
		capabilities: "bpm",
		packagename: "com.company",
		name: "business-application",
		version: "",
		options: "kjar,model,service"
	};

	if (configState.appName) {
		appDetails.name = configState.appName;
	}
	if (configState.packageName) {
		appDetails.packagename = configState.packageName;
	}
	if (configState.appVersion) {
		appDetails.version = configState.appVersion.label;
	}
	if (configState.appComponents) {
		var appComponentsVal = configState.appComponents.label;
		if (appComponentsVal === "Business Assets") {
			appDetails.options = "kjar,model,service";
		} else if (appComponentsVal === "Dynamic Assets") {
			appDetails.options = "dkjar,model,service";
		}
	}
	if (configState.appType) {
		var appTypeVal = configState.appType.label;
		if (appTypeVal === "Business Automation") {
			appDetails.capabilities = "bpm";
		} else if (appTypeVal === "Decision Management") {
			appDetails.capabilities = "brm";
		} else if (appTypeVal === "Business Optimization") {
			appDetails.capabilities = "planner";
		}
	}

	let workspaceRoot = workspace.rootPath;
	if (!workspaceRoot) {
		window.showInformationMessage(
			`Unable to generate app - no workspace root found.'`
		);
		return;
	}

	return await new Promise<string>((resolve, reject) => {
		try {
			jba.getAndGenerate(
				appDetails,
				true,
				"https://start.jbpm.org/gen",
				true,
				workspaceRoot
			);
			resolve("done");
		} catch (e) {
			reject(e);
		}
	});
}
