export type UI = 'Input' | 'Button' | 'Typography' | 'Badge' | 'Accordion' | 'Avatar' | 'Checkbox' | 'Switch';
export type UIItem = {
  name: string;
  link: string;
};
type UIData = {
  data: Record<UI, UIItem>;
  order: UI[];
};
export const uiData: UIData = {
  data: {
    Input: {
      name: 'Input',
      link: '/seolim-ui/input',
    },
    Button: {
      name: 'Button',
      link: '/seolim-ui/button',
    },
    Typography: {
      name: 'Typography',
      link: '/seolim-ui/typography',
    },
    Badge: {
      name: 'Badge',
      link: '/seolim-ui/badge',
    },
    Accordion: {
      name: 'Accordion',
      link: '/seolim-ui/accordion',
    },
    Avatar: {
      name: 'Avatar',
      link: '/seolim-ui/avatar',
    },
    Checkbox: {
      name: 'Checkbox',
      link: '/seolim-ui/checkbox',
    },
    Switch: {
      name: 'Switch',
      link: '/seolim-ui/switch',
    },
  },
  order: [
    'Button',
    'Input',
    'Typography',
    'Badge',
    'Accordion',
    'Avatar',
    'Checkbox',
    'Switch',
  ],
};
