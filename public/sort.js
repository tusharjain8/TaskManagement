async function getSortedTodos() {

    const sort = document.getElementById('sortby').value
    const resp = await fetch('/todos/' + sort, { method: 'GET' })
    const todos = await resp.json()
    var ul = document.getElementById('tasklist')
    ul.innerHTML = ''
    for (const element in todos) {
        var li = document.createElement("li");
        li.setAttribute('id', todos[element].title);
        li.appendChild(document.createTextNode(todos[element].title));
        ul.appendChild(li);
    }


}