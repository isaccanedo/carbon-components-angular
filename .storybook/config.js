import "./polyfills.js";

import { configure, addDecorator } from "@storybook/angular";
import { withOptions } from "@storybook/addon-options";
import { setConfig } from "@storybook/addons";
import { CarbonG100 } from "./theme";

addDecorator(
	withOptions({
		theme: CarbonG100
	})
);

// load global styles
require("!style-loader!css-loader!postcss-loader!sass-loader!./preview.scss");

require("../src/index.stories");
// automatically import all files ending in *.stories.ts
const req = require.context("../src", true, /.stories.ts$/);

function loadStories() {
	req.keys()
	.sort((path1, path2) => path1.split("/").slice(-1)[0] > path2.split("/").slice(-1)[0] ? 1 : -1)
	.forEach(filename => {
		if (!filename.includes("index")) {
			req(filename);
		}
	});
}

configure(loadStories, module);
