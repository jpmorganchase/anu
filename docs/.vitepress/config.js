import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Anu",
  description: "Immersive Visualizations with Data Drive Babylon",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Get Started', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/modules.md' }
    ],

    sidebar: {
    
    "/guide/": [
      {
        text: 'Introduction',
        collapsed: false,
        items: [
          { text: 'What is Anu', link: '/guide/' },
          { text: 'Getting Started', link: '/guide/getting_started.md' },
          { text: 'Creating Meshes', link: '/guide/first_steps.md' },
          { text: 'Using Selections', link: '/guide/using_selections.md' },
          { text: 'Manipulating Selections', link: '/guide/manipulating_selections.md' },
          { text: 'Create a Visualization'}
        ]
      }
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
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
