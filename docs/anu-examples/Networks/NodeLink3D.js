
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, StandardMaterial, Color3, Color4} from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu'
import * as d3 from 'd3';
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceCollide } from 'd3-force-3d'; //External required dependency for force layouts!
import leMis from '../data/miserables.json' assert {type: 'json'}; //Our data


export const nodelink3d = function (engine) {

    //create a scene object using our engine
    const scene = new Scene(engine)

    //Lighting
    let light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene)
    light.diffuse = new Color3(1, 1, 1);
	light.specular = new Color3(1, 1, 1);
	light.groundColor = new Color3(1, 1, 1);

    //Camera Setup
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.position = new Vector3(1,1,0.17);
    camera.attachControl(true);

    //Make the camera spin
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;
    camera.speed = 10;
    camera.useBouncingBehavior = true;
    camera.useAutoRotationBehavior = true;
    camera.radius = 30;

    //Visualization Code Start

    //Create a color scale returning color4 for our nodes
    const color = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

     // Create a simulation with several forces.
     const simulation = forceSimulation(leMis.nodes, 3)
     .force("link", forceLink(leMis.links))//.strength(0.05).id(d => d.id))
     .force("charge", forceManyBody())
     .force("collide", forceCollide())//.radius((d) => d.count))
     .force("center", forceCenter(0, 0, 0))
     .on("tick", ticked);

    //create a "container" or empty mesh to act as the root node for our network 
    //childObserver true will ensure the bounding box updates to fit the extend of the children nodes
    let cot = anu.bind('container');

    //We will be using instancing so create a sphere mesh to be the root of our instanced meshes
    let sphere = anu.create('sphere', 'node');

    //Set the properties of the root mesh and register the instance buffer for color
    sphere.isVisible = false;
    sphere.material = new StandardMaterial('mat');
    sphere.material.specularColor = new Color3(0, 0, 0)
    sphere.registerInstancedBuffer('color', 4);
    sphere.instancedBuffers.color = new Color4(0, 0, 0, 1);

    //Bind a selection of instanced nodes using our sphere mesh and data
    //set the properties we want
    let sphereNodes = cot.bindInstance(sphere, leMis.nodes)
        .position((d) => new Vector3(d.x, d.y, d.z))
        .scaling((d) => new Vector3(6,6,6))
        .id((d, n, i) => d.id)
        .setInstancedBuffer('color', (d) => color(d.group))


    //We will be using a lineSystem mesh for our edges which takes a two dimension array and draws a line for each sub array.
    //lineSystems use one draw call for all line meshes and will be the most performant option 
    //This function helps prepare our data for that data structure format. 
    let updateLines = (data) => {
        let lines = [];
        data.forEach((v, i) => {
            let start = new Vector3(v.source.x, v.source.y, v.source.z);
            let end = new Vector3(v.target.x, v.target.y, v.target.z);
            lines.push([start, end]);
        })
        return lines;
    }

    //bind a selection and set the lines option using our data and function from above
    let line = cot.bind("lineSystem", { lines: (d) => updateLines(d), updatable: true }, [leMis.links])
        .prop("color", new Color4(1, 1, 1, 1))
        .prop("alpha", 0.3)

    //use the run method to access our root node and call normalizeToUnitCube to scale the visualization down to 1x1x1
    cot.run((d,n) => { n.normalizeToUnitCube()}).positionY(1)

    // Set the position attributes of links and nodes each time the simulation ticks.
    function ticked() {
        //For the instanced spheres just set a new position
        sphereNodes.position((d, n, i) => new Vector3(d.x, d.y, d.z));
        //For the lines use the run method to replace the lineSystem mesh with a new one.
        //The option instance takes the old mesh and replaces it with a new mesh.
        line.run((d, n, i) => anu.create('lineSystem', 'edge', { lines: updateLines(d), instance: n, updatable: true }, d))

    }

    camera.setTarget(cot.selected[0])

    return scene
}



