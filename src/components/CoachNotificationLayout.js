export const buildCoachNotificationLayout = () => {
  const avatar = document.createElement('img');
  avatar.className = 'coach-avatar';
  const name = document.createElement('div');
  name.className = 'coach-name';
  const message = document.createElement('div');
  message.className = 'coach-message';
  const content = document.createElement('div');
  content.className = 'coach-content';
  content.append(name, message);
  return { avatar, name, message, content };
};
