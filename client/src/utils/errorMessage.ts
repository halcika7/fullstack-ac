export const getErrorMessage = (message: string) => {
  const split = message.split(' ');

  split[0] = split[0]
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  if (split[0] === 'ConfirmPassword') {
    split[0] = 'Confirm Password';
  }

  return split.join(' ');
};
