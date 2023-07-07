import { Tags } from '@babylonjs/core';
import { Selection } from '../index';
/**
 *Select all nodes from the childern graph(s) of selected
 *matching the indicator and return it as a instance of Selection.
 *
 *selection types;
 *.<Name> : select by Name
 *#<ID> : select by ID
 *$<Tags> : select by tags
 */
export function select(name) {
    let indicator = name[0];
    let text = name.slice(1);
    let selected = [];
    if (indicator === '.') {
        this.selected.forEach((element) => (selected = selected.concat(element === null || element === void 0 ? void 0 : element.getChildren((node) => node.name == text))));
        return new Selection(selected, this.scene);
    }
    else if (indicator === '#') {
        this.selected.forEach((element) => (selected = selected.concat(element === null || element === void 0 ? void 0 : element.getChildren((node) => node.id == text))));
        return new Selection(selected, this.scene);
    }
    else if (indicator === '$') {
        this.selected.forEach((element) => (selected = selected.concat(element === null || element === void 0 ? void 0 : element.getChildren((node) => Tags.MatchesQuery(node, text) == true))));
        return new Selection(selected, this.scene);
    }
    return new Selection([], this.scene);
}
/**
 * Select nodes from the childern graph(s) of selected by name and return it as a instance of Selection.
 *
 * @param name A string or array of strings of the names of the nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export function selectName(name) {
    let selected = [];
    Array.isArray(name)
        ? name.forEach((e, i) => (selected = [...selected, ...this.scene.getNodes().filter((node) => node.name == e)]))
        : (selected = this.scene.getNodes().filter((node) => node.name == name));
    return new Selection(selected, this.scene);
}
/**
 * Select nodes from the childern graph(s) of selected by id and return it as a instance of Selection.
 *
 * @param id A string or array of strings of ids of nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export function selectId(id) {
    let selected = [];
    Array.isArray(id)
        ? id.forEach((e, i) => (selected = [...selected, ...this.scene.getNodes().filter((node) => node.name == e)]))
        : (selected = this.scene.getNodes().filter((node) => node.id == id));
    return new Selection(selected, this.scene);
}
/**
 * Select nodes from the childern graph(s) of selected by tag and return it as a instance of Selection.
 *
 * @param tag A string or array of strings of tags or tag unions of nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export function selectTag(tag) {
    let selected = [];
    Array.isArray(tag)
        ? tag.forEach((e, i) => (selected = [...selected, ...this.scene.getNodes().filter((node) => Tags.MatchesQuery(node, e) == true)]))
        : (selected = this.scene.getNodes().filter((node) => Tags.MatchesQuery(node, tag) == true));
    return new Selection(selected, this.scene);
}
/**
 * Select nodes from the childern graph(s) of selected by data value and return it as a instance of Selection.
 *
 * @param key A string or array of strings of the keys to be searched.
 * @param name A string or number or array of strings or numbers of key values of nodes to be selected.
 * @returns A new instance of Selection with the selected nodes.
 */
export function selectData(key, value) {
    let selected = [];
    Array.isArray(key) && Array.isArray(value)
        ? key.forEach((e, i) => (selected = [
            ...selected,
            ...this.scene
                .getNodes()
                .filter((node) => node.metadata != null)
                .filter((node) => node.metadata.data[e] == value[i]),
        ]))
        : (selected = this.scene
            .getNodes()
            .filter((node) => node.metadata != null)
            .filter((node) => node.metadata.data.key == value));
    return new Selection(selected, this.scene);
}
