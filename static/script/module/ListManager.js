export class ListManager {
    constructor(listParent, parseTemplate) {
        this.$listParent = listParent;
        this.parseTemplate = parseTemplate;
        this.listData = [];
    }

    initData(data) {
        this.listData = [];
        data.forEach((item) => {
            this.listData.push(this.parseTemplate(item));
        })
    }
    deleteData(key, value) {
        this.listData = this.listData.filter((item) => +item[key] !== +value );
    }
    addData(item) {
        this.listData.push(this.parseTemplate(item));
    }
    getData() {
        return this.listData.slice();
    }

    renderList() {
        while (this.$listParent.firstChild) {
            this.$listParent.removeChild(this.$listParent.firstChild);
        }
        this.listData.forEach((item) => {
            this.$listParent.appendChild(item.template);
        });
    }
    addEvent(eventType, eventFn) {
        this.$listParent.addEventListener(eventType, e => eventFn(e));
    }
}
