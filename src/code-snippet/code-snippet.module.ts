// modules
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IconModule } from "carbon-components-angular/icon";

import { I18nModule } from "carbon-components-angular/i18n";

// imports
import { CodeSnippet } from "./code-snippet.component";

@NgModule({
	declarations: [
		CodeSnippet
	],
	exports: [
		CodeSnippet
	],
	imports: [
		CommonModule,
		FormsModule,
		I18nModule,
		IconModule
	]
})
export class CodeSnippetModule { }
