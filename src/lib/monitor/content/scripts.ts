import { ExtensionContext } from "vscode";
import AppState from "../appState";

export function addScripts(
	context: ExtensionContext,
	appState: AppState,
	media: any
) {
	return `
    <script>
        $(document).ready(function() {
            // handlebars helpers
            Handlebars.registerHelper("inc", function(value, options) {
                return parseInt(value) + 1;
            });

            $(".appnavlink").click(function(e) {
                e.preventDefault();
                var aid = $(this).attr("href");
                $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
            });

            // first check if app is running
            checkAppIsRunning("${appState.url}rest/server", function(running) {
                if(running) {
                    $("#cannotconnectdiv").hide();
                } else {
                    $("#cannotconnectdiv").show();
                }
            });

            // get server info
            appRestGetCall("${appState.url}rest/server", function(data) {
                if(data) {
                    $('#serverInfo-serverid').text(data.responseJSON.result["kie-server-info"].id);
                    $('#serverInfo-servername').text(data.responseJSON.result["kie-server-info"].name);
                    $('#serverInfo-serverversion').text(data.responseJSON.result["kie-server-info"].version);

                    var capabilities = data.responseJSON.result["kie-server-info"].capabilities;
                    var capabilitiesdisp = "";
                    capabilities.map(capability => {
                        capabilitiesdisp += capability + " ";
                    });
                    $('#serverInfo-servercapabilities').text(capabilitiesdisp);
                    
                     $('#serverInfo-serverlocation').text(data.responseJSON.result["kie-server-info"].location);
                }
            });

            // get containers info
            appRestGetCall("${
				appState.url
			}rest/server/containers", function(data) {
                var containersdata = data.responseJSON.result["kie-containers"]["kie-container"];
            
                var containersTemplateSource = document.getElementById("containersinfo-template").innerHTML;
                var containersTemplate = Handlebars.compile(containersTemplateSource);

                //$('#containerInfo-dummy').text(containersTemplate(containersdata));    

                $('#containersinfotable tbody').html(containersTemplate(containersdata));
            });

        });    

        function checkAppIsRunning(url, callback){
            $.ajax({
                type: "HEAD",
                url: url,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type':'application/json',
                    'Authorization': 'Basic ' + btoa('${appState.username}:${
		appState.password
	}')
                },
                success: function() {
                    callback(true);
                },
                error: function() {
                    callback(false);
                }
            });
        }

        function appRestGetCall(url, callback){
            $.ajax({
                type: "GET",
                url: url,
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + btoa('${appState.username}:${
		appState.password
	}')
                },
                complete: function(data) {
                    callback(data);
                },
                error: function(error) {
                    callback(error);
                }
            });
        }
    </script>`;
}
