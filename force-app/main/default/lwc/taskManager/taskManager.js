import { LightningElement, track } from 'lwc';
import { taskService } from './services/task.service.js';

export default class TaskManager extends LightningElement {
    @track tasks = [];
    doneTasks = [];
    activeTasks = [];
    currTasksCount = 10;

    async connectedCallback() {
        window.addEventListener('taskchange', this.handleTaskChange, false);
        try {
            this.tasks = await taskService.getTasks(this.currTasksCount);
            if (!this.tasks.length) throw new Error('No tasks found.');
        } catch (err) {
            console.log(err);
        }
    }

    handleTaskChange = (event) => {
        try {
            if (!this.tasks) {
                throw new Error('tasks is not defined');
            }

            const taskId = event.detail.task._id;
            const updatedTask = { ...event.detail.task };

          
            this.tasks = this.tasks.map(task =>
                task._id === taskId ? updatedTask : task
            )

        } catch (error) {
            console.error('Error in handleTaskChange:', error.message);
        }
    }

    disconnectedCallback() {
        window.removeEventListener('taskchange', this.handleTaskChange, false);
    }
}
