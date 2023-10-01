import React, { useState } from "react";
import "./styles.css";
import { Comment } from "./components/Comments";
import { useNode } from "./hooks/useNode";

const comments = {
  id: 1,
  items: []
};

const App = () => {
  const { insertNode, editNode } = useNode();
  const [commentsData, setCommentsData] = useState(comments);

  function onAddComment(commentId, input, cb) {
    const data = insertNode(commentsData, commentId, input);
    setCommentsData({
      ...commentsData,
      ...data
    });
    cb();
  }

  function onEditComment(commentId, input, cb) {
    const data = editNode(commentsData, commentId, input);
    setCommentsData({
      ...commentsData,
      ...data
    });
    cb();
  }

  return (
    <div className="App">
      <Comment
        comment={commentsData}
        data={{ dskfl: "sadsk" }}
        handleOnAddComment={onAddComment}
        handleEditComment={onEditComment}
      />
    </div>
  );
};

export default App;
