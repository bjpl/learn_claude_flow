import React, { useState } from 'react';
import {
  Stack,
  VStack,
  HStack,
  Grid,
  Container,
  Text,
  Heading,
  Button,
  Card,
  Input,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
  List,
  ListItem,
  Menu,
  MenuItem,
  MenuDivider,
  Tooltip,
  Spinner,
  Avatar,
  AvatarGroup,
  Divider,
  Badge,
  Progress,
} from '../components/ui';

/**
 * Component Showcase - Demonstrates all UI components
 *
 * This file serves as both documentation and a visual test
 * for all components in the library.
 */
export const ComponentShowcase: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchValue, setSwitchValue] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <Container size="lg" padding>
      <VStack gap={12}>
        {/* Header */}
        <VStack gap={4}>
          <Heading level={1}>Component Library Showcase</Heading>
          <Text variant="bodyLarge" color="secondary">
            A comprehensive collection of reusable UI components built with design system tokens.
          </Text>
        </VStack>

        <Divider />

        {/* Layout Primitives */}
        <VStack gap={6}>
          <Heading level={2}>Layout Primitives</Heading>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Stack (Vertical & Horizontal)</Heading>
              <VStack gap={3}>
                <Text variant="label">Vertical Stack:</Text>
                <VStack gap={2}>
                  <Button>Item 1</Button>
                  <Button>Item 2</Button>
                  <Button>Item 3</Button>
                </VStack>
              </VStack>

              <VStack gap={3}>
                <Text variant="label">Horizontal Stack:</Text>
                <HStack gap={2}>
                  <Button>Item 1</Button>
                  <Button>Item 2</Button>
                  <Button>Item 3</Button>
                </HStack>
              </VStack>
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Grid</Heading>
              <Grid columns={3} gap={4}>
                <Card variant="outlined">Grid Item 1</Card>
                <Card variant="outlined">Grid Item 2</Card>
                <Card variant="outlined">Grid Item 3</Card>
                <Card variant="outlined">Grid Item 4</Card>
                <Card variant="outlined">Grid Item 5</Card>
                <Card variant="outlined">Grid Item 6</Card>
              </Grid>
            </VStack>
          </Card>
        </VStack>

        <Divider />

        {/* Typography */}
        <VStack gap={6}>
          <Heading level={2}>Typography</Heading>
          <Card>
            <VStack gap={4}>
              <Heading level={1}>Heading 1</Heading>
              <Heading level={2}>Heading 2</Heading>
              <Heading level={3}>Heading 3</Heading>
              <Heading level={4}>Heading 4</Heading>
              <Heading level={5}>Heading 5</Heading>
              <Heading level={6}>Heading 6</Heading>
              <Text variant="body">Body text - The quick brown fox jumps over the lazy dog.</Text>
              <Text variant="bodyLarge">Large body text for emphasis.</Text>
              <Text variant="bodySmall">Small body text for secondary information.</Text>
              <Text variant="label">LABEL TEXT</Text>
              <Text variant="caption">Caption text for fine print</Text>
            </VStack>
          </Card>
        </VStack>

        <Divider />

        {/* Form Components */}
        <VStack gap={6}>
          <Heading level={2}>Form Components</Heading>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Buttons</Heading>
              <HStack gap={3}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </HStack>
              <HStack gap={3}>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </HStack>
              <HStack gap={3}>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </HStack>
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Input Fields</Heading>
              <Input
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input type="email" placeholder="email@example.com" />
              <Input type="password" placeholder="Password" />
              <Input error helperText="This field has an error" />
              <Input disabled placeholder="Disabled input" />
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Select</Heading>
              <Select
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
                value={selectValue}
                onChange={setSelectValue}
                placeholder="Select an option"
              />
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Checkboxes</Heading>
              <Checkbox
                label="I agree to the terms and conditions"
                checked={checkboxValue}
                onChange={setCheckboxValue}
              />
              <Checkbox label="Disabled checkbox" disabled />
              <Checkbox label="Indeterminate" indeterminate />
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Radio Buttons</Heading>
              <RadioGroup label="Choose an option">
                <Radio
                  name="example"
                  value="option1"
                  label="Option 1"
                  checked={radioValue === 'option1'}
                  onChange={() => setRadioValue('option1')}
                />
                <Radio
                  name="example"
                  value="option2"
                  label="Option 2"
                  checked={radioValue === 'option2'}
                  onChange={() => setRadioValue('option2')}
                />
                <Radio
                  name="example"
                  value="option3"
                  label="Option 3"
                  checked={radioValue === 'option3'}
                  onChange={() => setRadioValue('option3')}
                />
              </RadioGroup>
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Switches</Heading>
              <Switch
                label="Enable notifications"
                checked={switchValue}
                onChange={setSwitchValue}
              />
              <Switch label="Disabled switch" disabled />
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Textarea</Heading>
              <Textarea
                placeholder="Enter your message..."
                rows={4}
                value={textareaValue}
                onChange={setTextareaValue}
                maxLength={200}
                showCount
              />
            </VStack>
          </Card>
        </VStack>

        <Divider />

        {/* Lists and Menus */}
        <VStack gap={6}>
          <Heading level={2}>Lists & Menus</Heading>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>List</Heading>
              <List divider>
                <ListItem leading={<Avatar initials="JD" size="sm" />}>John Doe</ListItem>
                <ListItem leading={<Avatar initials="JS" size="sm" />}>Jane Smith</ListItem>
                <ListItem leading={<Avatar initials="BD" size="sm" />}>Bob Davis</ListItem>
              </List>
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Menu</Heading>
              <Menu trigger={<Button>Open Menu</Button>}>
                <MenuItem onClick={() => console.log('Edit')}>Edit</MenuItem>
                <MenuItem onClick={() => console.log('Duplicate')}>Duplicate</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => console.log('Delete')} destructive>
                  Delete
                </MenuItem>
              </Menu>
            </VStack>
          </Card>
        </VStack>

        <Divider />

        {/* Feedback Components */}
        <VStack gap={6}>
          <Heading level={2}>Feedback & Status</Heading>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Badges</Heading>
              <HStack gap={3}>
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
              </HStack>
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Progress</Heading>
              <Progress value={30} />
              <Progress value={60} variant="success" />
              <Progress value={90} variant="warning" />
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Spinners</Heading>
              <HStack gap={4}>
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
              </HStack>
            </VStack>
          </Card>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Tooltips</Heading>
              <HStack gap={3}>
                <Tooltip content="Tooltip on top" placement="top">
                  <Button>Top</Button>
                </Tooltip>
                <Tooltip content="Tooltip on bottom" placement="bottom">
                  <Button>Bottom</Button>
                </Tooltip>
                <Tooltip content="Tooltip on left" placement="left">
                  <Button>Left</Button>
                </Tooltip>
                <Tooltip content="Tooltip on right" placement="right">
                  <Button>Right</Button>
                </Tooltip>
              </HStack>
            </VStack>
          </Card>
        </VStack>

        <Divider />

        {/* Avatars */}
        <VStack gap={6}>
          <Heading level={2}>Avatars</Heading>

          <Card>
            <VStack gap={4}>
              <Heading level={4}>Avatar Sizes</Heading>
              <HStack gap={3} align="center">
                <Avatar initials="XS" size="xs" />
                <Avatar initials="SM" size="sm" />
                <Avatar initials="MD" size="md" />
                <Avatar initials="LG" size="lg" />
                <Avatar initials="XL" size="xl" />
              </HStack>

              <Heading level={4}>Avatar with Status</Heading>
              <HStack gap={3}>
                <Avatar initials="JD" status="online" />
                <Avatar initials="JS" status="offline" />
                <Avatar initials="BD" status="away" />
                <Avatar initials="SW" status="busy" />
              </HStack>

              <Heading level={4}>Avatar Group</Heading>
              <AvatarGroup max={3}>
                <Avatar initials="JD" />
                <Avatar initials="JS" />
                <Avatar initials="BD" />
                <Avatar initials="SW" />
                <Avatar initials="MK" />
              </AvatarGroup>
            </VStack>
          </Card>
        </VStack>

        <Divider />

        {/* Dividers */}
        <VStack gap={6}>
          <Heading level={2}>Dividers</Heading>

          <Card>
            <VStack gap={4}>
              <Text>Content before divider</Text>
              <Divider />
              <Text>Content after divider</Text>
              <Divider label="OR" labelAlign="center" />
              <Text>Content with labeled divider</Text>
              <Divider label="Section Title" labelAlign="left" thickness={2} />
              <Text>Thick divider with left-aligned label</Text>
            </VStack>
          </Card>
        </VStack>
      </VStack>
    </Container>
  );
};

export default ComponentShowcase;
