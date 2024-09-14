### JP MORGAN CHASE OPEN SOURCE CONTRIBUTION ###

# NodeLink3D.js

## Version: 1.2.0 - September 2024

NodeLink3D.js is a robust library for visualizing and interacting with 3D force-directed graphs. This version introduces several new features, performance improvements, and enhancements to the user experience.

## Key Features

### 1. Interactive Node Highlighting and Hover Effects
- **Feature**: Nodes now enlarge when hovered over, providing visual feedback to users.
  
### 2. Dynamic Color Mapping Based on Node Degree
- **Feature**: Nodes dynamically change color depending on their degree (number of links connected).
  - **Nodes with a degree greater than 5 are highlighted in red.**

### 3. Zoom and Pan Controls for Camera
- **Feature**: The camera now supports zooming and panning for better navigation across the 3D graph.
  - **Panning sensitivity and radius limits are configurable.**

### 4. Collision Detection Using `forceCollide()`
- **Feature**: Prevents nodes from overlapping by setting a radius based on the size of each node.
  - **Nodes maintain space between each other for improved readability.**

### 5. Node Label Visibility on Hover
- **Feature**: Text labels for each node are displayed on hover, providing node identification in 3D space.

### 6. Gravity Simulation (Center Attraction)
- **Feature**: Added a custom gravity force to pull nodes toward the center of the graph.
  - **Ensures the network stays organized within the viewport, enhancing visualization stability.**

### 7. Physics-Based Force Adjustments
- **Link Strength**: Fine-tuned to create smoother connections between nodes.
- **Charge Strength**: Adjusted to control node repulsion effectively.

### 8. Node Filtering Support (Future-Ready)
- **Feature**: The foundation is laid to filter nodes based on custom properties like degree, group, etc.
  - **Dynamic color assignment is handled via `d3.scaleOrdinal()` for node groups.**

### 9. Graph Export Functionality
- **Feature**: Users can export the current state of the network (nodes' positions and attributes) as a JSON file.
  - **Useful for saving layouts for later use or sharing data with other systems.**

## Improvements

### 1. Camera Behavior Enhancements
- **Improvement**: Added bouncing and auto-rotation behavior to improve the user experience while interacting with the 3D graph.

### 2. Node Scaling Animation
- **Improvement**: Improved scaling animations on hover to create a smoother transition.

### 3. Performance Optimization
- **Improvement**: Utilized `forceManyBody()` for efficient handling of large datasets in the 3D simulation.

## Frequently Asked Questions (FAQ)

### Q1: How do I enable node filtering?
- **Answer**: Node filtering support is currently under development. The foundation is laid in this version, and a future update will introduce the ability to filter nodes by properties such as degree, group, and more.

### Q2: Can I customize the zoom and pan sensitivity for the camera?
- **Answer**: Yes, zoom and pan sensitivity, as well as the camera's radius limits, are configurable. You can adjust these settings to suit your needs.

### Q3: How does the collision detection work?
- **Answer**: Collision detection is implemented using the `forceCollide()` function. It assigns a radius to each node based on its size, preventing nodes from overlapping and ensuring clear visual separation.

### Q4: What file format is used for exporting the graph?
- **Answer**: The current state of the graph, including nodes' positions and attributes, is exported as a JSON file. This allows for saving layouts or sharing the graph data with other systems.

## What's Next

In upcoming releases, we plan to introduce:
- **Node Filtering**: Complete the node filtering functionality, enabling users to filter nodes based on custom attributes like degree, group, etc.
- **Advanced Graph Layouts**: Provide support for additional graph layouts and forces.
- **Real-Time Data Support**: Enable dynamic updates to the graph with real-time data streams.

Stay tuned for more exciting updates!

---

For more information or to contribute, visit our [GitHub repository](https://github.com/NodeLink3D).
