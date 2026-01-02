/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  List, Sidebar, Typography, useTheme,
} from '@seolim/designsystem';
import {useRouter} from 'next/router';

type SidebarItem = {
  title: string;
  link: string;
};
type Props = {
  items: SidebarItem[];
  selectedItemIndex?: number;
};
const UiSidebar: React.FC<Props> = ({ items, selectedItemIndex }) => {
  const router = useRouter();
  const { theme } = useTheme();
  const onClick = (link: string) => {
    router.push(link);
  };

  return (
    <Sidebar variant="alwaysOpen" position="left" style={{position: 'relative'}}>
      <div
        className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <List selected selectedIndex={selectedItemIndex}>
          {[
            <Typography element="p" key="header" onClick={() => onClick('/seolim-ui')} color={selectedItemIndex === 0 ? theme.color.primary.main : 'inherit'}>
              SEOLIM UI(Get Started)
            </Typography>,
            ...items.map((item, i) => (
              <Typography element="p" key={item.link} onClick={() => onClick(item.link)} color={(selectedItemIndex || 0) === i + 1 ? theme.color.primary.main : 'inherit'}>
                {item.title}
              </Typography>
            )),
          ]}
        </List>
      </div>
    </Sidebar>
  );
};

export default UiSidebar;
