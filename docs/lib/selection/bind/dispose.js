export function dispose(filter) {
    this.selected.forEach((node, i) => {
        filter != undefined ? (filter(node, i) ? node.dispose() : '') : node.dispose();
    });
    return this;
}
