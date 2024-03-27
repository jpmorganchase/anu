//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu' //Anu for Scene-Graph Manipulation
import cars from '../data/cars.json' assert {type: 'json'}; //Our data
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, ActionManager, ExecuteCodeAction, HighlightLayer, Color3} from '@babylonjs/core';
import { extent, scaleOrdinal, scaleLinear, map } from "d3";
import { AdvancedDynamicTexture, Rectangle, TextBlock} from '@babylonjs/gui'

export const details = function (engine) {

    //Create an empty scene
    const scene = new Scene(engine)

    //Add some lighting (name, position, scene)
    new HemisphericLight('light1', new Vector3(0, 10, 0), scene)

    //Add a camera that rotates around the origin 
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.attachControl(true)
    camera.position = new Vector3(2, 2, -3.5);

    var scaleX = scaleLinear().domain(extent(map(cars, (d) => { return d['Weight_in_lbs'] }))).range([-1, 1]).nice();
    var scaleY = scaleLinear().domain(extent(map(cars, (d) => { return d['Horsepower'] }))).range([-1, 1]).nice();
    var scaleZ = scaleLinear().domain(extent(map(cars, (d) => { return d['Acceleration'] }))).range([-1, 1]).nice();

    var scaleC = scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial())

    //Create a transform node to use as the parent node for all our meshes
    let CoT = anu.create("cot", "cot");

    //Select our center or transform with Anu to give us a selection obj CoT.
    let chart = anu.selectName('cot', scene);

    const highlighter = new HighlightLayer("highlighter", scene); //Allows us to had a highlight stencil to a mesh

    //Use Babylon GUI system to create a texture gui for a plane mesh
    const hoverPlane = anu.create('plane', 'hoverPlane', {width: 1, height: 1})
    hoverPlane.isPickable = false; //disable picking so it doesn't get in the way of interactions
    hoverPlane.renderingGroupId = 1; //set render id higher so it always renders in front

    let advancedTexture = AdvancedDynamicTexture.CreateForMesh(hoverPlane);

    //Create a rectangle for the background
    let UIBackground = new Rectangle();
    UIBackground.adaptWidthToChildren = true;
    UIBackground.adaptHeightToChildren = true;
    UIBackground.cornerRadius = 20;
    UIBackground.color = "Black";
    UIBackground.thickness = 2;
    UIBackground.background = "White";
    advancedTexture.addControl(UIBackground);

    //Create empty text block 
    let label = new TextBlock();
    label.paddingLeftInPixels = 25;
    label.paddingRightInPixels = 25;
    label.fontSizeInPixels = 50;
    label.resizeToFit = true;
    label.text = " "
    UIBackground.addControl(label);

    //Hide the plane until needed
    hoverPlane.isVisible = false;
    //Set billboard mode to always face camera
    hoverPlane.billboardMode = 7;


    let spheres = chart.bind('sphere', { diameter: 0.05 }, cars)
        .positionX((d) => scaleX(d['Weight_in_lbs'] ))
        .positionY((d) => scaleY(d['Horsepower']))
        .positionZ((d) => scaleZ(d['Acceleration']))
        .material((d) => scaleC(d['Origin']))
        //Babylon use an action system to trigger events form interacting with meshes, this is a simple example to show a hover interaction. grow when hover and shrink when stopped. 
        .action((d,n,i) => new ExecuteCodeAction( //A flexible action that executes a function after the trigger
            ActionManager.OnPointerOverTrigger,
            () => {
                highlighter.addMesh(n, Color3.White());
                label.text = d['Name'] //Change Label Text
                hoverPlane.position = n.position.add(new Vector3(0, 0.1, 0)) //Move ui mesh to mesh position with offset
                hoverPlane.isVisible = true; //unhide mesh
            }
        ))
        .action((d,n,i) => new ExecuteCodeAction( //Same as above but in reverse 
            ActionManager.OnPointerOutTrigger,
            () => {
                highlighter.removeMesh(n);
                hoverPlane.isVisible = false;
                label.text = " ";
            }
        ))

    anu.createAxes('test', scene, { parent: chart, scale: { x: scaleX, y: scaleY, z: scaleZ }, labelOptions: {size: 0.02} });

    return scene;

};



