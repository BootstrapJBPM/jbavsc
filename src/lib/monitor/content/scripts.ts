import { ExtensionContext } from "vscode";
import AppState from "../appState";

export function addScripts(
	context: ExtensionContext,
	appState: AppState,
	media: any
) {
	return `
    <script>
        $(document).ready(function(){
            $(".appnavlink").click(function(e) {
                e.preventDefault();
                var aid = $(this).attr("href");
                $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
            });

            // show cant connect div if app not started
            checkUrlExists("${appState.url}rest/server", function(exists) {
                if(exists) {
                    $("#cannotconnectdiv").hide();
                } else {
                    $("#cannotconnectdiv").show();
                }
            });

        });

        function checkUrlExists(url, callback){
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
                    ${console.log("Able to check default url")}
                    callback(true);
                },
                error: function() {
                    ${console.log("Not able to check default url")}
                    callback(false);
                }
            });
        }
    </script>`;
}
