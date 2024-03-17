--- 
layout: page
---
<script setup>
    import card from './card.vue'
</script>

<div class='container'>
<h1>Example Gallery</h1>

<div class='section'>
    <h2>The Classics</h2>
<hr>
<div class="cards">

<card title="3D Scatter Plot" example="scatterplot3D" link="/anu/examples/scatter_plot_3D"></card>
  
<card title="3D Bar Chart" example="barchart3D" link="/anu/examples/bar_chart_3D"></card>

<card title="3D Line Chart" example="linechart3D" link="/anu/examples/line_chart_3D"></card>

<card title="2D Scatter Plot" example="scatterplot2D" link="/anu/examples/scatter_plot_2D"></card>

<card title="2D Bar Chart" example="barchart2D" link="/anu/examples/bar_chart_2D"></card>

<card title="2D Line Chart" example="linechart2D" link="/anu/examples/line_chart_2D"></card>
 
</div>
</div>

<div class='section'>
    <h2>Geographic</h2>
<hr>
<div class="cards">

<card title="Texture Map" example="textureMap" link="/anu/examples/texture_map"></card>

<card title="Texture Globe" example="textureGlobe" link="/anu/examples/texture_globe"></card>

<card title="Mesh Map" example="meshMap" link="/anu/examples/mesh_map"></card>
  
</div>
</div>

<div class='section'>
    <h2>Interaction and UI</h2>
<hr>
<div class="cards">

<card title="Pointer Hover" example="hover" link="/anu/examples/hover"></card>

<card title="Details On Demand" example="details" link="/anu/examples/details"></card>

<card title="Facet and Position" example="facetposition" link="/anu/examples/facet_position"></card>

<card title="Layouts" example="layout" link="/anu/examples/layout"></card>
  
</div>
</div>


<div class='section'>
    <h2>Networks</h2>
<hr>
<div class="cards">

<card title="Node Link 3D" example="nodelink3d" link="/anu/examples/node_link_3d"></card>
  
</div>
</div>

</div>

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
  .cards iframe {
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