export default class NotificationMessage {
  constructor(message, {duration = 1000, type = 'success'} = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.show();
  }

  show(targetEl) {
    let targetElement = document.body;
    if (targetEl) {
      targetElement = targetEl;
    }
    if (NotificationMessage.createdInstance) {
      NotificationMessage.createdInstance.remove();
    }
    NotificationMessage.createdInstance = this;
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
    targetElement.append(this.element);
    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  getTemplate() {
    return `
  <div id="${this.id}" class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>`;
  }
}
