public with sharing class taskController {

    @AuraEnabled
    public static List<CustomTask__c> getTasks() {
        return [SELECT Id, Name, Description__c, IsDone__c FROM CustomTask__c];
    }

    @AuraEnabled
    public static void saveTask(CustomTask__c task) {
        if (task.Id == null) {
            insert task;
        } else {
            update task;
        }
    }

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        CustomTask__c task = [SELECT Id FROM CustomTask__c WHERE Id = :taskId];
        delete task;
    }
}