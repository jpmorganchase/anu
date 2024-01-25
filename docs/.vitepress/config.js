import { defineConfig } from 'vitepress';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/anu/',
  title: "Anu",
  description: "Immersive Visualizations with Data Drive Babylon",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/modules.md' },
      //{ text: 'Sandbox', link: '/sandbox/'}
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
            ]
          },
            { text: 'Creating Visualizations',
            collapsed: false,
            items: [
              { text: '3D Scatter Plot', link: '/guide/first_visualization.md'}
            ]
          },
          { text: 'Anu Prefabs',
            collapsed: false,
            items: [
            { text: 'Plane Text', link: '/guide/prefabs/planetext.md' },
            { text: 'Axes', link: '/guide/prefabs/axes.md' },
            { text: 'Color Scales', link: '/guide/prefabs/chromatic.md'},
            { text: 'Texture Maps', link: '/guide/prefabs/texturemaps.md'}
            //{ text: 'Texture Map', link: '/guide/manipulating_selections.md' },
            //{ text: 'Texture Globe', link: '/guide/manipulating_selections.md' },
            //{ text: 'Layout', link: '/guide/manipulating_selections.md' },
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
      {
        text: 'Advanced Topics',
        collapsed: true,
        items: [
          { text: 'WIP', link: '' }
        ]
      },
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
          { text: 'Texture Globe', link: './texture_globe' }
        ]
      }
    ]
  },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jpmorganchase/anu' }
    ]
  },
      vite: {
        // rollupOptions: {
        //   external: ["@babylonjs/core"],
        // }
        server: {
          headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin',
          },
        },
        plugins: [
          {configureServer(server) {
                  server.middlewares.use((_req, res, next) => {
                      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                      res.setHeader("Cross-Origin-Opener-Policy", "same-origin")
                      next();
                  });
           }
      }]
      }
})
