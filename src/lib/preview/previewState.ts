import { Uri } from "vscode";

export default interface PreviewState {
	uri: Uri;
	content: string;
	processid: string;
	processdirpath: string;
}
