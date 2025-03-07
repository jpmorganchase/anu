import { Vector3, Scene, HemisphericLight, ArcRotateCamera, Curve3, GreasedLineMeshColorDistributionType, Constants, Color3 } from '@babylonjs/core';
import * as anu from '@jpmorganchase/anu';
import * as d3 from 'd3';
import airports from 'anu/../../data/airports.csv';
import flights from 'anu/../../data/flights-airport.csv';
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';

export function flightPath(babylonEngine){

  //Babylon boilerplate
  const scene = new Scene(babylonEngine);
  const light = new HemisphericLight('light1', new Vector3(0, 10, -10), scene)
  const camera = new ArcRotateCamera("Camera", -(Math.PI / 4) * 3, Math.PI / 4, 10, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);
  camera.position = new Vector3(0, 1.5, -3)

  //Filter to flights with counts greater than x
  let filteredFlights = flights.filter(d => d.origin === "ATL");

  //Create a Texture Globe
  const globeRadius = 1;
  let textureGlobe = anu.createTextureGlobe('globe', { resolution: new Vector3(5000, 2500), diameter: globeRadius * 2 }, scene);

  //Function to calculate distance between points on Earth using lat/lon coordinates
  function haversine(lat1, lon1, lat2, lon2) {
    // Convert degrees to radians
    const toRadians = (degrees) => degrees * Math.PI / 180;

    // Radius of Earth in kilometers
    const R = 6371;

    // Differences in latitudes and longitudes
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    // Haversine formula
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Return distance in kilometers
    return R * c;
  }

  //Function to convert a flight in our dataset to an array of Vector3 correpsonding to a 3D arc on the globe for that flight
  function flightToPoints(d) {
    const originAirport = airports.find(airport => airport.iata === d.origin);
    const originPosition = textureGlobe.lonLatToVector3([originAirport.longitude, originAirport.latitude]);

    const destinationAirport = airports.find(airport => airport.iata === d.destination);
    const destinationPosition = textureGlobe.lonLatToVector3([destinationAirport.longitude, destinationAirport.latitude]);

    //Get the middle position that corresponds to the top of the curve
    const midpoint = originPosition.add(destinationPosition).scale(0.5);
    const direction = midpoint.subtract(textureGlobe.position).normalize();
    //Here we base the height on the distance between the origin and destination as the crow flies using the Haversine formula
    const height = haversine(originAirport.latitude, originAirport.longitude, destinationAirport.latitude, destinationAirport.longitude);
    const midPosition = direction.scale(globeRadius + height * 0.0002);   //Arbitrary scaling from kilometers to Babylon scene units

    //Create a Bezier curve between these three positions for this flight path
    return Curve3.CreateQuadraticBezier(originPosition, midPosition, destinationPosition, 20).getPoints();  //Returns a list of Vector3
  }

  //Create D3 scale to determine the width of the trajectories
  let scaleWidth = d3.scaleLinear().domain([0, Math.max(...filteredFlights.map(d => d.count))]).range([0.001, 0.01]);
  
  //Create our globe and trajectories
  let CoT = anu.create("cot", "globe");
  let globe = anu.selectName("globe", scene);
  let trajectories = globe.bind('greasedLine', { points: (d,n,i) => flightToPoints(d) }, filteredFlights)   //Because we have multiple trajectories, we pass in an arrow function to convert each flight to an array of Vector3 that corresponds to the 3D arc
    .run((d,n,i) => {                                                     //Material properties of the greasedLine need to be set separately for now in .run()
      n.greasedLineMaterial.width = scaleWidth(Number(d.count));          //Scale the greasedLine based on the number of flights
      n.greasedLineMaterial.useColors = true;
      n.greasedLineMaterial.colorsSampling = Constants.TEXTURE_LINEAR_LINEAR;   //Change sampling to cause a gradual color gradient throughout the line
      n.greasedLineMaterial.colorsDistributionType = GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE;   //Make the colors not repeat throughout the line since we are only going to set 2 colors
      n.greasedLineMaterial.colors = [Color3.Red(), Color3.Green()];      //Set red for origin, green for destination. This needs to be set after setting sampling and distribution type
    })

  return scene;
}