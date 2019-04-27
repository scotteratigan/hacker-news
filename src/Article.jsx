import React, { useState } from "react";
import ArticleComments from "./ArticleComments";
import RenderTextToHTML from "./RenderTextToHTML";
import "./Article.css";
import moment from "moment";

export default function Article(props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    title,
    url,
    author,
    points,
    created_at,
    num_comments,
    objectID,
    story_text
  } = props.data;

  const timeOfArticlePost = moment.utc(
    created_at,
    "YYYY-MM-DD[T]HH:mm:ss:[000]Z"
  );
  // const hnTimeBugOffset = moment.duration(4, "hours");
  // const temp = moment(timeOfArticlePost)
  //   .subtract(hnTimeBugOffset)
  // there seems to be a bug with time reporting for some stories, dunno why

  const ageOfArticle = timeOfArticlePost
    .utc()
    .local()
    .fromNow(); // 2017-11-07T16:24:04.000Z

  return (
    <div className="article">
      <h4 style={{ margin: 0 }}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h4>
      {story_text && (
        <RenderTextToHTML text={story_text} style={{ fontSize: "0.7rem" }} />
      )}
      <h5 style={{ margin: 0 }}>
        Submitted by {author} {ageOfArticle}, {points} points
        <br />
        Comments: {num_comments}
        {num_comments > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ marginLeft: 10 }}
          >
            {isExpanded ? "-" : "+"}
          </button>
        )}
        {isExpanded ? (
          <ArticleComments
            objectID={objectID}
            setIsSpinning={props.setIsSpinning}
          />
        ) : null}
      </h5>
    </div>
  );
}
