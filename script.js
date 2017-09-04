window.onload = function(){
  fetch("/tasks").then(function(res){
    res.json().then(function(data){
      console.log(data);
      data.forEach(function(task){
        let taskhtml = document.createElement("li");
        let deletebutton = document.createElement('button');
        let updatebutton = document.createElement('button');
        deletebutton.innerHTML = "delete this task";
        updatebutton.innerHTML = "update this task";

        deletebutton.addEventListener('click',function(){
          deletetask(task._id);
        });

        updatebutton.addEventListener('click',function(){
          updatetask(task._id,task.description);
        })

        taskhtml.innerText = task.description;
        document.getElementById('task-area').append(taskhtml);
        document.getElementById('task-area').append(deletebutton);
        document.getElementById('task-area').append(updatebutton);

      })
    });
  })
}
function deletetask(objectid){
  console.log(objectid);
  fetch('/tasks/delete/'+objectid,{method: 'DELETE'});
}

function updatetask(objectid,description){
  console.log(objectid + "\n" + description);
  let input = document.createElement('input');
  input.placeholder = description;
  input.id = "updateinput";
  let submitupdate = document.createElement('button');
  submitupdate.innerText = "submit changes";
  submitupdate.addEventListener('click',function(){
      fetch('/tasks/update/'+ objectid,{ method: 'PUT',body: JSON.stringify({
        description: document.getElementById('updateinput').value,
      }),headers: {
                "Content-Type": "application/json"
              }});
  })
  document.getElementById('update-area').append(input);
  document.getElementById('update-area').append(submitupdate);
}


