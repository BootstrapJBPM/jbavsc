"use strict";

import { window, commands, ExtensionContext, Uri } from "vscode";
import { startGen } from "./lib/generate/startGen";
import { startDebugger } from "./lib/debug/debugMonitor";
import { startPreview } from "./lib/preview/startPreview";

export function activate(context: ExtensionContext) {
	context.subscriptions.push(
		commands.registerCommand("jbpm.jbavsc", async () => {
			startGen(context);
		}),
		commands.registerCommand("jbpm.jbavsc.debug", async () => {
			startDebugger(context);
		}),
		commands.registerCommand(
			"jbpm.jbavsc.processquickview",
			async (uri: Uri) => {
				startPreview(context, uri);
			}
		)
	);
}
