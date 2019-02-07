import { ExtensionContext } from "vscode";
import AppState from "../appState";
import { getServerInfoContent } from "./serverInfoContent";
import { getServerContainersContent } from "./containersInfoContent";
import { getProcessInstanceContent } from "./processInstancesContent";
import { getProcessDefsContent } from "./processDefsContent";
import { getProcessErrorsContent } from "./processErrorsContent";
import { getLeftNav } from "./leftNav";
import { addScripts } from "./scripts";

export function getDebugContent(
	context: ExtensionContext,
	appState: AppState,
	media: any
) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jBPM Business App Monitoring</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="${media.extcss}">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap-confirmation2@4.0.2/dist/bootstrap-confirmation.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.12/handlebars.min.js"></script>
    <script src="${media.celleditorjs}"></script>
</head>
<body>

<nav class="navbar navbar-light bg-light fixed-top flex-md-nowrap p-0">
      <span class="align-middle">
    &nbsp;&nbsp;&nbsp;<img src="${
		media.extlogo
	}" width="40" height="40" class="d-inline-block align-middle" alt="">
   <strong>jBPM Business App Debugger</strong> (${appState.url})
    </span>
    <div class="pull-right">
        <button id="refreshdata" type="button" class="btn btn-secondary btn-sm"><i class="fa fa-refresh"></i>&nbsp;Refresh info</button>&nbsp;&nbsp;&nbsp;
    </div>
</nav>

<div class="container-fluid">
      <div class="row">
        ${getLeftNav(context, appState, media)}

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div id="cannotconnectdiv" class="alert alert-danger" role="alert" style="display:none">
                Cannot contact ${
					appState.url
				}. Make sure your business app is started and has CORS enabled.
            </div>
            <br/>
            ${getServerInfoContent(context, appState, media)}
            <br/>
            ${getServerContainersContent(context, appState, media)}
            <br/>
            ${getProcessDefsContent(context, appState, media)}
            <br/>
            ${getProcessInstanceContent(context, appState, media)}
            <br/>
            ${getProcessErrorsContent(context, appState, media)}       
        </main>
      </div>
</div>
${addScripts(context, appState, media)}
</body>
</html>`;
}
