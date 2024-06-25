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
      window.addEventListener(
         "taskchange",
         this.handleTaskChange.bind(this),
         false,
      )
      window.addEventListener(
         "removetask",
         this.handleRemoveTask.bind(this),
         false,
      )
   }

   async connectedCallback() {
      try {
         this.loadCustomEvents()
         this.tasks = await getTasks()
         if (!this.tasks.length) {
            const DEMO_TASKS = await taskService.getDemoTasks(
               this.DEMO_TASKS_COUNT,
            )
            this.tasks = DEMO_TASKS
            await this.saveTasks()
         }
      } catch (err) {
         console.log(err)
      }
   }

   async handleTaskChange(event) {
      try {
         this.selectedTaskId = event.detail.task ? event.detail.task.Id : null
         this.isEditTask = this.selectedTaskId ? true : false
         if (!this.isEditTask) return
         if(event.detail.type === 'open-editor') return
         if(event.detail.type === 'checkbox') this.isEditTask = false
         const taskToEdit = { ...event.detail.task }
         await saveTask({ task: taskToEdit })
         this.tasks = this.tasks.map((task) =>
            task.Id === this.selectedTaskId ? taskToEdit : task,
         )
         this.isEditTask = false
      } catch (error) {
         console.error("Error in handleTaskChange:", error.message)
      }
   }

   async handleRemoveTask(event) {
      try {
         this.isLoaderOn = true
         await deleteTask({ taskId: event.detail.taskId })
         this.tasks = this.tasks.filter((task) => task.Name !== event.detail.taskId)
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
         const tasksToSave = this.tasks.map((task) => saveTask({ task }))
         await Promise.all(tasksToSave)
      } catch (error) {
         console.log(error.message)
      }
   }

   disconnectedCallback() {
      window.removeEventListener(
         "taskchange",
         this.handleTaskChange.bind(this),
         false,
      )
      window.removeEventListener(
        "removetask",
         this.handleRemoveTask.bind(this),
         false,
      )
   }
}

