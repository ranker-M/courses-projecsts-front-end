import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

function TodoList(props) {
  function toggler(e){
    // let target=e.target.tagName=="BUTTON"?e.target.parentNode:e.target;
    // console.log(target);
    // target.classList.toggle("checked");
  }
  return (
    <div>
      <ul>
        {props.todos.map((todo) => {
          return (
            // Taska tıklandıgında yazının cizilmesi icin onClick eklendi
            <li className="list-group-item" onClick={toggler}>
              <TodoItem {...todo} key={todo.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
