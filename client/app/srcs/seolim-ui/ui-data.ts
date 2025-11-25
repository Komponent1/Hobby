export type UI = 'Input' | 'Button' | 'Typography';
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
  },
  order: [
    'Button',
    'Input',
    'Typography',
  ],
};
