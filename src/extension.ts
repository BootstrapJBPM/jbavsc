"use strict";

import { commands, ExtensionContext } from "vscode";
import { startGen } from "./lib/generate/startGen";
import { startDebugger } from "./lib/debug/debugMonitor";

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand("jbpm.jbavsc", async () => {
			startGen(context);
		}),
		commands.registerCommand("jbpm.jbavsc.debug", async () => {
			startDebugger(context);
		})
	);
}
