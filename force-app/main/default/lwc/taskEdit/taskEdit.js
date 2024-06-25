import { LightningElement, api } from "lwc"

export default class TaskEdit extends LightningElement {
  @api task
  taskToEdit

  connectedCallback() {
    console.log("hello from task edit, the selected task is\n", this.task)
    this.taskToEdit = { ...this.task }
  }

  handleInputChange(event) {}
}
