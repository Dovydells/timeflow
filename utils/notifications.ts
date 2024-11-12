export const scheduleTaskReminder = async (task: Task) => {
  if (window.systemPermissions) {
    const permission = await window.systemPermissions.requestNotificationPermission();
    if (permission === 'granted') {
      window.systemPermissions.sendSystemNotification(
        'Task Reminder',
        `Time to work on: ${task.title}`,
        {
          actionButtons: [
            {
              text: 'Complete Task',
              action: () => completeTask(task.id)
            },
            {
              text: 'Remind Later',
              action: () => showMotivationalPrompt()
            }
          ]
        }
      );
    }
  }
}; 