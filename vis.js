main();

function main() {
  getRedditStoryComments("http://www.reddit.com/r/funny/comments/22r299/alcoholism_level_engineer.json",vis);
}

function getRedditStoryComments(url,cb) {
  d3.json(url,function(err,data) {
    if(err) return error(err);
    clearLoading();
    cb(formatStoryComments(data)); 
  });
}

function formatStoryComments(data) {
  var story = data[0].data.children[0].data;
  var comments = data[1];
  var baseUrl = "http://www.reddit.com" + story.permalink;

  story.replies = comments.data.children.filter(removeMore).map(formatComment);

  return story;

  function formatComment(comment) {
    var data = comment.data;
    if(data.replies) {
      data.replies = data.replies.data.children.filter(removeMore).map(formatComment);
    } else {
      data.replies = [];
    }
    data.permalink = baseUrl + "/" + data.id;
    return data;
  }

  function removeMore(comment) {
    return comment.kind != "more";
  }
}

function error(err) {
  console.error(err);
}

function clearLoading() {
  d3.select("#loading").remove();
}

function vis(dataRoot) {
  var diameter = 800;
  var PADDING = 4;

  var pack = d3.layout.pack()
      .size([diameter - PADDING, diameter - PADDING])
      .children(function(d) {
        return d.replies;
      })
      .value(function(d) {
        return d.body.length;
      });

  var svg = d3.select("#viz")
            .append("g")
              .attr("transform", "translate(2,2)");

  var node = svg
       .datum(dataRoot)
       .selectAll(".node")
       .data(pack.nodes);

  node
      .enter()
      .append("g")
      .attr("class", function(d) {
        return d.children ? "node" : "leaf node";
      })
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

  node.append("title")
      .text(function(d) {
        return d.body
      });

  node.append("circle")
      .on("click",function(d) {
        window.location =  d.permalink;
      })
      .on("mouseover",function(d) {
        detail(d);
      })
      .attr("r", function(d) {
        return d.r;
      });
}

function detail(story) {
  var el = d3.select("#detail")
  el.select(".comment").text(story.body);
  el.select(".replies").text(story.replies.length);
  el.select(".thread-size").text(sumReplies(story));

  function sumReplies(story) {
    return story.replies.reduce(function(sum,story) {
      return sum + sumReplies(story);
    },story.replies.length);
  }
}
