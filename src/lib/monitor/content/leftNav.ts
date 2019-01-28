import { ExtensionContext } from "vscode";
import AppState from "../appState";

export function getLeftNav(
	context: ExtensionContext,
	appState: AppState,
	media: any
): string {
	return `<nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                  <span>
                    &nbsp;&nbsp;<i class="fa fa-info-circle"></i>&nbsp;
                    <a href="#serverinfodiv" class="appnavlink"><strong>App Server Info</strong></a>
                  </span>
              </li>
              <li class="nav-item">
                  <span>
                    &nbsp;&nbsp;<i class="fa fa-file"></i>&nbsp;
                    <a href="#processdefsdiv" class="appnavlink"><strong>Process Defs</strong></a>
                  </span>
              </li>
              <li class="nav-item">
                  <span>
                    &nbsp;&nbsp;<i class="fa fa-cog"></i></i>&nbsp;
                    <a href="#processinstancesdiv" class="appnavlink"><strong>Process Instances</strong></a>
                  </span>
              </li>
            </ul>
          </div>
        </nav>`;
}
