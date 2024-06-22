import { LightningElement, track } from "lwc";
import { taskService } from "./services/task.service.js";
import saveTask from "@salesforce/apex/TaskController.saveTask";
import getTasks from "@salesforce/apex/TaskController.getTasks";

export default class TaskManager extends LightningElement {
   @track tasks = [];
   DEMO_TASKS_COUNT = 10;

   async connectedCallback() {
      window.addEventListener("taskchange", this.handleTaskChange, false);
      try {
         this.tasks = await getTasks();
         if (!this.tasks.length || !this.tasks) {
            const DEMO_TASKS = await taskService.getTasks(
               this.DEMO_TASKS_COUNT
            );
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
            throw new Error("tasks is not defined");
         }
         const taskId = event.detail.task.Id;
         const updatedTask = { ...event.detail.task };

         this.tasks = this.tasks.map((task) =>
            task.Id === taskId ? updatedTask : task
         );
         saveTask({ task: updatedTask });
      } catch (error) {
         console.error("Error in handleTaskChange:", error.message);
      }
   };

   async saveTasks() {
      try {
         const savePromises = this.tasks.map((task) => {
            return saveTask({ task });
         });
         await Promise.all(savePromises);
      } catch (error) {
         console.log(error.message);
      }
   }

   disconnectedCallback() {
      window.removeEventListener("taskchange", this.handleTaskChange, false);
   }
}
