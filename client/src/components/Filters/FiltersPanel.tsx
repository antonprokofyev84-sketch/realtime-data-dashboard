import { useDeferredValue, useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
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
import { useEventsStore } from '../../store/useEventsStore';

export function FiltersPanel() {
  const sources = useEventsStore(useShallow((state) => Array.from(state.sources)));
  const messageQuery = useEventsStore((state) => state.messageQuery);
  const selectedSource = useEventsStore((state) => state.selectedSource);
  const selectedTypes = useEventsStore((state) => state.selectedTypes);

  const setMessageQuery = useEventsStore((state) => state.setMessageQuery);
  const setSelectedSource = useEventsStore((state) => state.setSelectedSource);
  const toggleEventType = useEventsStore((state) => state.toggleEventType);

  const [inputValue, setInputValue] = useState(messageQuery);
  const deferredQuery = useDeferredValue(inputValue);

  useEffect(() => {
    if (deferredQuery !== messageQuery) {
      setMessageQuery(deferredQuery);
    }
  }, [deferredQuery, messageQuery, setMessageQuery]);

  return (
    <FiltersContainer>
      <FiltersRow>
        <FilterGroup>
          <FilterLabel>Search</FilterLabel>
          <Input
            placeholder="Search messages or sources..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Source</FilterLabel>
          <Select
            value={selectedSource || 'all'}
            onChange={(e) => setSelectedSource(e.target.value === 'all' ? null : e.target.value)}
          >
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
                <input
                  type="checkbox"
                  checked={selectedTypes.has(type)}
                  onChange={() => toggleEventType(type)}
                />
                <span style={{ textTransform: 'capitalize' }}>{type}</span>
              </CheckboxLabel>
            ))}
          </CheckboxGroup>
        </FilterGroup>
      </FiltersRow>
    </FiltersContainer>
  );
}
