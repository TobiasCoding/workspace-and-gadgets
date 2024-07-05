document.addEventListener('DOMContentLoaded', async () => {
  const content = document.querySelector('.gadget-content');
  try {
    const data = await window.electron.queryDatabase('SELECT name, lastname FROM items');
    content.innerHTML = data.map(item => `<p>${item.name} ${item.lastname}</p>`).join('');
  } catch (error) {
    content.textContent = `Error: ${error.message}`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.gadget-header');
  let isDragging = false;
  let offsetX, offsetY;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    document.body.style.userSelect = 'none'; // Prevent text selection while dragging
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const iframe = window.frameElement;
      iframe.style.left = (e.pageX - offsetX) + 'px';
      iframe.style.top = (e.pageY - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = ''; // Re-enable text selection after dragging
  });
});

function closeGadget() {
  const iframes = window.parent.document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    if (iframe.contentWindow === window) {
      iframe.remove();
    }
  });
}
