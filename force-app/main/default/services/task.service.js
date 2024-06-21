export const taskService = {
    getTasks
}

function getTasks(amount){
    const tasks = []
    
    for(let i = 0; i < amount; i++){
        tasks.push(_getRandomTask())
    }

    return tasks
}

function _getRandomTask(){
    return {
        createdAt: Date.now(),
        importance: getRandomIntInclusive(1,3), 
        
    }
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); 
}
