export function enterPressedHandler(action, event) {
  if (event.key === 'Enter') {
    action();
  }
}