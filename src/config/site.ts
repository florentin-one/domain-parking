export type HomeItem = {
  label: string;
  href?: string;
  linkLabel?: string;
  external?: boolean;
  prefix?: string;
};

export type HomeSection = {
  title: string;
  items?: HomeItem[];
  volumes?: {
    include?: number[];
    exclude?: number[];
    sort?: "asc" | "desc";
    showEmpty?: boolean;
  };
};

export type SiteConfig = {
  name: string;
  description: string;
  homeAsciiArt: string;
  homeSections: HomeSection[];
};

export const siteConfig: SiteConfig = {
  name: "Florentin One",
  description: "Systems that amplify people, not replace them",
  homeAsciiArt: `
  ███████╗██╗      ██████╗ ██████╗ ███████╗███╗   ██╗████████╗██╗███╗   ██╗
  ██╔════╝██║     ██╔═══██╗██╔══██╗██╔════╝████╗  ██║╚══██╔══╝██║████╗  ██║
  █████╗  ██║     ██║   ██║██████╔╝█████╗  ██╔██╗ ██║   ██║   ██║██╔██╗ ██║
  ██╔══╝  ██║     ██║   ██║██╔══██╗██╔══╝  ██║╚██╗██║   ██║   ██║██║╚██╗██║
  ██║     ███████╗╚██████╔╝██║  ██║███████╗██║ ╚████║   ██║   ██║██║ ╚████║
  ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝
   ██████╗ ███╗   ██╗███████╗
  ██╔═══██╗████╗  ██║██╔════╝
  ██║   ██║██╔██╗ ██║█████╗
  ██║   ██║██║╚██╗██║██╔══╝
  ╚██████╔╝██║ ╚████║███████╗
   ╚═════╝ ╚═╝  ╚═══╝╚══════╝`,
  homeSections: [
    {
      title: "About",
      items: [
        {
          label: "Building systems that amplify people, not replace them"
        },
        {
          label: "Augmentation over automation. Problem-first approach. Reducing cognitive load."
        },
        {
          label:
            "Strategy consulting, LLMs, and Model Context Protocol development — combined into human-centered systems"
        }
      ]
    },
    {
      title: "Domain Status",
      items: [
        {
          label: "This domain is parked and awaiting content"
        },
        {
          label: "Part of the Florentin One ecosystem"
        }
      ]
    },
    {
      title: "Resources",
      items: [
        {
          label: "GitHub",
          href: "https://github.com/florentin-one",
          external: true,
          prefix: "~"
        },
        {
          label: "MCP Repository",
          href: "https://github.com/florentin-one/mcp",
          external: true,
          prefix: "~"
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/heyflorentin/",
          external: true,
          prefix: "~"
        },
        {
          label: "WeMake Ethics",
          href: "https://wemake.cx/legal/ethics/",
          external: true,
          prefix: "~"
        }
      ]
    },
    {
      title: "Credits",
      items: [
        {
          label: "Developed by Florentin Sakwiset"
        },
        {
          label: "WeMake",
          href: "https://wemake.cx",
          external: true
        },
        {
          label: "Built in coherence with EU AI Act and WeMake ethics guidelines"
        }
      ]
    }
  ]
};
