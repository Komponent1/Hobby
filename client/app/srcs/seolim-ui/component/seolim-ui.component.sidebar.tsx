/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { List } from '@seolim/designsystem';
import {useRouter} from 'next/router';

type SidebarItem = {
  title: string;
  link: string;
};
type Props = {
  items: SidebarItem[];
  selectedItemIndex?: number;
};
const Sidebar: React.FC<Props> = ({ items, selectedItemIndex }) => {
  const router = useRouter();
  const onClick = (link: string) => {
    router.push(link);
  };

  return (
    <div style={{
      width: '250px', padding: '20px',
    }}
    >
      <h2>Sidebar</h2>
      <List selected selectedIndex={selectedItemIndex}>
        {items.map((item) => (
          <div key={item.link} onClick={() => onClick(item.link)}>
            {item.title}
          </div>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
