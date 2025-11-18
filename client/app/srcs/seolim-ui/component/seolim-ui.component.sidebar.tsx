import Link from 'next/link';
import React from 'react';

type SidebarItem = {
  title: string;
  link: string;
};
type Props = {
  items: SidebarItem[];
  selectedItemIndex?: number;
};
const Sidebar: React.FC<Props> = ({ items, selectedItemIndex }) => (
  <div style={{
    width: '250px', backgroundColor: '#f4f4f4', height: '100vh', padding: '20px',
  }}
  >
    <h2>Sidebar</h2>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <li
          key={item.link}
          style={{
            color: index === selectedItemIndex ? 'blue' : 'black',
            fontWeight: index === selectedItemIndex ? 'bold' : 'normal',
          }}
        >
          <Link href={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
