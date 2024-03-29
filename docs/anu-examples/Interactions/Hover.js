//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
import penguins from '../data/penguins.json' assert {type: 'json'}; //Our data
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, ActionManager, InterpolateValueAction, ExecuteCodeAction, HighlightLayer, Color3} from '@babylonjs/core';
import { extent, scaleOrdinal, scaleLinear, map, } from "d3";

export function hover(engine) {

    //Create an empty scene
    const scene = new Scene(engine)

    //Add some lighting (name, position, scene)
    new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

    //Add a camera that rotates around the origin 
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(2, 2, -3.5);

    var scaleX = scaleLinear().domain(extent(map(penguins, (d) => { return d['Beak Depth (mm)'] }))).range([-1, 1]).nice();
    var scaleY = scaleLinear().domain(extent(map(penguins, (d) => { return d['Beak Length (mm)'] }))).range([-1, 1]).nice();
    var scaleZ = scaleLinear().domain(extent(map(penguins, (d) => { return d['Flipper Length (mm)'] }))).range([-1, 1]).nice();

    var scaleC = scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())

    //Create a transform node to use as the parent node for all our meshes
    let CoT = anu.create("cot", "cot");

    //Select our center or transform with Anu to give us a selection obj CoT.
    let chart = anu.selectName('cot', scene);

    const highlighter = new HighlightLayer("highlighter", scene); //Allows us to had a highlight stencil to a mesh

    let spheres = chart.bind('sphere', { diameter: 0.05 }, penguins)
        .positionX((d) => scaleX(d['Beak Depth (mm)']))
        .positionY((d) => scaleY(d['Beak Length (mm)']))
        .positionZ((d) => scaleZ(d['Flipper Length (mm)']))
        .material((d) => scaleC(d.Species))
        //Babylon use an action system to trigger events form interacting with meshes, this is a simple example to show a hover interaction. grow when hover and shrink when stopped. 
        .action((d, n, i) => new InterpolateValueAction( //Type of action
            ActionManager.OnPointerOverTrigger, //Action Trigger
            n, // The Mesh or Node to Change
            'scaling', // The Property to Change
            new Vector3(1.2, 1.2, 1.2), //The Value of the Change
            100 // The time to lerp between old and new value
        ))
        .action((d, n, i) => new InterpolateValueAction( //Same as above but to return to normal
            ActionManager.OnPointerOutTrigger,
            n,
            'scaling',
            new Vector3(1, 1, 1),
            100))
        .action((d,n,i) => new ExecuteCodeAction( //A flexible action that executes a function after the trigger
            ActionManager.OnPointerOverTrigger,
            () => {
                highlighter.addMesh(n, Color3.White());
            }
        ))
        .action((d,n,i) => new ExecuteCodeAction( //Same as above but in reverse 
            ActionManager.OnPointerOutTrigger,
            () => {
                highlighter.removeMesh(n);
            }
        ))

    anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ }, labelOptions: {size: 0.02} });

    return scene;

};



