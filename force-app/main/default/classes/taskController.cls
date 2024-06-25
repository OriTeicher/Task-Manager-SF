public with sharing class taskController {

    @AuraEnabled
    public static List<CustomTask__c> getTasks() {
        return [SELECT Id, Name, Description__c, isDone__c FROM CustomTask__c];
    }

    @AuraEnabled
    public static void saveTask(CustomTask__c task) {
    System.debug('Saving task to DB: ' + task);
    try {
        if (task.Id == null) {
            insert task;
        } else {
            update task;
        }
    } catch (DmlException e) {
        System.debug('Error during DML operation: ' + e.getMessage());
    }
}

    @AuraEnabled
    public static void deleteTask(Id taskId) {
        try {
            CustomTask__c taskToDelete = [SELECT Id FROM CustomTask__c WHERE Id = :taskId];
            System.debug('Task to delete  \n' + taskToDelete);
            delete taskToDelete;
        }catch (Exception err) {
            throw new IllegalArgumentException('Invalid ID format');
        }
    }

}