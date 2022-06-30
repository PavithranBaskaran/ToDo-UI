import React, { useEffect, useState } from "react";

function Input() {
  var localUser = JSON.parse(localStorage.getItem("myList"));
  if (!localUser) {
    localStorage.setItem("myList", "[]");
  }

  const [currentTask, setcurrentTask] = useState([]);
  const [list, setList] = useState(localUser);
  let clear = () => {
    document.getElementById("id").value = "";
  };
  let addTask = () => {
    setList([
      ...list,
      { id: list.length + 1, name: currentTask, isDone: false, display: false },
    ]);
    clear();
  };

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(list));
    console.log("useEffect working");
  }, [list]);

  let markDone = (id) => {
    let itemIndex = list.findIndex((obj) => obj.id === id);

    if (list[itemIndex].isDone === true) {
      list[itemIndex].isDone = false;
      // list[itemIndex].display = false;
      setList([...list]);
    } else if (list[itemIndex].isDone === false) {
      list[itemIndex].isDone = true;
      // list[itemIndex].display = true;
      setList([...list]);
    }
  };

  let deleteList = (id) => {
    let itemIndex = list.findIndex((obj) => obj.id === id);
    list.splice(itemIndex, 1);
    setList([...list]);
  };

  let clearDone = () => {
    let doneItems = list.filter((item) => {
      return item.isDone === true;
    });
    doneItems.forEach((done) => {
      deleteList(done.id);
    });
  };

  let listDone = () => {
    
    list.map((item) => {
      if (item.isDone === true) {
        item.display = false;
      }
      else(item.display = true)
    });
    setList([...list]);
    let completed = list.filter((item)=>{
      return item.display === false
    })
    document.getElementById('para').innerText=`${completed.length} items completed`
  };

  let listAll = () => {
    list.map((item) => {
      item.display = false;
    });
    setList([...list]);
    document.getElementById('para').innerText=`${list.length} items left`
  };

  let listActive = () => {
    list.map((item)=>{
      if(item.isDone === true)
      {
        item.display = true
      }
      else
      {
        item.display = false
      }
      
    })
    setList([...list]);
    let disfalse = list.filter((item)=>{
      return item.display === false
    })
    document.getElementById('para').innerText=`${disfalse.length} items active`
  }
  return (
    <>
      <ul class="list-group mb-4 lg-12 md-6 sm-12 ">
        <div class="input-group mb-3 ">
          <input
            id="id"
            type="text"
            class="form-control "
            placeholder="Enter your activity"
            aria-describedby="button-addon2"
            onChange={(e) => setcurrentTask(e.target.value)}
            onClick={clear}
          />

          <button
            class="btn btn-primary sm-12"
            type="submit"
            value={"ADD"}
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
                className={`items list-group-item sm-12 ${
                  item.isDone ? "text-decoration-line-through text-muted" : ""
                } ${item.display ? "d-none" : ""}`}
              >
                <input
                  class="form-check-input me-1 sm-12 "
                  type="checkbox"
                  value=""
                  aria-label="..."
                  id="check"
                  checked={item.isDone}
                  onClick={() => markDone(item.id)}
                />
                {item.name}{" "}
                <p onClick={() => deleteList(item.id)} class="cross">
                  ❌
                </p>
              </li>
            );
          })}
          <li class="list-group-item tags sm-12">
            <div class="container">
              <div class="row">
                <div class="col">
                  <p id='para'>{`${list.length} items left`}</p></div>
                <div class="col">
                  <a href="#" onClick={() => listAll()}>
                    All
                  </a>{" "}
                  <a className="active" onClick={() => listActive()} href="#">
                    Active
                  </a>{" "}
                  <a href="#" onClick={() => listDone()}>
                    Completed
                  </a>
                </div>
                <div class="col">
                  <a href="#" onClick={() => clearDone()}>
                    Clear Completed
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Input;
