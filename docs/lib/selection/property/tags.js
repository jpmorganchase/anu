/**
 * TODO
 */
import { Tags } from '@babylonjs/core/Misc';
export function addTags(tags) {
    this.selected.forEach((node, i) => {
        let tag = tags instanceof Function ? tags(node.metadata.data, i) : tags;
        Tags.AddTagsTo(node, tag);
    });
    return this;
}
export function removeTags(tags) {
    this.selected.forEach((node) => Tags.RemoveTagsFrom(node, tags));
    return this;
}
export function hasTags(query) {
    let values = [];
    this.selected.forEach((node) => {
        query === undefined
            ? values.push({ node: node, value: Tags.HasTags(node) })
            : values.push({ node: node, value: Tags.MatchesQuery(node, query) });
    });
    return values;
}
