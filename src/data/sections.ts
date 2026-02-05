// Section data with rich content support

// Content type definitions
export interface TextContent {
  type: 'text';
  paragraphs: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
  skills?: string[];
}

export interface FreelancingItem {
  client: string;
  project: string;
  period: string;
  description: string[];
  skills?: string[];
}

export interface FreelancingContent {
  type: 'freelancing';
  items: FreelancingItem[];
}

export interface ExperienceContent {
  type: 'experience';
  items: ExperienceItem[];
}


export interface ProjectItem {
  name: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface ProjectsContent {
  type: 'projects';
  items: ProjectItem[];
}

export interface ContactLink {
  label: string;
  href: string;
  icon?: 'email' | 'linkedin' | 'github' | 'website';
}

export interface ContactContent {
  type: 'contact';
  message: string[];
  links: ContactLink[];
}

export type SectionContent =
  | TextContent
  | ExperienceContent
  | FreelancingContent
  | ProjectsContent
  | ContactContent;

export interface Section {
  id: number;
  title: string;
  summary?: string; // Brief description for mobile/previews
  content: SectionContent;
}

// About content for default/standby view
export const aboutContent = {
  blurb: 'Hey! I\'m Brandon, I\'m a NYC based frontend developer currently working at SwiftOtter in a Senior UI Engineer role. Previously, I was a Frontend Developer at Rightpoint (formerly Something Digital). Check out my experience, projects, and get in touch!',
  portraitUrl: '/headshot.jpg',
};

export const sections: Section[] = [
  {
    id: 1,
    title: 'Experience',
    content: {
      type: 'experience',
      items: [
        {
          company: 'SwiftOtter',
          role: 'Senior UI Engineer',
          period: 'November 2024 - Present',
          description: [
            'Joined SwiftOtter as a UI Engineer and was promoted to Senior UI Engineer within the first six months.',
            'Quickly gained a working knowledge of the BigCommerce platform and other modern frameworks and languages such as Next.js and TypeScript.',
            'Took on additional responsibilities including roles as technical lead or sole contributor on multiple projects.',
            'Cultivated skills in previously unfamiliar technologies such as animation, headless commerce, and DNS management.',
            'Collaborated closely with cross-functional teams to facilitate smooth project delivery and ensure high-quality outcomes for clients.'
          ],
          skills: [
            'Liquid',
            'React', 
            'TypeScript',
            'GraphQL', 
            'CSS', 
            'SCSS', 
            'BigCommerce', 
            'GraphCommerce', 
            'Next.js', 
            'Docker',
            'Vercel',
            'Headless',
           ],
        },
        {
          company: 'Something Digital / Rightpoint',
          role: 'Frontend Developer',
          period: 'January 2020 - September 2024',
          description: [
            'Joined Something Digital (acquired by Rightpoint in 2021) as a Frontend Developer specializing in eCommerce solutions for Magento / Adobe Commerce and Shopify Plus.',
            'Collaborated closely with cross-functional teams to deliver high-quality, performant, and user-friendly eCommerce websites for a diverse range of clients.',
            'Implemented responsive design principles to ensure optimal user experiences across various devices and screen sizes.',
            'Eventually took on additional responsibilities including mentoring junior developers, leading frontend initiatives, and working in client-facing roles as an ad-hoc technical lead.'
          ],
          skills: [
            'Magento / Adobe Commerce',
            'PHTML',
            'SCSS',
            'Shopify Plus',
            'Liquid'
          ],
        },
        {
          company: 'Local Muscle Movers',
          role: 'Digital Marketing Manager',
          period: 'May 2019 - January 2020',
          description: [
            'Spearheaded development and a complete website redesign for Local Muscle Movers.',
            'Spearheaded ground-up development and design of their partner franchise Mi-Box Maine website.',
            'Provided designs and worked closely with project stakeholders to determine functional needs.'
          ],
          skills: [
            'PHP',
            'Bootstrap',
            'HTML',
            'CSS',
            'JavaScript',
            'SEO',
          ],
        },
      ],
    },
  },
  {
    id: 2,
    title: 'Freelancing',
    content: {
      type: 'freelancing',
      items: [
        {
          client: 'Orchid Eighteen',
          project: 'Orchid Eighteen Site Build & Enhancements',
          period: '2026 / Ongoing',
          description: [
            'Custom theme development and site enhancements for Orchid Eighteen, a sister company to Orchid Eight.',
            'Implemented various custom features and style adjustments to improve user experience and align with brand guidelines.',
            'Implemented custom Collection-driven content and style overrides to provide individual collections with enhanced branding and layout options.',
            'Provided support in site development, launch, and configuration.'
          ],
          skills: ['Liquid', 'HTML', 'JavaScript', 'CSS', 'Shopify'],
        },
        {
          client: 'Alpha Zulu',
          project: 'Alpha Zulu Site Upgrades',
          period: '2025',
          description: [
            'Custom theme developments and site enhancements for Alpha Zulu, a corporate merchandise fulfillment company.',
            'Implemented customizations to the header and mini-cart to improve user experience and silo users based on their associated organizations.',
            'Provided miscellaneous consulting and development support tasks throughout the engagement period.',
          ],
          skills: ['Liquid', 'HTML', 'JavaScript', 'CSS', 'Shopify'],
        },
        {
          client: 'Orchid Eight',
          project: 'Orchid Eight Creator Collections',
          period: '2025 / Ongoing',
          description: [
            'Custom theme development and site enhancements for the Orchid Eight, a content creator merchandise fulfillment company.',
            'Implemented custom Collection-driven content and style overrides to provide individual collections with enhanced branding and layout options.',
            'Provided ongoing support and feature development for Orchid Eight\'s Creator Shop.',
          ],
          skills: ['Liquid', 'HTML', 'JavaScript', 'CSS', 'Shopify'],
        },
      ],
    },
  },
  {
    id: 3,
    title: 'Projects',
    content: {
      type: 'projects',
      items: [
        {
          name: 'Personal Portfolio',
          description: 'This site - a JWST-inspired portfolio featuring hexagonal navigation, terminal aesthetics, and smooth scroll-driven animations.',
          tech: ['React', 'TypeScript', 'D3.js', 'CSS'],
        },
        {
          name: 'Goodreads Clone',
          description: 'A work in progress aimed at reimagining the Goodreads experience with a cleaner interface and improved book discovery features.',
          tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
        },
        {
          name: 'Mars Weather',
          description: 'A fun UI creation and styling project that pulls weather data from NASA APIs to display atmospheric conditions on the red planet.',
          tech: ['React', 'NASA API', 'CSS'],
        },
        {
          name: 'Project Babel',
          description: 'A work in progress combining linguistics and development - an interactive tool for exploring language patterns and etymology.',
          tech: ['React', 'TypeScript', 'Linguistics'],
        },
      ],
    },
  },
  {
    id: 4,
    title: 'Contact',
    content: {
      type: 'contact',
      message: [
        'I\'m always interested in hearing about new opportunities and collaborations. Feel free to reach out!',
        'If we happen to not be a good fit, I\'m happy to refer you to some fine folks in my network.'
      ],
      links: [
        { label: 'Email', href: 'mailto:brandonsabino.dev@gmail.com', icon: 'email' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/brandon-sabino', icon: 'linkedin' },
        { label: 'GitHub', href: 'https://github.com/brandonsabino', icon: 'github' },
      ],
    },
  },
  {
    id: 5,
    title: 'About',
    content: {
      type: 'text',
      paragraphs: [
        'Ever since I was a little boy, I dreamed of providing robust, accessible, and performant e-commerce experiences.',
        'Now, thanks to a heap of student loan payments, I get to do just that as a fairly competent frontend developer!',
        '',
        '',
        'I\'d be surprised if anyone read this :)',
        '',
        '',
        '',
        'You\'re still here?',
        'It\'s over, go home. 👋🏻',
      ],
    },
  },
];

export default sections;
