import { LightningElement, api, track } from "lwc"

export default class TaskPreview extends LightningElement {
  @api task
  @track descClass
  @api loader
  loaderMsg

  connectedCallback() {
    this.descClass = this.task.isDone__c ? "done" : "active"
  }

  onRemoveTask() {
    this.loaderMsg = "Removing task..."
    const taskChangeEvent = new CustomEvent("removetask", {
      detail: { taskId: this.task.Id },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(taskChangeEvent)
  }

  handleCheckboxChange(event) {
    const updatedTask = { ...this.task }
    updatedTask.isDone__c = event.target.checked

    this.task = updatedTask
    this.descClass = this.task.isDone__c ? "done" : "active"

    const taskChangeEvent = new CustomEvent("taskchange", {
      detail: { task: updatedTask },
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(taskChangeEvent)
  }
}
