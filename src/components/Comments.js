import { useEffect, useRef, useState } from "react";
import "../styles.css";
import { Action } from "./Action";

export const Comment = (props) => {
  const { comment, handleOnAddComment, handleEditComment } = props;
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const spanRef = useRef();

  const [expand, setExpand] = useState("");
  const [editMode, setEditMode] = useState("");

  useEffect(() => {
    if (editMode) {
      spanRef.current.focus();
    }
  }, [editMode]);
  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (editMode) {
      props.handleEditComment(comment.id, spanRef?.current?.innerText, () => {
        setEditMode((p) => !p);
      });
    } else {
      props.handleOnAddComment(comment.id, input, () => {
        setShowInput(false);
        setInput("");
      });
    }
  };

  return (
    <div>
      <div
        className={comment?.id === 1 ? "inputContainer" : "commentContainer"}
      >
        {comment?.id === 1 ? (
          <>
            <input
              value={input}
              className="inputContainer__input first_input"
              // autoFocus
              placeholder="Type..."
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Action
              handleClick={onAddComment}
              type="COMMENT"
              className="reply comment"
            />
          </>
        ) : (
          <>
            <span
              ref={spanRef}
              suppressContentEditableWarning
              contentEditable={editMode}
              style={{
                wordWrap: "break-word"
              }}
            >
              {comment.name}
            </span>

            {editMode ? (
              <div style={{ display: "flex" }}>
                <Action
                  type="SAVE"
                  className="reply"
                  handleClick={onAddComment}
                />

                <Action
                  type="CANCEL"
                  className="reply"
                  handleClick={() => {
                    if (spanRef.current)
                      spanRef.current.innerText = comment.name;
                    setEditMode((p) => !p);
                  }}
                />
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <Action
                  type="REPLY"
                  className="reply"
                  handleClick={handleNewComment}
                />
                <Action
                  type="EDIT"
                  className="reply"
                  handleClick={() => setEditMode(true)}
                />
                <Action
                  type="DELETE"
                  className="reply"
                  handleClick={() => {}}
                />
              </div>
            )}

            <div
              style={{
                display: "flex"
              }}
            >
              {showInput && (
                <div
                  style={{
                    display: "flex"
                  }}
                >
                  <input
                    value={input}
                    className="inputContainer__input first_input"
                    // autoFocus
                    placeholder="Type..."
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                  />

                  <Action
                    type="SAVE"
                    className="reply"
                    handleClick={onAddComment}
                  />

                  <Action
                    type="CANCEL"
                    className="reply"
                    handleClick={() => {
                      setShowInput((p) => !p);
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <div
        style={{
          paddingLeft: "25px"
        }}
      >
        {comment?.items?.length > 0 &&
          comment.items.map((commentItem) => {
            return (
              <Comment
                key={commentItem.id}
                comment={commentItem}
                handleEditComment={handleEditComment}
                handleOnAddComment={handleOnAddComment}
              />
            );
          })}
      </div>
    </div>
  );
};
