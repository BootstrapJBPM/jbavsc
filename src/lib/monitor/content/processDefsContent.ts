import { ExtensionContext } from "vscode";
import AppState from "../appState";

export function getProcessDefsContent(
	context: ExtensionContext,
	appState: AppState,
	media: any
): string {
	return `
    <div class="card" id="processdefsdiv">
        <h5 class="card-header">
            <a data-toggle="collapse" href="#collapse-processdefs" aria-expanded="true" aria-controls="collapse-processdefsinfo" id="heading-processdefs" class="d-block">
                <i class="fa fa-chevron-down pull-right"></i>
                <i class="fa fa-file"></i>&nbsp;Process Definitions
            </a>
        </h5>
        <div id="collapse-processdefs" class="collapse show" aria-labelledby="heading-processdefs">
            <div class="card-body">
                <br/>
                <table class="table table-hover" id="processdefsinfotable">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">GAV</th>
                        <th scope="col">Container</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="modal fade" id="pdefimgmodal" tabindex="-1" role="dialog" aria-labelledby="pdefimglabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="pdefimglabel">Process Definition Image</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="iframe-container">
                        <iframe id="pdefimgmodalframe" class="embed-responsive-item" src=""></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="startprocessmodal" tabindex="-1" role="dialog" aria-labelledby="startprocesslabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="startprocesslabel">Start business process</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="iframe-container">
                        <iframe id="startprocessmodalframe" class="embed-responsive-item" src=""></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script id="processdefsinfo-template" type="text/x-handlebars-template">
        {{#each this}}
            <tr>
                <th scope="row"><small>{{ inc @index }}</small></th>
                <td><small>{{ process-id }}</small></td>
                <td><small>{{ package }}:{{ process-version }}:{{ process-name }}</small></td>
                <td><small>{{ container-id }}</small></td>
                <td><small>
                    <button type="button" id="pdef-view-{{ @index }}" class="btn btn-outline-primary btn-sm" data-pid="{{ process-id }}" data-cid="{{ container-id }}">View</button>&nbsp;
                    <button type="button" id="pdef-start-{{ @index }}" class="btn btn-outline-success btn-sm" data-pid="{{ process-id }}" data-cid="{{ container-id }}">Start</button>
                </small></td>
            </tr>
        {{/each}}
    </script>`;
}
