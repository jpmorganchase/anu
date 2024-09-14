import { HemisphericLight, Vector3, Scene, ArcRotateCamera, StandardMaterial, Color3, Color4 } from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceCollide } from 'd3-force-3d';
import leMis from '../../data/miserables.json' assert {type: 'json'};

export const nodelink3d = function (engine) {
    
    // Create a scene object using our engine
    const scene = new Scene(engine);

    // Lighting
    let light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    light.diffuse = new Color3(1, 1, 1);
    light.specular = new Color3(1, 1, 1);
    light.groundColor = new Color3(1, 1, 1);

    // Camera Setup
    const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
    camera.position = new Vector3(1, 1, 0.17);
    camera.attachControl(true);
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 50; // Increased limit for zoom
    camera.panningSensibility = 1000; // Enable panning
    camera.useBouncingBehavior = true;
    camera.useAutoRotationBehavior = true;
    camera.radius = 30;

    // Visualization Code Start

    // Create a color scale returning color4 for our nodes
    const color = d3.scaleOrdinal(anu.ordinalChromatic('d310').toColor4());

    // Create a simulation with several forces
    const simulation = forceSimulation(leMis.nodes)
        .force("link", forceLink(leMis.links).distance(5).strength(0.1))
        .force("charge", forceManyBody().strength(-100))
        .force("collide", forceCollide().radius((d) => d.size + 1).iterations(4)) // Collision detection
        .force("center", forceCenter(0, 0, 0))
        .on("tick", ticked);

    // Create a "container" or empty mesh to act as the root node for our network
    let cot = anu.bind('container');

    // Create a root sphere mesh for instanced nodes
    let sphere = anu.create('sphere', 'node');
    sphere.isVisible = false;
    sphere.material = new StandardMaterial('mat');
    sphere.material.specularColor = new Color3(0, 0, 0);
    sphere.registerInstancedBuffer('color', 4);
    sphere.instancedBuffers.color = new Color4(0, 0, 0, 1);

    // Bind instanced nodes using our sphere mesh and data
    let sphereNodes = cot.bindInstance(sphere, leMis.nodes)
        .position((d) => new Vector3(d.x, d.y, d.z))
        .scaling((d) => new Vector3(6, 6, 6))
        .id((d, n, i) => d.id)
        .setInstancedBuffer('color', (d) => color(d.group));

    // Add hover effects on nodes
    sphereNodes.run((d, n, i) => {
        n.actionManager = new BABYLON.ActionManager(scene);
        n.actionManager.registerAction(new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPointerOverTrigger, n, 'scaling', new Vector3(1.5, 1.5, 1.5), 150
        ));
        n.actionManager.registerAction(new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPointerOutTrigger, n, 'scaling', new Vector3(1, 1, 1), 150
        ));
    });

    // Dynamic color mapping based on node degree
    sphereNodes.setInstancedBuffer('color', (d) => {
        let degree = leMis.links.filter(link => link.source.id === d.id || link.target.id === d.id).length;
        return degree > 5 ? new Color4(1, 0, 0, 1) : color(d.group);
    });

    // We will be using a lineSystem mesh for our edges
    let updateLines = (data) => {
        let lines = [];
        data.forEach((v, i) => {
            let start = new Vector3(v.source.x, v.source.y, v.source.z);
            let end = new Vector3(v.target.x, v.target.y, v.target.z);
            lines.push([start, end]);
        });
        return lines;
    };

    // Bind a selection and set the lines option using our data
    let line = cot.bind("lineSystem", { lines: (d) => updateLines(d), updatable: true }, [leMis.links])
        .prop("color", new Color4(1, 1, 1, 1))
        .prop("alpha", 0.3);

    cot.run((d, n) => { n.normalizeToUnitCube(); }).positionY(1);

    // Set the position attributes of links and nodes each time the simulation ticks
    function ticked() {
        sphereNodes.position((d, n, i) => new Vector3(d.x, d.y, d.z));
        line.run((d, n, i) => anu.create('lineSystem', 'edge', { lines: updateLines(d), instance: n, updatable: true }, d));
    }

    // Node Label Creation
    sphereNodes.run((d, n, i) => {
        let label = anu.create('text', d.id, {
            text: d.id,
            fontSize: 12,
            position: new Vector3(d.x, d.y + 1, d.z),
            scene: scene
        });
        label.isVisible = false;
        n.actionManager.registerAction(new BABYLON.SetValueAction(
            BABYLON.ActionManager.OnPointerOverTrigger, label, "isVisible", true
        ));
    });

    // Gravity Simulation - pulling nodes toward the center
    simulation.force("gravity", (alpha) => {
        leMis.nodes.forEach((d) => {
            d.vx += (0 - d.x) * 0.02 * alpha;
            d.vy += (0 - d.y) * 0.02 * alpha;
            d.vz += (0 - d.z) * 0.02 * alpha;
        });
    });

    // Add Export Graph Functionality
    function exportGraphData() {
        const data = leMis.nodes.map(node => ({ id: node.id, x: node.x, y: node.y, z: node.z }));
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'network_layout.json';
        link.click();
    }

    camera.setTarget(cot.selected[0]);

    return scene;
};