import React, { useEffect, useState } from "react";

function Input() {
  var localUser = JSON.parse(localStorage.getItem("myList"));
  if(!localUser){
    localStorage.setItem("myList", '[]')
  }
 
  const [currentTask, setcurrentTask] = useState([]);
  const [list, setList] = useState(localUser);
  let addTask = () => {
    setList([
      ...list,
      { id: list.length + 1, name: currentTask, isDone: false },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
    console.log('useEffect working')
  }, [list]);
  
  let clear = () => {
    document.getElementById("id").value = "";
  };
  let markDone = (id) => {
    let itemIndex = list.findIndex((obj) => obj.id === id);

    if (list[itemIndex].isDone === true) {
      list[itemIndex].isDone = false;
      setList([...list]);
    } else if (list[itemIndex].isDone === false) {
      list[itemIndex].isDone = true;
      setList([...list]);
    }
  };

  let deleteList = (id) => {
    let itemIndex = list.findIndex((obj) => obj.id === id);
    list.splice(itemIndex, 1);
    setList([...list]);
  };

  return (
    <>
      <ul class="list-group mb-4">
        <div class="input-group mb-3">
          <input
            id="id"
            type="text"
            class="form-control"
            placeholder="Enter your activity"
            aria-describedby="button-addon2"
            onChange={(e) => setcurrentTask(e.target.value)}
            onClick={clear}
          />

          <button
            class="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={addTask}
          >
            ADD
          </button>
        </div>
      </ul>
      <div className="container overflow-auto">
        <ul class="list-group ">
          {list.map((item) => {
            return (
              <li
                className={`items list-group-item ${
                  item.isDone ? "text-decoration-line-through text-muted" : ""
                }`}
              >
                <input
                  class="form-check-input me-1"
                  type="checkbox"
                  value=""
                  aria-label="..."
                  onClick={() => markDone(item.id)}
                />
                {item.name}{" "}
                <p onClick={() => deleteList(item.id)} class="cross">
                  ❌
                </p>
              </li>
            );
          })}
          <li class="list-group-item tags">
            <div class="container">
              <div class="row">
                <div class="col">{`${list.length} items left`}</div>
                {/* <div class="col"><a href="#">All</a> <a className="active"  href="#">Active</a> <a href="#">Completed</a></div>
                <div class="col"><a href="#">Clear Completed</a></div> */}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Input;
