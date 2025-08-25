import path from "node:path";
import * as sass from "sass";
import { DateTime } from "luxon";

export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("site/favicon.ico");

    eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",

		// opt-out of Eleventy Layouts
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Don’t compile file names that start with an underscore
			if(parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
    });

    eleventyConfig.addTemplateFormats("scss");

		eleventyConfig.addFilter("postDate", (dateObj) => {
			return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
		});
		
		eleventyConfig.addFilter("dateTime", (dateObj) => {
			return DateTime.fromJSDate(dateObj).toISODate();
		});
		    
    return {
        dir: {
            input: "site",
            output: "dist",
            includes: "_includes",
            layouts: "_includes/layouts"
        }
    };
};