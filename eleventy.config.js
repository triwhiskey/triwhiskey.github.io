import eleventySass from "eleventy-sass";

export default function(eleventyConfig) {
    eleventyConfig.addPlugin(eleventySass);
    eleventyConfig.addPassthroughCopy("site/favicon.ico");
    
    return {
        dir: {
            input: "site",
            output: "dist",
            includes: "_includes",
            layouts: "_includes/layouts"
        }
    };
};