import { ExtensionContext } from "vscode";
import AppState from "../appState";

export function addScripts(
	context: ExtensionContext,
	appState: AppState,
	media: any
) {
	return `
    <script src="${media.extjs}"></script>
    <script>
        var restUsername = "${appState.username}";
        var restPassword = "${appState.password}";
        var restUrl = "${appState.url}";
        var vscode = acquireVsCodeApi();

        $(document).ready(function() {
            // handlebars helpers
            Handlebars.registerHelper("inc", function(value, options) {
                return parseInt(value) + 1;
            });

            // nav links click
            $(".appnavlink").click(function(e) {
                e.preventDefault();
                var aid = $(this).attr("href");
                $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
            });

            // refresh info when modals are hidden
            $("#startprocessmodal").on("hide.bs.modal", function () {
                getMonitoringData();
            });

            $("#workontaskmodal").on("hide.bs.modal", function () {
                getMonitoringData();
            });

            // make variables table editable
            var editor = new SimpleTableCellEditor("processinstvarsinfotable");
            editor.SetEditableClass("editPVar");

            $('#processinstvarsinfotable').on("cell:edited", function (event) {
                updateProcessVarValue(event.element.dataset.vname, event.element.dataset.pid, event.element.dataset.cid, event.newValue);
            });

            // first check if app is running
            checkAppIsRunning("${appState.url}rest/server", function(running) {
                if(running) {
                    $("#cannotconnectdiv").hide();
                    getMonitoringData();
                } else {
                    $("#cannotconnectdiv").show();
                }
            });
        });
    </script>`;
}
