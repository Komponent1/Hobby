import React from 'react';
import { Badge, ContentBadge } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiBadge: React.FC = () => (
  <div className="space-y-8">
    <HeadBox>
      <Title text="Badge" />
      <Description text="Small status indicators and labels." />
    </HeadBox>

    {/* Badge Section */}
    <div className="space-y-6">
      <div className="space-y-4">
        <Title text="Badge" />
        <Description text="Simple text-based badges using the text prop." />
        <PropsTable
          datas={[
            { name: 'text', type: 'string', description: 'The text to display inside the badge.' },
            { name: 'variant', type: 'hard | soft | outlined', description: 'The visual style of the badge.' },
            { name: 'size', type: 'sm | md | lg', description: 'The size of the badge.' },
            { name: 'corner', type: 'rounded | square', description: 'The corner style of the badge.' },
            { name: 'color', type: 'string', description: 'The color of the badge.' },
          ]}
        />
      </div>

      <UiBox>
        <Title text="VARIANTS" />
        <Description text="Badge variants include Hard, Soft, and Outlined styles." />
        <div className="flex gap-3 mt-4 flex-wrap">
          <Badge text="Hard" variant="hard" />
          <Badge text="Soft" variant="soft" />
          <Badge text="Outlined" variant="outlined" />
        </div>
      </UiBox>

      <UiBox>
        <Title text="SIZES" />
        <Description text="Badge sizes range from small to large." />
        <div className="flex gap-3 mt-4 items-center flex-wrap">
          <Badge text="Small" size="sm" />
          <Badge text="Medium" size="md" />
          <Badge text="Large" size="lg" />
        </div>
      </UiBox>

      <UiBox>
        <Title text="CORNERS" />
        <Description text="Badge corner styles include Rounded and Square." />
        <div className="flex gap-3 mt-4 flex-wrap">
          <Badge text="Rounded" corner="rounded" />
          <Badge text="Square" corner="square" />
        </div>
      </UiBox>

      <UiBox>
        <Title text="EXAMPLES" />
        <Description text="Common badge use cases and examples." />
        <div className="space-y-4 mt-4">
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-gray-600">Status:</span>
            <Badge text="Active" variant="soft" size="sm" />
            <Badge text="Pending" variant="outlined" size="sm" />
            <Badge text="Inactive" variant="hard" size="sm" />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-gray-600">Priority:</span>
            <Badge text="High" variant="hard" size="sm" />
            <Badge text="Medium" variant="soft" size="sm" />
            <Badge text="Low" variant="outlined" size="sm" />
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-gray-600">Categories:</span>
            <Badge text="React" variant="soft" size="sm" />
            <Badge text="TypeScript" variant="soft" size="sm" />
            <Badge text="UI" variant="soft" size="sm" />
          </div>
        </div>
      </UiBox>
    </div>

    {/* ContentBadge Section */}
    <div className="space-y-6 border-t pt-8">
      <div className="space-y-4">
        <Title text="ContentBadge" />
        <Description text="Advanced badges that accept React.ReactNode children for complex content." />
        <PropsTable
          datas={[
            { name: 'children', type: 'React.ReactNode', description: 'The content to display inside the badge.' },
            { name: 'variant', type: 'hard | soft | outlined', description: 'The visual style of the badge.' },
            { name: 'size', type: 'sm | md | lg', description: 'The size of the badge.' },
            { name: 'corner', type: 'rounded | square', description: 'The corner style of the badge.' },
            { name: 'color', type: 'string', description: 'The color of the badge.' },
          ]}
        />
      </div>

      <UiBox>
        <Title text="WITH ICONS" />
        <Description text="ContentBadge with status indicators and icons." />
        <div className="flex gap-3 mt-4 flex-wrap">
          <ContentBadge variant="soft">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Active
            </span>
          </ContentBadge>
          <ContentBadge variant="outlined">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Error
            </span>
          </ContentBadge>
          <ContentBadge variant="hard">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-500 rounded-full" />
              Warning
            </span>
          </ContentBadge>
        </div>
      </UiBox>

      <UiBox>
        <Title text="COMPLEX CONTENT" />
        <Description text="ContentBadge with various content types." />
        <div className="flex gap-3 mt-4 flex-wrap">
          <ContentBadge variant="hard">
            <span className="font-bold">NEW</span>
          </ContentBadge>
          <ContentBadge variant="soft">
            <span className="flex items-center gap-1">
              <span>🔥</span>
              Hot
            </span>
          </ContentBadge>
          <ContentBadge variant="outlined">
            <span className="flex flex-col text-center">
              <span className="text-xs">Count</span>
              <span className="font-bold">42</span>
            </span>
          </ContentBadge>
        </div>
      </UiBox>
    </div>
  </div>
);

export default UiBadge;
