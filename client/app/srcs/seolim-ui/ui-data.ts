export type UI = 'Input' | 'Button' | 'Typography' | 'Badge' | 'Accordion' | 'Avatar' | 'Checkbox' | 'Switch' | 'Alert' | 'Progress' | 'Pagination' | 'Spinner' | 'Tooltip' | 'List' | 'Table' | 'Tab' | 'Carousel' | 'Navbar' | 'Card' | 'Skeleton' | 'Modal' | 'Snackbar' | 'ContextMenu' | 'Divider';
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
    Alert: {
      name: 'Alert',
      link: '/seolim-ui/alert',
    },
    Progress: {
      name: 'Progress',
      link: '/seolim-ui/progress',
    },
    Pagination: {
      name: 'Pagination',
      link: '/seolim-ui/pagination',
    },
    Spinner: {
      name: 'Spinner',
      link: '/seolim-ui/spinner',
    },
    Tooltip: {
      name: 'Tooltip',
      link: '/seolim-ui/tooltip',
    },
    List: {
      name: 'List',
      link: '/seolim-ui/list',
    },
    Table: {
      name: 'Table',
      link: '/seolim-ui/table',
    },
    Tab: {
      name: 'Tab',
      link: '/seolim-ui/tab',
    },
    Carousel: {
      name: 'Carousel',
      link: '/seolim-ui/carousel',
    },
    Navbar: {
      name: 'Navbar',
      link: '/seolim-ui/navbar',
    },
    Card: {
      name: 'Card',
      link: '/seolim-ui/card',
    },
    Skeleton: {
      name: 'Skeleton',
      link: '/seolim-ui/skeleton',
    },
    Modal: {
      name: 'Modal',
      link: '/seolim-ui/modal',
    },
    Snackbar: {
      name: 'Snackbar',
      link: '/seolim-ui/snackbar',
    },
    ContextMenu: {
      name: 'ContextMenu',
      link: '/seolim-ui/context-menu',
    },
    Divider: {
      name: 'Divider',
      link: '/seolim-ui/divider',
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
    'Alert',
    'Progress',
    'Pagination',
    'Spinner',
    'Tooltip',
    'List',
    'Table',
    'Tab',
    'Carousel',
    'Navbar',
    'Card',
    'Skeleton',
    'Modal',
    'Snackbar',
    'ContextMenu',
    'Divider',
  ],
};
