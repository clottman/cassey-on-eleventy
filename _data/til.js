var axios = require("axios");
var toJSON = require("xml2js").parseString;

var url = "https://cassey-til.glitch.me/feed/feed.xml";

module.exports = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then(response => {
                // turn the feed XML into JSON
                toJSON(response.data, function (err, result) {
                    // create a path for each item based on Medium's guid URL
                    result.feed.entry.forEach(element => {
                        var url = element.id[0].split("/");
                        // -2 because last element was a slash, so the last element of the split will be ""
                        element.url = `/til/${url[url.length - 2]}`;
                        element.content = element.content[0]["_"];
                        const tags = element.tags[0].value.filter(tag => {
                            return tag !== 'post' && tag !== 'posts';
                        });
                        element.data = {
                            date: element.updated[0],
                            title: element.title,
                            tags: tags,
                        };
                    });
                    resolve({ url: url, posts: result.feed.entry });
                });
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};
