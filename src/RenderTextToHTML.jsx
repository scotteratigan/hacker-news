import React from "react";

export default function CommentText(props) {
  const htmlToRender = { __html: props.text };
  return <div dangerouslySetInnerHTML={htmlToRender} style={props.style} />;
}
