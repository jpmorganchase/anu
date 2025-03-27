import { defineConfig } from 'vitepress';
import dsv from '@rollup/plugin-dsv'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  head: [['link', { rel: 'icon', href: '/assets/favicon-32x32.png' }]],
  base: '/anu/',
  title: "Anu",
  description: "Immersive Visualizations with Data Drive Babylon",
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
              { text: 'Transitions', link: '/guide/deeper_topics/transitions.md'}
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
      // {
      //   text: 'Prefabs',
      //   collapsed: true,
      //   items: [
      //     { text: 'WIP', link: '' }
      //   ]
      // },
      // {
      //   text: 'Interactions',
      //   collapsed: true,
      //   items: [
      //     { text: 'WIP', link: '' }
      //   ]
      // },
      // {
      //   text: 'Advanced Topics',
      //   collapsed: true,
      //   items: [
      //     { text: 'WIP', link: '' }
      //   ]
      // },
      {
        text: 'Contributing',
        collapsed: true,
        items: [
          { text: 'WIP', link: '' }
        ]
      },

    ],
    "/examples/": [
      {
        text: 'The Classics',
        collapsed: false,
        items: [
          { text: '3D Scatter Plot', link: './scatter_plot_3D' },
          { text: '3D Bar Chart', link: './bar_chart_3D' },
          { text: '3D Line Chart', link: './line_chart_3D' },
          { text: '2D Scatter Plot', link: './scatter_plot_2D' },
          { text: '2D Bar Chart', link: './bar_chart_2D' },
          { text: '2D Line Chart', link: './line_chart_2D' },
        ]
      },
      {
        text: 'Geographic',
        collapsed: false,
        items: [
          { text: 'Texture Map', link: './texture_map' },
          { text: 'Texture Globe', link: './texture_globe' },
          { text: 'Mesh Map', link: './mesh_map' },
          { text: '3D Trajectory on Map', link: './trajectory_3D' },
          { text: 'Origin-Destination Globe', link: './origin_destination_globe' }
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
          { text: 'Layouts', link: './layout' },
        ]
      },
      {
        text: 'Brushing and Linking',
        collapsed: false,
        items: [
          { text: 'Single Selection', link: './brushing_linking_single' },
          { text: 'Multiple Selection', link: './brushing_linking_multiple' }
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
        text: 'Animation',
        collapsed: false,
        items: [
          { text: 'Basic Animation', link: './animation_bar_chart' },
          { text: 'Data Dimension Change', link: './animation_scatter_plot' },
          { text: 'Bar Chart Race', link: './animation_bar_chart_race' },
        ]
      },
      {
        text: 'Advanced',
        collapsed: false,
        items: [
          { text: 'Thin Instance Interactions', link: './thin_instances' },
          { text: 'Baseball Pitches', link: './pitches' },
          { text: 'Linked Scatter Plots', link: './linked_scatter_plots' },
          { text: 'Tilt Map', link: './tilt_map' },
          { text: 'ImAxes Simplified', link: './imaxes_simplified'}
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
