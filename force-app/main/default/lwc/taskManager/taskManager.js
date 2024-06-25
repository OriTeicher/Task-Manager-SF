import { LightningElement, track } from "lwc"
import { taskService } from "./services/task.service.js"
import saveTask from "@salesforce/apex/TaskController.saveTask"
import getTasks from "@salesforce/apex/TaskController.getTasks"
import deleteTask from "@salesforce/apex/TaskController.deleteTask"
export default class TaskManager extends LightningElement {
  @track tasks = []
  DEMO_TASKS_COUNT = 10
  isLoaderOn = false

  async connectedCallback() {
    window.addEventListener("taskchange", this.handleTaskChange, false)
    try {
      this.tasks = await getTasks()
      console.log("this.tasksFRONT", this.tasks)
      if (!this.tasks.length || !this.tasks) {
        const DEMO_TASKS = await taskService.getDemoTasks(this.DEMO_TASKS_COUNT)
        this.tasks = DEMO_TASKS
        this.saveTasks()
      }
    } catch (err) {
      console.log(err)
    }
  }

  async handleTaskChange(event) {
    try {
      console.log("this.tasks", JSON.stringify(this.tasks))
      const taskId = event.detail.task.Id
      console.log("taskId", taskId)
      const updatedTask = { ...event.detail.task }
      await saveTask({ task: updatedTask })
    } catch (error) {
      console.error("Error in handleTaskChange:", error.message)
    }
  }

  async handleRemoveTask(event) {
    const taskId = event.detail.taskId
    try {
      this.isLoaderOn = true
      await deleteTask({ taskId })
      this.tasks = this.tasks.filter((task) => task.Id !== taskId)
      await this.saveTasks()
      await getTasks()
    } catch (error) {
      console.log(error.message)
    } finally {
      this.isLoaderOn = false
    }
  }

  async saveTasks() {
    try {
      const savePromises = this.tasks.map((task) => {
        return saveTask({ task })
      })
      await Promise.all(savePromises)
    } catch (error) {
      console.log(error.message)
    }
  }

  disconnectedCallback() {
    window.removeEventListener("taskchange", this.handleTaskChange, false)
  }
}
