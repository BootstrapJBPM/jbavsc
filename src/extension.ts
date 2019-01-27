"use strict";

import { commands, ExtensionContext } from "vscode";
import { startGen } from "./lib/generate/startGen";
import { startMonitor } from "./lib/monitor/startMonitor";

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand("jbpm.jbavsc", async () => {
			startGen(context);
		}),
		commands.registerCommand("jbpm.jbavsc.monitor", async () => {
			startMonitor(context);
		})
	);
}
