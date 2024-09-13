const grid = document.querySelector('.grid-container');
const controlsMaxCols = document.querySelector('.max-cols');
const controlsMaxWidth = document.querySelector('.max-width');

controlsMaxCols.addEventListener('change', e => {
  const value = e.target.value;
  grid.style.setProperty('--grid-column-count', value);
});

controlsMaxWidth.addEventListener('change', e => {
  const value = e.target.value;
  grid.style.setProperty('--grid-item--min-width', value + 'px');
});

// Output width of each grid-item as text.
const gridItems = document.querySelectorAll('.grid-item');
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    const width = Math.floor(entry.contentBoxSize[0].inlineSize);
    entry.target.textContent = `${width}px`;
  }
});

gridItems.forEach(el => resizeObserver.observe(el));