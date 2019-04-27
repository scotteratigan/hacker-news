import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./Comment.jsx";

export default function ArticleComments(props) {
  const { objectID, setIsSpinning } = props;
  const [commentData, setCommentData] = useState([]);
  const [loadError, setLoadError] = useState(null);

  const loadComments = async () => {
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/items/${objectID}`
      );
      setCommentData(response.data);
      setIsSpinning(false);
    } catch (err) {
      console.error(err);
      setIsSpinning(false);
      setLoadError(err);
    }
  };

  useEffect(() => {
    setIsSpinning(true);
    loadComments();
    // axios
    //   .get(`https://hn.algolia.com/api/v1/items/${objectID}`)
    //   .then(response => {
    //     setCommentData(response.data);
    //     setIsSpinning(false);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectID]);
  return (
    <>
      {commentData &&
        commentData.children &&
        commentData.children.map(comment => {
          return (
            <Comment
              key={comment.id}
              data={commentData}
              setIsSpinning={setIsSpinning}
            />
          );
        })}
      {loadError && <p>Error loading comments: {loadError.message}</p>}
    </>
  );
}
