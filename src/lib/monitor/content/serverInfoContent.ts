import { ExtensionContext } from "vscode";
import AppState from "../appState";

export function getServerInfoContent(
	context: ExtensionContext,
	appState: AppState,
	media: any
): string {
	return ` 
    <div class="card" id="serverinfodiv">
        <div class="card-header">
            <span>
                <i class="fa fa-info-circle"></i>&nbsp;
                <strong>App Server Info</strong>
            </span>
        </div>
        <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>`;
}
