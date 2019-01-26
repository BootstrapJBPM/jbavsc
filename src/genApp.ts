import { ExtensionContext, window, workspace } from "vscode";
import State from "./configState";
import * as cp from "child_process";

export async function runDefaultApp(context: ExtensionContext) {
	const commands: Array<string> = [
		`cd ${process.cwd()}`,
		`npm install -g jba-cli`,
		`jba gen --quick --unzip`
	];

	let workspaceRoot = workspace.rootPath;
	if (!workspaceRoot) {
		window.showInformationMessage(
			`Unable to generate app - no workspace root found.'`
		);
		return;
	}

	return await new Promise<string>((resolve, reject) => {
		try {
			commands.forEach(async cmd => {
				exec(cmd, {
					cwd: workspaceRoot,
					stdio: "inherit"
				});
			});
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
	var commands: Array<string> = [
		`cd ${process.cwd()}`,
		`npm install -g jba-cli`
	];
	var genCommand = "jba gen --quick --unzip";
	if (configState.appName) {
		genCommand = genCommand.concat(` --name=${configState.appName}`);
	}
	if (configState.packageName) {
		genCommand = genCommand.concat(
			` --packagename=${configState.packageName}`
		);
	}
	if (configState.appVersion) {
		genCommand = genCommand.concat(
			` --version=${configState.appVersion.label}`
		);
	}
	if (configState.appComponents) {
		var appComponentsVal = configState.appComponents.label;
		if (appComponentsVal === "Business Assets") {
			genCommand = genCommand.concat(` --options=kjar,model,service`);
		} else if (appComponentsVal === "Dynamic Assets") {
			genCommand = genCommand.concat(` --options=dkjar,model,service`);
		}
	}
	if (configState.appType) {
		var appTypeVal = configState.appType.label;
		if (appTypeVal === "Business Automation") {
			genCommand = genCommand.concat(` --capabilities=bpm`);
		} else if (appTypeVal === "Decision Management") {
			genCommand = genCommand.concat(` --capabilities=brm`);
		} else if (appTypeVal === "Business Optimization") {
			genCommand = genCommand.concat(` --capabilities=planner`);
		}
	}

	commands.push(genCommand);

	let workspaceRoot = workspace.rootPath;
	if (!workspaceRoot) {
		window.showInformationMessage(
			`Unable to generate app - no workspace root found.'`
		);
		return;
	}

	return await new Promise<string>((resolve, reject) => {
		try {
			commands.forEach(async cmd => {
				await exec(cmd, {
					cwd: workspaceRoot,
					stdio: "inherit"
				});
			});
			resolve("done");
		} catch (e) {
			reject(e);
		}
	});
}

function exec(command: string, options: cp.ExecSyncOptions) {
	console.log(`Executing command: ${command}`);
	cp.execSync(command, options);
}
