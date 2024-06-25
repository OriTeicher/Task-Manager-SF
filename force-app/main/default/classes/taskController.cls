public with sharing class taskController {

    @AuraEnabled
    public static List<CustomTask__c> getTasks() {
        return [SELECT Id,Name, Description__c, IsDone__c, Importance__c, createdAt__c FROM CustomTask__c];
    }

    @AuraEnabled
    public static void saveTask(CustomTask__c task) {
        System.debug('saving task to db' + task);
        if (task.Name == null) {
            insert task;
        } else {
            update task;
        }
    }

    @AuraEnabled
    public static void deleteTask(String taskId) {
        try {
            CustomTask__c taskToDelete = [SELECT Id FROM CustomTask__c WHERE Name = :taskId];
            System.debug('Task to delete  \n' + taskToDelete);
            delete taskToDelete;
        }catch (Exception err) {
            throw new IllegalArgumentException('Invalid ID format');
        }
    }

}