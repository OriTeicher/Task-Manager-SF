public with sharing class taskController {

    @AuraEnabled
    public static List<CustomTask__c> getTasks() {
        System.debug('getting tasks from db');
        return [SELECT Id, Name, Description__c, IsDone__c FROM CustomTask__c];
    }

    @AuraEnabled
    public static void saveTask(CustomTask__c task) {
        System.debug('saving task to db' + task);
        if (task.Id == null) {
            insert task;
        } else {
            update task;
        }
    }

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        System.debug('deleting task from db ' + taskId);
        CustomTask__c task = [SELECT Id FROM CustomTask__c WHERE Id = :taskId];
        delete task;
    }
}