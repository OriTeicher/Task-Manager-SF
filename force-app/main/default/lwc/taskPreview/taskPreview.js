import { LightningElement, api, track } from 'lwc';

export default class TaskPreview extends LightningElement {
    @api task;
    @track descClass;

    connectedCallback() {
        this.descClass = this.task.IsDone__c ? 'done' : 'active';
    }

    handleCheckboxChange(event) {

        const updatedTask = { ...this.task };
        updatedTask.IsDone__c = event.target.checked;

        this.task = updatedTask;
        this.descClass = this.task.IsDone__c ? 'done' : 'active';

        const taskChangeEvent = new CustomEvent('taskchange', {
            detail: { task: updatedTask },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(taskChangeEvent);
    }
}
