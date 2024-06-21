import { LightningElement, track } from 'lwc';
import {taskService} from './services/task.service.js'
export default class TaskManager extends LightningElement {

    @track tasks = []
    doneTasks = []
    activeTasks = []
    currTasksCount = 10

    async connectedCallback(){
        try{
            this.tasks = await taskService.getTasks(this.currTasksCount)
            this.setIsDoneStyles()
            if(!this.tasks.length) throw new Error('No tasks found.')
        }catch(err){
            console.log(err)
        }
    }




}