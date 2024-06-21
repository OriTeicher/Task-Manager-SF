import { LightningElement, api } from 'lwc';

export default class TaskManagerHeader extends LightningElement {

    @api tasks
    
    get getFinishedTasksCount(){
        return this.tasks.filter(task => task.isDone).length
    }

    get getRemainingTasksCount(){
        return this.tasks.filter(task => !task.isDone).length
    }
    
}