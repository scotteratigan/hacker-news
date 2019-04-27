import React, { useState, useEffect } from "react";
import RenderTextToHTML from "./RenderTextToHTML";

// explore HTML sanitization: https://developers.google.com/caja/

export default function Comment(props) {
  const { children } = props.data;
  const { setIsSpinning } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpand() {
    if (!isExpanded) {
      setIsSpinning(true);
    }
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    setIsSpinning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children.map(comment => {
        const { author, text, id } = comment;
        return (
          comment.author && (
            <div
              key={id}
              style={{
                border: "1px dotted tan",
                marginLeft: 5,
                paddingLeft: 5,
                paddingBottom: 10
              }}
            >
              <RenderTextToHTML text={text} />
              by {author}
              {comment.children.length > 0 ? (
                <button style={{ marginLeft: 5 }} onClick={handleExpand}>
                  {isExpanded ? "-" : "+"}
                </button>
              ) : null}
              {isExpanded ? (
                <Comment data={comment} setIsSpinning={setIsSpinning} />
              ) : null}
            </div>
          )
        );
      })}
    </>
  );
}
