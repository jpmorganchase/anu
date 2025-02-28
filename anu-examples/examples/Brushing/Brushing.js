//Import everything we need to create our babylon scene and write our visualization code. 
import * as anu from '@jpmorganchase/anu';
import * as d3 from "d3";
import cars from '../../data/cars.json' assert {type: 'json'}; //Our data
import { HemisphericLight, Vector3, Scene, ArcRotateCamera, PointerEventTypes, Color3, StandardMaterial} from '@babylonjs/core';

export const brushing = function (engine) {

  const scene = new Scene(engine);

  new HemisphericLight('light1', new Vector3(0, 10, 0), scene);

  const camera = new ArcRotateCamera("Camera", (Math.PI / 2) * 3, Math.PI / 2, 6, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 12;
  camera.attachControl(true);

  //Add a unique index to each car so that we can easily retrieve this later
  cars.forEach((element, index) => element.index = index);

  //Left 2D scatterplot
  let scaleX1 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Miles_per_Gallon}))).range([-1,1]).nice();
  let scaleY1 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Acceleration}))).range([-1,1]).nice();
  let scaleC = d3.scaleOrdinal(anu.ordinalChromatic('d310').toStandardMaterial());

  let CoT1 = anu.create("cot", "cot1");
  let chart1 = anu.selectName("cot1", scene);
  let spheres1 = chart1.bind('sphere', { diameter: 0.05 }, cars)
                      .positionX((d) => scaleX1(d.Miles_per_Gallon))
                      .positionY((d) => scaleY1(d.Acceleration))
                      .material((d) => scaleC(d.Origin))
                      .prop('outlineWidth', 0.0075);
  anu.createAxes('chart1', scene, { parent: chart1, scale: { x: scaleX1, y: scaleY1 } });
  CoT1.position = new Vector3(-1.3, 0, 0);
  

  //Right 3D scatterplot
  let scaleX2 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Horsepower}))).range([-1,1]).nice();
  let scaleY2 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Weight_in_lbs}))).range([-1, 1]).nice();
  let scaleZ2 = d3.scaleLinear().domain(d3.extent(d3.map(cars, (d) => {return d.Displacement}))).range([-1,1]).nice();

  let CoT2 = anu.create("cot", "cot2");
  let chart2 = anu.selectName("cot2", scene);
  let spheres2 = chart2.bind('sphere', { diameter: 0.075 }, cars)
                      .positionX((d) => scaleX2(d.Horsepower))
                      .positionY((d) => scaleY2(d.Weight_in_lbs))
                      .positionZ((d) => scaleZ2(d.Displacement))
                      .material((d) => scaleC(d.Origin))
                      .prop('outlineWidth', 0.01);
  anu.createAxes('chart2', scene, { parent: chart2, scale: { x: scaleX2, y: scaleY2, z: scaleZ2 } });
  CoT2.position = new Vector3(1.3, 0, 0);

  //Create brush for the 2D scatterplot
  let brush1 = anu.createBrush('brush1', scene,
    {
      parent: chart1,                               //The chart that the brush is bound to, must be set
      scales: { x: scaleX1, y: scaleY1 },           //The scales of this chart which are used to determine ranges that the brush can move in, at least one must be set
      padding: { x: 0.1, y: 0.1 },                  //Adds padding to the specified ranges that the brush can move in, defaults to 0
      rotateAxes: { x: false, y: false, z: false }  //Allows or disallows the brush to be rotated along the specified axes, has sensible defaults depending on the scales set
    }
  );

  //Create brush for the 3D scatterplot
  //We can also create a material to pass into the brush
  let mat = new StandardMaterial('myBrushMaterial');
  mat.diffuseColor = Color3.Yellow();
  mat.alpha = 0.4;
  let brush2 = anu.createBrush('brush2', scene,
    {
      parent: chart2,
      scales: { x: scaleX2, y: scaleY2, z: scaleZ2 },
      minSize: { x: 0.5, y: 0.5, z: 0.5 },          //The minimum size of the brush along each axis, has sensible defaults depending on the scales set
      material: mat                                 //Assign our material
    }
  );

  //Create observables to respond to brush events
  //Get a list of all of our spheres which we will then use to find linked marks
  let allSpheres = new anu.Selection([...spheres1.selected, ...spheres2.selected]);

  brush1.onBrushChangedObservable.add((evt) => {
    let addedIndices = evt.added.map(n => n.metadata.data.index);       //Retrieve indices of newly highlighted points via evt.added
    allSpheres.filter((d,n,i) => addedIndices.includes(d.index))        //Filter our selection down to these indices
              .prop('renderOutline', true);                             //Change appearance

    let removedIndices = evt.removed.map(n => n.metadata.data.index);   //Retrieve indices of newly unhighlighted points via evt.removed
    allSpheres.filter((d,n,i) => removedIndices.includes(d.index))      //Filter our selection down to these indices
              .prop('renderOutline', false)                             //Change appearance
  });

  brush2.onBrushChangedObservable.add((evt) => {
    let addedIndices = evt.added.map(n => n.metadata.data.index);
    allSpheres.filter((d,n,i) => addedIndices.includes(d.index))        //Brushed marks can also be accessed via evt.brushed,
              .transition((d,n,i) => ({ duration: 200 }))               //but evt.added and removed makes performing transitions easier
              .scaling(new Vector3(1.5, 1.5, 1.5));
    let removedIndices = evt.removed.map(n => n.metadata.data.index);
    allSpheres.filter((d,n,i) => removedIndices.includes(d.index))
              .transition((d,n,i) => ({ duration: 200 }))
              .scaling(Vector3.One());
  });

  return scene;
};
