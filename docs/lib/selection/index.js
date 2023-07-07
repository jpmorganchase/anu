import { select, selectName, selectId, selectTag } from './utility/select';
import { bind, bindInstance } from './bind/bind';
import { position, positionX, positionY, positionZ } from './property/position';
import { translate } from './bind/translate';
import { rotation, rotationX, rotationY, rotationZ } from './property/rotation';
import { scaling, scalingX, scalingY, scalingZ } from './property/scaling';
import { get } from './utility/get';
import { addTags, hasTags, removeTags } from './property/tags';
import { action } from './property/actions';
import { ambientColor, diffuseColor, emissiveColor, material, specularColor, ambientTexture, diffuseTexture, emissiveTexture, specularTexture, } from './property/material';
import { registerInstancedBuffer, setInstancedBuffer } from './property/instancedBuffer';
import { attr, props, prop } from './property/attr';
import { func } from './utility/func';
import { dispose } from './bind/dispose';
import { drawTextDT, scaleDT } from './property/dynamicTexture';
import { axisBasic } from '../prefabs/Axis/OLD/axisBasic';
import { createPipeAxis } from '../prefabs/Axis/OLD/AxisNew';
import { boundingBox } from './utility/boundingBox';
import { filter } from './utility/filter';
/*
    The core class of anujs. All functions should return
    an instance of selection which contains the current scene
    and either a node, mesh, or list of meshes.
    The selection class also exposes all of anus core functions.
*/
export class Selection {
    constructor(nodes, scene) {
        this.select = select;
        this.selectName = selectName;
        this.selectId = selectId;
        this.selectTag = selectTag;
        this.bind = bind;
        this.func = func;
        this.bindInstance = bindInstance;
        this.position = position;
        this.positionX = positionX;
        this.positionY = positionY;
        this.positionZ = positionZ;
        this.translate = translate;
        this.rotation = rotation;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.rotationZ = rotationZ;
        this.scaling = scaling;
        this.scalingX = scalingX;
        this.scalingY = scalingY;
        this.scalingZ = scalingZ;
        this.get = get;
        this.attr = attr;
        this.addTags = addTags;
        this.removeTags = removeTags;
        this.hasTags = hasTags;
        this.action = action;
        this.material = material;
        this.diffuseColor = diffuseColor;
        this.specularColor = specularColor;
        this.emissiveColor = emissiveColor;
        this.ambientColor = ambientColor;
        this.registerInstancedBuffer = registerInstancedBuffer;
        this.setInstancedBuffer = setInstancedBuffer;
        this.dispose = dispose;
        this.diffuseTexture = diffuseTexture;
        this.specularTexture = specularTexture;
        this.emissiveTexture = emissiveTexture;
        this.ambientTexture = ambientTexture;
        this.scaleDT = scaleDT;
        this.scaleToDT = scaleDT;
        this.drawTextDT = drawTextDT;
        this.axis = axisBasic;
        this.boundingBox = boundingBox;
        this.filter = filter;
        this.pipeAxis = createPipeAxis;
        this.props = props;
        this.prop = prop;
        this.selected = nodes;
        this.scene = scene;
    }
}
