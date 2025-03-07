---
layout: page
---

<script setup>
 import cardImg from '../vue_components/cardImg.vue'
  import multiView from '../vue_components/multiView.vue'
</script>

<multiView>

<div class='container'>
    <h1>Example Gallery</h1>
    <div class='section'>
        <h2>The Classics</h2>
        <hr>
        <div class="cards">
            <cardImg  title="3D Scatter Plot"  img="/anu/assets/example-images/scatterplot3D.png" link="/anu/examples/scatter_plot_3D"></cardImg>
            <cardImg title="3D Bar Chart"  img="/anu/assets/example-images/barchart3D.png" link="/anu/examples/bar_chart_3D"></cardImg>
             <cardImg title="3D Line Chart"  img="/anu/assets/example-images/linechart3D.png" link="/anu/examples/line_chart_3D"></cardImg>
            <cardImg title="2D Scatter Plot" img="/anu/assets/example-images/scatterplot2D.png" link="/anu/examples/scatter_plot_2D"></cardImg>
            <cardImg title="2D Bar Chart" img="/anu/assets/example-images/barchart2D.png" link="/anu/examples/bar_chart_2D"></cardImg>
            <cardImg title="2D Line Chart" img="/anu/assets/example-images/linechart2D.png" link="/anu/examples/line_chart_2D"></cardImg>
        </div>
    </div>
    <div class='section'>
        <h2>Geographic</h2>
        <hr>
        <div class="cards">
            <cardImg title="Texture Map" img="/anu/assets/example-images/textureMap.png" link="/anu/examples/texture_map"></cardImg>
            <cardImg title="Texture Globe" img="/anu/assets/example-images/textureGlobe.png" link="/anu/examples/texture_globe"></cardImg>
            <cardImg title="Mesh Map" img="/anu/assets/example-images/meshMap.png" link="/anu/examples/mesh_map"></cardImg>
            <cardImg title="3D Trajectory on Map" img="/anu/assets/example-images/trajectory3D.png" link="/anu/examples/trajectory_3D"></cardImg>
            <cardImg title="Origin-Destination Globe" img="/anu/assets/example-images/originDestinationGlobe.png" link="/anu/examples/origin_destination_globe"></cardImg>
        </div>
    </div>
    <div class='section'>
        <h2>Interaction and UI</h2>
        <hr>
        <div class="cards">
            <cardImg title="Pointer Hover" img="/anu/assets/example-images/pointerHover.png" link="/anu/examples/hover"></cardImg>
            <cardImg title="Details On Demand" img="/anu/assets/example-images/detailsOnDemand.png" link="/anu/examples/details"></cardImg>
            <cardImg title="Transform Widget UI" img="/anu/assets/example-images/transformWidgetUI.png" link="/anu/examples/transform_widget_ui"></cardImg>
            <cardImg title="Layouts" img="/anu/assets/example-images/layout.png" link="/anu/examples/layout"></cardImg>
        </div>
    </div>
    <div class='section'>
        <h2>Brushing and Linking</h2>
        <hr>
        <div class="cards">
            <cardImg title="Single Selection" img="/anu/assets/example-images/brushingLinkingSingle.png" link="/anu/examples/brushing_linking_single"></cardImg>
            <cardImg title="Multiple Selection" img="/anu/assets/example-images/brushingLinkingMultiple.png" link="/anu/examples/brushing_linking_multiple"></cardImg>
        </div>
    </div>
    <div class='section'>
        <h2>Networks</h2>
        <hr>
        <div class="cards">
            <cardImg title="Node Link 3D" img="/anu/assets/example-images/nodeLink3D.png" link="/anu/examples/node_link_3d"></cardImg>
        </div>
    </div>
    <div class='section'>
        <h2>Animation</h2>
        <hr>
        <div class="cards">
            <cardImg title="Basic Animation" img="/anu/assets/example-images/animationBarChart.png" link="/anu/examples/animation_bar_chart"></cardImg>
            <cardImg title="Data Dimension Change" img="/anu/assets/example-images/animationScatterPlot.png" link="/anu/examples/animation_scatter_plot"></cardImg>
            <cardImg title="Bar Chart Race" img="/anu/assets/example-images/animationBarChartRace.png" link="/anu/examples/animation_bar_chart_race"></cardImg>
        </div>
    </div>
    <div class='section'>
        <h2>Advanced</h2>
        <hr>
        <div class="cards">
            <cardImg title="Tilt Map" img="/anu/assets/example-images/tiltMap.png" link="/anu/examples/tilt_map"></cardImg>
        </div>
    </div>

</div>

</multiView>


<style>
h1,
h2,
h3,
h4 {
    margin: 0.1rem 0;
}

h1 {
    font-size: 2rem;
}

h2 {
    font-size: 1.5rem;
    padding-left: 20px;
}

h3 {
    font-size: 1.2rem;
    padding-left: 40px;
}

h4 {
    font-size: 1rem;
    font-style: italic;
    padding-left: 60px;
}

.container {
    margin-top: 5vh;
    margin-left: 10vw;
    margin-right: 10vw;

}

.section {
    margin-top: 30px;
}

 .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    flex-direction: row;
    margin-top: 10px;
  }
  .cards canvas {
    margin: 5px;
    border: 1px solid #000;
    box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.3);
    width: 10em;
    height: 10em;
  }

 .cards img {
    margin: 5px;
    border: 1px solid #000;
    box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.3);
    width: 10em;
    height: 10em;
  }

  .cards span {
    font-size: 1em;
  }


</style>
