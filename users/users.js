let users = [];
module.exports = {
    add: (id,name,room)=>{
        users.push({id,name,room});
    },

    getUser: (id) =>{
        return users.find((user)=>user.id === id);
    },

    getAllUsersOfRoom: (room) =>{
        return users.filter((user)=>{
            return user.room === room;
        })
    },

    RemoveUser: (id)=>{
        const user = users.find((user)=>user.id === id);
        const index = users.indexOf(user);
        users.splice(index,1);
    }
}