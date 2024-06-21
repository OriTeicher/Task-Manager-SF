const DELAY = 1000

export const taskService = {
    getTasks
}

async function getTasks(amount){
    const tasks = []
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            for(let i = 0; i < amount; i++){
                tasks.push(_getRandomTask())
            }
            if(!tasks.length) reject(new Error("No tasks were found"))
            resolve(tasks)
        }, DELAY)
    })
}

function _getRandomTask(){
    return {
        _id: 'T-' + _getRandomIntInclusive(1,10^6),
        createdAt:  _formatDate(new Date()),
        importance: _getRandomIntInclusive(1,3), 
        isDone: _getRandomIntInclusive(0,1) ? true : false, 
        description: `Finish fixing bug #${_getRandomIntInclusive(1,10)}`
    }
}

function _getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}



function _formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
}