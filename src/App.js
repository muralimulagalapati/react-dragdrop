import "./styles.css";
import { useState } from "react";

export default function App() {
  const defaultState = [
    { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
    { name: "React", category: "wip", bgcolor: "pink" },
    { name: "Vue", category: "complete", bgcolor: "skyblue" }
  ];
  const [dragStates, setDragStates] = useState(defaultState);
  let tasks = {
    wip: [],
    complete: []
  };
  const handlerDragStart = (e, task) => {
    e.dataTransfer.setData("id", task);
  };
  dragStates.forEach((t) => {
    tasks[t.category].push(
      <div
        draggable
        onDragStart={(e) => handlerDragStart(e, t.name)}
        className="draggable"
        key={t.name}
        style={{ backgroundColor: t.bgcolor }}
      >
        {t.name}
      </div>
    );
  });
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, newCat) => {
    let taskName = e.dataTransfer.getData("id");
    let tasks = dragStates.map((t) => {
      if (t.name === taskName) {
        t.category = newCat;
      }
      return t;
    });
    setDragStates(tasks);
  };
  return (
    <div className="container-drag">
      <h2 className="header">Drag and Drop demo</h2>
      <div
        className="wip"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "wip")}
      >
        <span className="task-header">WIP</span>
        {tasks.wip}
      </div>
      <div
        className="droppable"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "complete")}
      >
        <span className="task-header">Completed</span>
        {tasks.complete}
      </div>
    </div>
  );
}
