import { Uri } from "vscode";

export default interface EditState {
	uri: Uri;
	content: string;
	processid: string;
	processdirpath: string;
}
