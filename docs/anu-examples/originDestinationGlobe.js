// SPDX-License-Identifier: Apache-2.0
// Copyright : J.P. Morgan Chase & Co.

import * as anu from '@jpmorganchase/anu';
import * as BABYLON from '@babylonjs/core';
import * as d3 from 'd3';
import airports from './data/airports.csv';
import flights from './data/flights-airport.csv';

export function originDestinationGlobe(engine){

  //Create an empty Scene
  const scene = new BABYLON.Scene(engine);
  //Add some lighting
  new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 10, -5), scene);
  //Add a camera that rotates around the origin and adjust its properties
  const camera = new BABYLON.ArcRotateCamera('Camera', 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
  camera.position = new BABYLON.Vector3(0, 2, -3);
  camera.wheelPrecision = 20;
  camera.minZ = 0;
  camera.attachControl(true);

  //Filter to flights originating from Atlanta
  let filteredFlights = flights.filter(d => d.origin === 'ATL');

  //Use the Texture Globe prefab to create a sphere with an OpenLayers map canvas as the texture
  const globeRadius = 1;
  let textureGlobe = anu.createTextureGlobe('globe', { resolution: new BABYLON.Vector3(5000, 2500), diameter: globeRadius * 2 });


  //Define a function to calculate distance in kilometers between two points on Earth from their lat/lon coordinates
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

  //Define a function to convert a flight in our dataset to an array of Vector3 corresponding to a 3D arc on the globe for that flight
  function flightToPoints(d) {
    //Find the origin and destination airports in our dataset and get their 3D positions as a Vector3 on the Texture Globe's surface
    const originAirport = airports.find(airport => airport.iata === d.origin);
    const originPosition = textureGlobe.lonLatToVector3([originAirport.longitude, originAirport.latitude]);
    const destinationAirport = airports.find(airport => airport.iata === d.destination);
    const destinationPosition = textureGlobe.lonLatToVector3([destinationAirport.longitude, destinationAirport.latitude]);

    //Get the midpoint between the origin and destination airports
    const midpoint = originPosition.add(destinationPosition).scale(0.5);
    //Adjust the height of this midpoint (from the globe's center) based on the distance between origin and destination using the Haversine formula
    const direction = midpoint.subtract(textureGlobe.position).normalize();
    const height = haversine(originAirport.latitude, originAirport.longitude, destinationAirport.latitude, destinationAirport.longitude);
    const midPosition = direction.scale(globeRadius + height * 0.0002);   //Arbitrary scaling from kilometers to Babylon scene units

    //Create a Bezier curve between these three positions for this flight path, returns a list of Vector3 with the specified number of vertices
    return BABYLON.Curve3.CreateQuadraticBezier(originPosition, midPosition, destinationPosition, 20).getPoints();
  }

  //Create D3 scale to determine the width of each flight path based on the number of flights
  let scaleWidth = d3.scaleLinear().domain([0, Math.max(...filteredFlights.map(d => d.count))]).range([0.001, 0.01]);
  
  //Select our globe object as a Selection object which will serve as our CoT
  let chart = anu.selectName('globe', scene);

  //Create greasedLines as children of our CoT using the flightToPoints function we defined earlier
  let trajectories = chart.bind('greasedLine',
                                {
                                  meshOptions: { points: (d) => flightToPoints(d) },  //Pass in our function that will convert bound data to the required array of Vector3
                                  materialOptions: {
                                    width: (d) => scaleWidth(Number(d.count)),  //Scale the greasedLine based on the number of flights from each line's bound data
                                    createAndAssignMaterial: true,   
                                    colors: [BABYLON.Color3.Red(), BABYLON.Color3.Green()],   //Set red for origin, green for destination
                                    useColors: true,
                                    colorsSampling: BABYLON.Constants.TEXTURE_LINEAR_LINEAR,  //Change sampling to cause a gradual color gradient throughout the line
                                    colorDistribution: BABYLON.GreasedLineMeshColorDistribution.COLOR_DISTRIBUTION_NONE, //Use only the two colors we defined rather than generating new values for the remaining vertices
                                    colorDistributionType: BABYLON.GreasedLineMeshColorDistributionType.COLOR_DISTRIBUTION_TYPE_LINE //Distribute these two colors throughout the entire line
                                  }
                                },
                                filteredFlights); //Bind our data here, we calculate Vector3s and widths using anonymous functions based on this data rather than precomputing Vector3s and passing them in directly

  return scene;
}