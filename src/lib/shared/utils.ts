import { ExtensionContext, Uri } from "vscode";
import * as path from "path";

export function getMediaUri(
	context: ExtensionContext,
	mediaName: string
): string {
	var onDiskPath = Uri.file(
		path.join(context.extensionPath, "media", mediaName)
	);
	return onDiskPath.with({ scheme: "vscode-resource" }).toString();
}

export function getMedia(context: ExtensionContext) {
	return {
		extlogo: getMediaUri(context, "ext_logo.png"),
		extcss: getMediaUri(context, "ext_style.css"),
		extjs: getMediaUri(context, "ext_script.js"),
		extpreviewjs: getMediaUri(context, "ext_previewscript.js"),
		celleditorjs: getMediaUri(context, "SimpleTableCellEditor.js")
	};
}
