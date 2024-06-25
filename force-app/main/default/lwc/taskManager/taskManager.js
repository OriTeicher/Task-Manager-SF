import { LightningElement, track } from "lwc"
import { taskService } from "./services/task.service.js"
import saveTask from "@salesforce/apex/TaskController.saveTask"
import getTasks from "@salesforce/apex/TaskController.getTasks"
import deleteTask from "@salesforce/apex/TaskController.deleteTask"

export default class TaskManager extends LightningElement {
  @track tasks = []
  DEMO_TASKS_COUNT = 10
  isLoaderOn = false
  isEditTask = false
  selectedTaskId
  

  loadCustomEvents() {
    window.addEventListener("edittask", this.handleEditTask.bind(this), false)
    window.addEventListener("taskchange", this.handleTaskChange.bind(this), false)
  }

  async connectedCallback() {
    try {
      this.loadCustomEvents()
      this.tasks = await getTasks()
      if (!this.tasks.length) {
        const DEMO_TASKS = await taskService.getDemoTasks(this.DEMO_TASKS_COUNT)
        this.tasks = DEMO_TASKS
        await this.saveTasks()
      }
    } catch (err) {
      console.log(err)
    }
  }

  async handleEditTask(event) {
    console.log('handling edit')
    this.isEditTask = true
    this.selectedTaskId = event.detail.task.Id
  }

  async handleTaskChange(event) {
    try {
      const taskId = event.detail.task.Name
      console.log("taskId", taskId)
      const updatedTask = { ...event.detail.task }
      await saveTask({ task: updatedTask })
      this.tasks = this.tasks.map((task) => {
        if (task.Name === taskId) {
          return updatedTask
        }
        return task
      })
    } catch (error) {
      console.error("Error in handleTaskChange:", error.message)
    }
  }

  async handleRemoveTask(event) {
    const taskId = event.detail.taskId
    try {
      this.isLoaderOn = true
      await deleteTask({ taskId })
      this.tasks = this.tasks.filter((task) => task.Name !== taskId)
      await this.saveTasks()
      this.tasks = await getTasks()
    } catch (error) {
      console.log(error.message)
    } finally {
      this.isLoaderOn = false
    }
  }

  async saveTasks() {
    try {
      const savePromises = this.tasks.map((task) => saveTask({ task }))
      await Promise.all(savePromises)
    } catch (error) {
      console.log(error.message)
    }
  }

  disconnectedCallback() {
    window.addEventListener("edittask", this.handleTaskEdit.bind(this), false)
    window.addEventListener("taskchange", this.handleTaskEdit.bind(this), false)
  }
}

