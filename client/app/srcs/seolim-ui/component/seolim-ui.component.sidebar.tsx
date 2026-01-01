/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { List, Sidebar, Typography } from '@seolim/designsystem';
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
  const onClick = (link: string) => {
    router.push(link);
  };

  return (
    <Sidebar variant="alwaysOpen" position="left" style={{position: 'relative'}}>
      <div className="fixed h-screen overflow-y-scroll">
        <Typography size="lg" weight="bold" onClick={() => onClick('/seolim-ui')} style={{cursor: 'pointer'}}>Sidebar</Typography>
        <List selected selectedIndex={selectedItemIndex}>
          {items.map((item) => (
            <Typography element="p" key={item.link} onClick={() => onClick(item.link)}>
              {item.title}
            </Typography>
          ))}
        </List>
      </div>
    </Sidebar>
  );
};

export default UiSidebar;
