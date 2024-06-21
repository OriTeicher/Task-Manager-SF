import { LightningElement, api } from 'lwc';

export default class TaskPreview extends LightningElement {

    @api task;

    get descClass() {
        return this.task.isDone ? 'done' : 'in-progress';
    }

    get importanceClass() {
        return this.task.importance === 1 ? 'low' :
               this.task.importance === 2 ? 'medium' : 'high';
    }

}

