import {
  FiltersContainer,
  FiltersRow,
  FilterGroup,
  FilterLabel,
  Input,
  Select,
  CheckboxGroup,
  CheckboxLabel,
  VerticalDivider,
} from './FiltersPanel.styles';
import { EVENT_TYPES } from '../../constants/events';

type FiltersPanelProps = {
  sources: string[];
};

export function FiltersPanel({ sources }: FiltersPanelProps) {
  return (
    <FiltersContainer>
      <FiltersRow>
        <FilterGroup>
          <FilterLabel>Search</FilterLabel>
          <Input placeholder="Search messages or sources..." />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Source</FilterLabel>
          <Select>
            <option value="all">All Sources</option>
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <VerticalDivider />

        <FilterGroup>
          <FilterLabel>Event Types</FilterLabel>
          <CheckboxGroup>
            {EVENT_TYPES.map((type) => (
              <CheckboxLabel key={type}>
                <input type="checkbox" defaultChecked />
                <span style={{ textTransform: 'capitalize' }}>{type}</span>
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterGroup>
      </FiltersRow>
    </FiltersContainer>
  );
}
