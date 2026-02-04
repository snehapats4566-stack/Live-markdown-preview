const input = document.getElementById("markdownInput");
const preview = document.getElementById("preview");

input.addEventListener("input", function () {
    let lines = input.value.split("\n");
    let result = "";

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.startsWith("###")) {
            line = "<h3>" + line.replace("###", "").trim() + "</h3>";
        }
        else if (line.startsWith("##")) {
            line = "<h2>" + line.replace("##", "").trim() + "</h2>";
        }
        else if (line.startsWith("#")) {
            line = "<h1>" + line.replace("#", "").trim() + "</h1>";
        }
        else {
            line = "<p>" + line + "</p>";
        }
        // BOLD FEATURE
        while (line.includes("**")) {
            let start = line.indexOf("**");
            let end = line.indexOf("**", start + 2);

            if (end === -1) break;

            let boldText = line.substring(start + 2, end);
            line =
                line.substring(0, start) +
                "<b>" + boldText + "</b>" +
                line.substring(end + 2);
        }
        // ITALIC FEATURE
        while (line.includes("*")) {
            let start = line.indexOf("*");
            let end = line.indexOf("*", start + 1);

            if (end === -1) break;

            let italicText = line.substring(start + 1, end);
            line =
                line.substring(0, start) +
                "<i>" + italicText + "</i>" +
                line.substring(end + 1);
        }
        // LINK 
        while (line.includes("[") && line.includes("](")) {
            let startText = line.indexOf("[");
            let endText = line.indexOf("]", startText);

            let startLink = line.indexOf("(", endText);
            let endLink = line.indexOf(")", startLink);

            if (endText === -1 || startLink === -1 || endLink === -1) break;

            let linkText = line.substring(startText + 1, endText);
            let url = line.substring(startLink + 1, endLink);

            let htmlLink = '<a href="' + url + '" target="_blank">' + linkText + '</a>';

            line =
                line.substring(0, startText) +
                htmlLink +
                line.substring(endLink + 1);
        }

        result += line;
    }

    preview.innerHTML = result;
});
