export default class Modal {
    constructor({ title = 'Modal Title', content = '', onClose = null}) {
        this.title = title;
        this.content = content;
        this.onClose = onClose;
    }

    render() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay modal-fade-in';

        // Create modal box
        const modalBox = document.createElement('div');
        modalBox.className = 'modal-box';
        modalBox.addEventListener('click', (e) => e.stopPropagation()); // preven closing when clicking inside box

        overlay.addEventListener('click', () => {
            this.close(overlay);
        });

        // create Title
        const titleEl = document.createElement('h2');
        titleEl.textContent = this.title;

        // Create Content
        const contentEl = document.createElement('div');
        if (typeof this.content === 'string') {
            contentEl.textContent = this.content;
        } else {
            contentEl.appendChild(this.content);
        }

        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.className = 'modal-close';
        closeBtn.addEventListener('click', () => {
            this.close(overlay);
        });

        // Append children
        modalBox.appendChild(titleEl);
        modalBox.appendChild(contentEl);
        modalBox.appendChild(closeBtn);
        overlay.appendChild(modalBox);

        return overlay
    }

    close(overlay) {
        overlay.classList.remove('modal-fade-in');
        overlay.classList.add('modal-fade-out');

        // Wait for fade out animation to finish
        setTimeout(() => {
            overlay.remove();
            if (this.onClose) this.onClose();
        }, 300)
    }
}