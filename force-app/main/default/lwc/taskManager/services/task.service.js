const DELAY = 1000

export const taskService = {
  getDemoTasks,
}

async function getDemoTasks(amount) {
  const tasks = []
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let i = 0; i < amount; i++) {
        tasks.push(_getRandomTask())
      }
      if (!tasks.length) reject(new Error("No tasks were found"))
      resolve(tasks)
    }, DELAY)
  })
}

function _getRandomTask() {
  return {
    createdAt__c: _formatDate(new Date()),
    Importance__c: _getRandomImportance(),
    isDone__c: _getRandomIntInclusive(0, 1) ? true : false,
    Description__c: `Finish fixing bug #${_getRandomIntInclusive(1, 100000)}`,
  }
}

function _getRandomImportance() {
  const importance = _getRandomIntInclusive(1, 3)
  if (importance === 1) return "low"
  else if (importance === 2) return "medium"
  else return "high"
}

function _getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function _formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  return `${day}/${month} ${hours}:${minutes}`
}
