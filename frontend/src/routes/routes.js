
import LogIn from "../components/LoginPopup.js";
import NotFound from "../components/NotFoundPage.js";
import Home from "../components/HomePage.js";
import ToDo from "../components/ToDoList.js";


export const routes=Object.freeze([
    {
        path:"/LogIn",
        component: LogIn,
        name:"LogIn",
    },
    {
        path:"*",
        component: NotFound,
        name:null,
    },
    {
        path:"/",
        component: Home,
        name:"Home",
    },
    {
        path:"/ToDoList",
        component: ToDo,
        name:"ToDo",
    },
]);

