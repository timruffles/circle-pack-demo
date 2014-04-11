main();

// main kicks off the viz, requesting data and visualising it
function main() {
  getRedditStoryComments("http://www.reddit.com/r/funny/comments/22r299/alcoholism_level_engineer.json",function(data) {
    clearLoading();
    vis(data);
  });
}

function getRedditStoryComments(url,cb) {
  // should request json data from url, format it, and call cb with the data
}

function formatStoryComments(data) {
  // clean up data into this tree format:
  // {
  //    body: '',
  //    replies: [
  //      {
  //        body: '',
  //        replies: [ 
  //          /* recurse as far as necessary */
  //        ]
  //      }
  //    ]
  // }
}

function error(err) {
  console.error(err);
}

function clearLoading() {
  // clear a loading indicator
}

function vis(dataRoot) {
  // take a look at:
  // - http://bl.ocks.org/mbostock/4063530
  // - https://github.com/mbostock/d3/wiki/Pack-Layout
}

function detail(story) {
  // present interesting detail information on a hovered story
}
