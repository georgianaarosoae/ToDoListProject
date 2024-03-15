import ToDo from "../Entities/ToDo.js"


async function createUser(task){
    return await ToDo.create(task)
   
}
async function getUserById(id){
    return await ToDo.findByPk(id)
}
async function getUsers(){
    return await ToDo.findAndCountAll()
}

async function deleteUserById(id){
    let elementToDelete=await ToDo.findByPk(id);

    if(!elementToDelete){
        console.log("This element does not exist so it can not be deleted!")
        return
    }
    return await elementToDelete.destroy();
}

export{
    createUser, deleteUserById, getUsers,getUserById
}