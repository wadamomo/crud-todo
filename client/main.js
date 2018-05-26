const addtodoform = document.querySelector('#addtodoform');
const addtodotext = document.querySelector('#addtodotext');
const todos = document.querySelector('#todos');

const eventController = {
    getTodos() {
        console.log('getting todos')
        fetch('/todo')
        .then(res => res.json())
        .then((foundTodos) => {
            todos.innerHTML = foundTodos.map(el => 
                `<li>
                    ${el.item}
                    <button class="delete" data-id=${el._id}>Delete</button>
                    <button class="edit" data-id=${el._id}>Edit</button>
                </li>`
            ).join('')
        })
    },
    addTodo(todo) {
        console.log('adding todo')
        fetch('/todo', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ todo })
        })
        .then(res => res.json())
        .then(this.getTodos())
        .catch(err => {throw err})
    },
    deleteTodo(e) {
        let item = e.target; 
        if (!item.matches('.delete')) return;
        fetch(`/todo/${e.target.dataset.id}`, {
            method: 'DELETE'
        })
        .then(this.getTodos())
        .catch(err => {throw err})
    }
}

addtodoform.addEventListener('submit', (e) => {
    e.preventDefault();
    eventController.addTodo(addtodotext.value)
    addtodoform.reset();
})

todos.addEventListener('click', (e) => {
    eventController.deleteTodo(e);
})

window.onload = eventController.getTodos;