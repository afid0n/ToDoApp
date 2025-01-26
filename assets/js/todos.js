class TodoItem{
    id;
    title;
    isDone;
    createdAt;
    constructor(title,isDone=false){
        this.id=new Date.getTime()
        this.title=title;
        this.isDone=isDone;
        this.createdAt=new Date()
    }

    toggleDone(){
        this.isDone =!this.isDone;
    }
    updateTitle(newTitle){
        this.title = newTitle
    }
    }
    class TodoList{
        todos;
        constructor(){
            this.todos=[];
        }
        addTodo(todo){
        }
        deleteTodo(id){
        }
        searchTodos(query){
        }
        filterTodos(filterOption){
        }
        sortTodos(option){
        }

    }


