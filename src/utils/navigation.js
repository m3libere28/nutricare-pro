export const openInNewWindow = (url) => {
  try {
    // First try using window.open
    const newWindow = window.open('about:blank');
    if (newWindow) {
      newWindow.location.href = url;
      return;
    }
  } catch (error) {
    console.error('Failed to open window:', error);
  }

  // Fallback to changing the current window location
  try {
    window.location.href = url;
  } catch (error) {
    console.error('Failed to navigate:', error);
  }
};
