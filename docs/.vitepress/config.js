import { defineConfig } from 'vitepress';
import dsv from '@rollup/plugin-dsv'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  head: [['link', { rel: 'icon', href: './assets/favicon.svg' }]],
  base: '/anu/',
  title: "Anu",
  description: "Immersive Visualizations with Data Driven Babylon",
  themeConfig: {
    logo: '/assets/anu.svg',
    editLink: {
      pattern: 'https://github.com/jpmorganchase/anu/tree/main/docs/:path'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/modules.md' },
      { text: 'Tutorial', link: '/tutorial/index.html', target:"_self"}
    ],

    sidebar: {

    "/guide/": [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is Anu', link: '/guide/' },
          { text: 'Getting Started', link: '/guide/getting_started.md' },
        ]
      },
      {
        text: 'Learning Anu',
        collapsed: false,
        items: [
          { text: 'Anu Fundamentals',
            collapsed: false,
            items: [
            { text: 'Creating Meshes', link: '/guide/first_steps.md' },
            { text: 'Using Selections', link: '/guide/using_selections.md' },
            { text: 'Manipulating Selections', link: '/guide/manipulating_selections.md' },
            { text: '3D Scatter Plot', link: '/guide/first_visualization.md'}
            ]
          },
            { text: 'Deeper Topics',
            collapsed: false,
            items: [
              { text: 'Mesh, Clones, Instances', link: '/guide/deeper_topics/mesh_clone_instance.md'}, 
              { text: 'Transitions', link: '/guide/deeper_topics/transitions.md'},
              { text: 'Interactions', link: '/guide/deeper_topics/interactions.md'}, 
            ]
          },
          { text: 'Anu Prefabs',
            collapsed: false,
            items: [
            { text: 'Plane Text', link: '/guide/prefabs/planetext.md' },
            { text: 'Axes', link: '/guide/prefabs/axes.md' },
            { text: 'Color Scales', link: '/guide/prefabs/chromatic.md'},
            { text: 'Texture Maps', link: '/guide/prefabs/texturemaps.md'},
            { text: 'Mesh Map', link: '/guide/prefabs/meshmap.md'},
            { text: 'Transform Widget UI', link: "/guide/prefabs/transformwidgetui.md"},
            { text: 'Brush', link: '/guide/prefabs/brush.md' },
            { text: 'Layout', link: '/guide/prefabs/layout.md' },
            ]
          },

        ]
      },
      {
        text: 'Contributing',
        collapsed: true,
        items: [
          { text: 'Contributing', link: '/guide/contributing/contributing.md' },
          { text: 'Maintaining', link: '/guide/contributing/maintaining.md' }
        ]
      },

    ],
    "/examples/": [
      {
        text: 'Points',
        collapsed: false,
        items: [
          { text: '2D Scatter Plot', link: './scatter_plot_2D' },
          { text: '3D Scatter Plot', link: './scatter_plot_3D' },
          { text: 'Embellished Chart', link: './embellished_chart' },
          { text: 'Dimensionality Reduction Plot', link: './dimensionality_reduction_plot' },
        ]
      },
      {
        text: 'Bars',
        collapsed: false,
        items: [
          { text: '2D Bar Chart', link: './bar_chart_2D' },
          { text: '3D Bar Chart', link: './bar_chart_3D' },
          { text: 'Histogram', link: './histogram' },
          { text: 'Multiple Histograms', link: './histogram_multiple' }
        ]
      },
      {
        text: 'Lines',
        collapsed: false,
        items: [
          { text: '2D Line Chart', link: './line_chart_2D' },
          { text: 'Linked Scatter Plots', link: './linked_scatter_plots' },
          { text: 'Single 3D Trajectory', link: './trajectory_single_3D' },
          { text: 'Multiple 3D Trajectories', link: './trajectory_multiple_3D' }
        ]
      },
      {
        text: 'Areas and Surfaces',
        collapsed: false,
        items: [
          { text: '2D Area Chart', link: './area_chart_2D' },
          { text: '2D Stacked Area Chart', link: './area_chart_stacked' },
          { text: 'Pie Chart', link: './pie_chart' },
          { text: 'Surface Chart', link: './surface_chart' }
        ]
      },
      {
        text: 'Geographic',
        collapsed: false,
        items: [
          { text: 'Dot Density Map', link: './dot_density_map' },
          { text: 'Dot Density Globe', link: './dot_density_globe' },
          { text: 'Choropleth Map', link: './choropleth_map' },
          { text: 'Prism Map', link: './prism_map' },
          { text: '3D Trajectory on Map', link: './trajectory_map' },
          { text: 'Origin-Destination Globe', link: './origin_destination_globe' },
          { text: 'Tilt Map', link: './tilt_map' },
        ]
      },
      {
        text: 'Networks',
        collapsed: false,
        items: [
          { text: 'Node Link 3D', link: './node_link_3d' },
        ]
      },
      {
        text: 'Interactions and UI',
        collapsed: false,
        items: [
          { text: 'Pointer Hover', link: './hover' },
          { text: 'Details on Demand', link: './details' },
          { text: 'Transform Widget UI', link: './transform_widget_ui' },
          { text: 'Multiple Interactions', link: './multiple_interactions' },
          { text: 'Single Selection', link: './brushing_linking_single' },
          { text: 'Multiple Selection', link: './brushing_linking_multiple' },
          { text: 'Layouts', link: './layout' },
          { text: 'ImAxes Simplified', link: './imaxes_simplified'}
        ]
      },
      {
        text: 'Animation',
        collapsed: false,
        items: [
          { text: 'Basic Animation', link: './animation_bar_chart' },
          { text: 'Data Dimension Change', link: './animation_scatter_plot' },
          { text: 'Bar Chart Race', link: './animation_bar_chart_race' },
          { text: 'Baseball Pitches', link: './pitches' }
        ]
      }
    ]
  },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jpmorganchase/anu' }
    ]
  },
  vite: {
    // worker: {
    //   format: "es"
    // },
    rollupOptions: {
      external: ["@babylonjs/core", "@babylonjs/gui", "@babylonjs/loaders", "@babylonjs/inspector" ],
    },
    optimizeDeps: { // 👈 optimizedeps
      esbuildOptions: {
        target: "esnext", 
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        },
        supported: { 
          bigint: true 
        }, 
      },
      exclude: ['@babylonjs/havok']
    }, 
    // server: {
    //     // watch: {
    //     //     followSymlinks: false,
    //     // },
    //   // headers: {
    //   //   'Cross-Origin-Embedder-Policy': 'require-corp',
    //   //   'Cross-Origin-Opener-Policy': 'same-origin',
    //   // },
    // },
    plugins: [
        dsv(),
        dynamicImport(),
        {
          name: 'disable-vp-static-data-plugin',  //See: https://github.com/vuejs/vitepress/issues/4482
          configResolved(config) {
            // @ts-ignore
            config.plugins.splice(
              config.plugins.findIndex((p) => p.name === 'vitepress:data'),
              1
            );
          },
        },
      // {configureServer(server) {
      //         server.middlewares.use((_req, res, next) => {
      //             res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      //             res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
      //             next();
      //         });
      //}
    ]
  }
})
