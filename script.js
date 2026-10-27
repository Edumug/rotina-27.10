import {database} from "./firebase.js";

import{
    ref,
    get,
    push,
    remove
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-database.js";

const tarefa = document.getElementById("tarefa");
const add = document.getElementById("enviar");
const lista = document.getElementById("lista");


function addtarefa(){
    const tarefat = tarefa.value;
    push(ref(database, "tarefas"), {
        texto: tarefat
    }).then(function(){
        tarefa.value = "";
        tarefac();
    });

}

function tarefac(){
    get(ref(database, "tarefas")).then(function(snapshot){
        lista.innerHTML = "";
        snapshot.forEach(function(item){
            const tarefat = item.val().texto;
            const id = item.key;

            const li = document.createElement("li");
            lista.appendChild(li);
            li.innerHTML = `<span>${tarefat}</span>
            <button class = "delete">X</button>`;

            li.querySelector(".delete").addEventListener("click", function(){
                remove(ref(database, "tarefas/" + id));
                li.remove();
            })
        });
    });
}

add.addEventListener("click", function(){
    addtarefa();
});
tarefac();