import { LightningElement, api } from "lwc"

export default class TaskEdit extends LightningElement {
   @api task
   taskToEdit

   connectedCallback() {
      this.taskToEdit = { ...this.task }
   }

   handleInputChange(event) {
      event.preventDefault()
      const { value, name: field } = event.target
      this.taskToEdit = { ...this.taskToEdit, [field]: value }
   }

   handleSaveEdit(event) {
      event.preventDefault()
      const taskChangeEvent = new CustomEvent("taskchange", {
         detail: { task: this.taskToEdit },
         bubbles: true,
         composed: true,
      })
      this.dispatchEvent(taskChangeEvent)
   }

   handleCancelEdit(event) {
      event.preventDefault()
      this.taskToEdit = null
      const taskChangeEvent = new CustomEvent("taskchange", {
         detail: { task: null },
         bubbles: true,
         composed: true,
      })
      this.dispatchEvent(taskChangeEvent)
   }
}
