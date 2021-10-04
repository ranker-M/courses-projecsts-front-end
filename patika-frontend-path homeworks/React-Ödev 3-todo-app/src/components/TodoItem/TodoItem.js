import React from "react";
import "./TodoItem.css";

function Todo(props) {
  const { content } = props;
  console.log(content);
  return (
    <div className="container">
    {content}
      <button className="btn button">
        Sil
      </button>
    </div>
  );
}

export default Todo;
