import { LightningElement, api, track } from "lwc"

export default class TaskPreview extends LightningElement {
   @api task
   @api isedit
   @track descClass
   @api loader
   @api selectedtaskid
   loaderMsg

   connectedCallback() {
      this.descClass = this.task.isDone__c ? "done" : "active"
   }
   get getTaskEditStatus() {
      return this.isedit && this.task.Id === this.selectedtaskid
   }
   onRemoveTask() {
      this.loaderMsg = "Removing task..."
      const taskChangeEvent = new CustomEvent("removetask", {
         detail: { taskId: this.task.Name },
         bubbles: true,
         composed: true,
      })
      this.dispatchEvent(taskChangeEvent)
   }

   handleCheckboxChange(event) {
      const updatedTask = { ...this.task }
      updatedTask.isDone__c = event.target.checked
      this.loaderMsg = "Saving Task..."
      this.task = updatedTask
      this.descClass = this.task.isDone__c ? "done" : "active"
      const taskChangeEvent = new CustomEvent("taskchange", {
         detail: { task: updatedTask },
         bubbles: true,
         composed: true,
      })
      this.dispatchEvent(taskChangeEvent)
   }

   handleEditTask() {
      const updatedTask = { ...this.task }
      this.loaderMsg = "Saving Task..."
      const taskChangeEvent = new CustomEvent("taskchange", {
         detail: { task: updatedTask },
         bubbles: true,
         composed: true,
      })
      this.dispatchEvent(taskChangeEvent)
   }
}
