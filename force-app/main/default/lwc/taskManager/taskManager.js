import { LightningElement, track } from 'lwc';
import { taskService } from './services/task.service.js';
import saveTask from '@salesforce/apex/TaskController.saveTask';
import getTasks from '@salesforce/apex/TaskController.getTasks';

export default class TaskManager extends LightningElement {
    @track tasks = [];
    DEMO_TASKS_COUNT = 10;

    async connectedCallback() {
        window.addEventListener('taskchange', this.handleTaskChange, false);
        try {
            this.tasks = await getTasks();
            if (!this.tasks.length || !this.tasks) {
                const DEMO_TASKS = await taskService.getTasks(this.DEMO_TASKS_COUNT);
                this.tasks = DEMO_TASKS;
                this.saveTasks();
            }
        } catch (err) {
            console.log(err);
        }
    }

    handleTaskChange = (event) => {
        try {
            if (!this.tasks) {
                throw new Error('tasks is not defined');
            }
            const taskId = event.detail.task.Id;
            const updatedTask = { ...event.detail.task };

            this.tasks = this.tasks.map(task =>
                task.Id === taskId ? updatedTask : task
            );

            saveTask({ task: updatedTask })
                .then(() => {
                    console.log('Task saved successfully');
                })
                .catch(error => {
                    console.error('Error saving task:', error);
                });
        } catch (error) {
            console.error('Error in handleTaskChange:', error.message);
        }
    };

    async saveTasks() {
        console.log('tasks in save tasks', this.tasks);
        try {
            const savePromises = this.tasks.map(task => {
                console.log('task to save:', task);
                return saveTask({ task });
            });
            await Promise.all(savePromises);
            console.log('All tasks saved successfully');
        } catch (error) {
            console.log(error.message);
        }
    }

    disconnectedCallback() {
        window.removeEventListener('taskchange', this.handleTaskChange, false);
    }
}
