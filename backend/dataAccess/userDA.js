import User from "../Entities/User.js"


async function createUser(user){
    return await User.create(user)
  
}
async function getUserById(id){
    return await User.findByPk(id)
}
async function getUsers(){
    return await User.findAndCountAll()
}

async function deleteUserById(id){
    let elementToDelete=await User.findByPk(id);

    if(!elementToDelete){
        console.log("This element does not exist so it can not be deleted!")
        return
    }
    return await elementToDelete.destroy();
}

export{
    createUser, deleteUserById, getUsers,getUserById
}