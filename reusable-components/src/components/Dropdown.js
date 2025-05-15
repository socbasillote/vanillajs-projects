
export default class Dropdown {
  constructor({ label, options, onChange }) {
    this.label = label;
    this.options = options;
    this.onChange = onChange;
  }

  render() {
    // Create container
    const wrapper = document.createElement('div');
    wrapper.className = 'dropdown-wrapper';

    // Create label
    const labelEl = document.createElement('label');
    labelEl.textContent = this.label;
    labelEl.className = 'dropdown-label';

    // Create select element
    const select = document.createElement('select');
    select.className = 'dropdown-select';

    // Add options
    this.options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.value;
      opt.textContent = option.label;
      select.appendChild(opt);
    });

    // Handle change
    select.addEventListener('change', (e) => {
      if (this.onChange) this.onChange(e.target.value);
    });

    // Append children
    wrapper.appendChild(labelEl);
    wrapper.appendChild(select);

    return wrapper;
  }
}
