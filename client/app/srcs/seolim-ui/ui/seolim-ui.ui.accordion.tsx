import React from 'react';
import { Accordion } from '@seolim/designsystem';
import {
  Description, UiBox, HeadBox, Title,
  PropsTable,
} from '../component';

const UiAccordion: React.FC = () => (
  <div className="space-y-6">
    <HeadBox>
      <Title text="Accordion" />
      <Description text="Expandable content sections that organize information in a compact way." />
    </HeadBox>

    <div className="space-y-4">
      <Title text="Props" />
      <PropsTable
        datas={[
          { name: 'titles', type: 'React.ReactNode[]', description: 'Array of titles for each accordion section.' },
          { name: 'children', type: 'React.ReactNode', description: 'Content to display in the accordion sections.' },
          { name: 'color', type: 'string', description: 'The background color of the accordion.' },
          { name: 'selectColor', type: 'string', description: 'The color when an item is selected.' },
          { name: 'size', type: 'sm | md | lg', description: 'The size of the accordion.' },
          { name: 'variant', type: 'alwaysOpen | singleOpen', description: 'Behavior when opening/closing sections.' },
          { name: 'titleVariant', type: 'normal | arrow | plus', description: 'The style of the title indicator.' },
          { name: 'outlineVariant', type: 'none | box | innerBox', description: 'The outline style of the accordion.' },
        ]}
      />
    </div>

    <UiBox>
      <Title text="VARIANTS" />
      <Description text="Accordion variants control opening behavior - alwaysOpen allows multiple sections, singleOpen allows only one." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Single Open (default):</p>
          <Accordion
            titles={['Section 1', 'Section 2', 'Section 3']}
            variant="singleOpen"
          >
            <div>Content for section 1</div>
            <div>Content for section 2</div>
            <div>Content for section 3</div>
          </Accordion>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Always Open:</p>
          <Accordion
            titles={['Section A', 'Section B', 'Section C']}
            variant="alwaysOpen"
          >
            <div>Content for section A</div>
            <div>Content for section B</div>
            <div>Content for section C</div>
          </Accordion>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="TITLE VARIANTS" />
      <Description text="Title variants change the indicator style for expanded/collapsed states." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Normal:</p>
          <Accordion
            titles={['Normal Title', 'Another Title']}
            titleVariant="normal"
          >
            <div>Content with normal title style</div>
            <div>More content here</div>
          </Accordion>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Arrow:</p>
          <Accordion
            titles={['Arrow Title', 'Another Title']}
            titleVariant="arrow"
          >
            <div>Content with arrow indicator</div>
            <div>More content here</div>
          </Accordion>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Plus:</p>
          <Accordion
            titles={['Plus Title', 'Another Title']}
            titleVariant="plus"
          >
            <div>Content with plus indicator</div>
            <div>More content here</div>
          </Accordion>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="SIZES" />
      <Description text="Accordion sizes affect the overall scale and padding of the component." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">Small:</p>
          <Accordion
            titles={['Small Size', 'Section 2']}
            size="sm"
          >
            <div>Content in small accordion</div>
            <div>More content</div>
          </Accordion>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Medium:</p>
          <Accordion
            titles={['Medium Size', 'Section 2']}
            size="md"
          >
            <div>Content in medium accordion</div>
            <div>More content</div>
          </Accordion>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Large:</p>
          <Accordion
            titles={['Large Size', 'Section 2']}
            size="lg"
          >
            <div>Content in large accordion</div>
            <div>More content</div>
          </Accordion>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="OUTLINE VARIANTS" />
      <Description text="Outline variants control the border and visual separation of accordion sections." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">None:</p>
          <Accordion
            titles={['No Outline', 'Section 2']}
            outlineVariant="none"
          >
            <div>Content without outline</div>
            <div>More content</div>
          </Accordion>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Box:</p>
          <Accordion
            titles={['Box Outline', 'Section 2']}
            outlineVariant="box"
          >
            <div>Content with box outline</div>
            <div>More content</div>
          </Accordion>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Inner Box:</p>
          <Accordion
            titles={['Inner Box', 'Section 2']}
            outlineVariant="innerBox"
          >
            <div>Content with inner box outline</div>
            <div>More content</div>
          </Accordion>
        </div>
      </div>
    </UiBox>

    <UiBox>
      <Title text="EXAMPLES" />
      <Description text="Common accordion use cases with different configurations." />
      <div className="space-y-6 mt-4">
        <div>
          <p className="text-sm text-gray-600 mb-2">FAQ Style:</p>
          <Accordion
            titles={[
              'What is this component?',
              'How do I use it?',
              'Can I customize it?',
            ]}
            variant="singleOpen"
            titleVariant="plus"
            outlineVariant="box"
          >
            <div>This is an accordion component that organizes content in expandable sections.</div>
            <div>Import it from @seolim/designsystem and provide titles and children props.</div>
            <div>Yes, you can customize colors, sizes, variants, and outline styles.</div>
          </Accordion>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">Settings Panel:</p>
          <Accordion
            titles={['General Settings', 'Advanced Options', 'Security']}
            variant="alwaysOpen"
            titleVariant="arrow"
            outlineVariant="innerBox"
            size="md"
          >
            <div className="space-y-2">
              <div>• Theme preference</div>
              <div>• Language selection</div>
              <div>• Auto-save settings</div>
            </div>
            <div className="space-y-2">
              <div>• Debug mode</div>
              <div>• Performance monitoring</div>
              <div>• Cache settings</div>
            </div>
            <div className="space-y-2">
              <div>• Two-factor authentication</div>
              <div>• Password requirements</div>
              <div>• Session timeout</div>
            </div>
          </Accordion>
        </div>
      </div>
    </UiBox>
  </div>
);

export default UiAccordion;
