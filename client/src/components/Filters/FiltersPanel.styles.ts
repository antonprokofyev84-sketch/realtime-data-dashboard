import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: ${COLORS.neutral.surface};
  border: 1px solid ${COLORS.neutral.border};
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const FiltersRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-end;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${COLORS.neutral.textMuted};
`;

const baseControlStyles = `
  height: 38px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid ${COLORS.neutral.border};
  font-size: 13px;
  outline: none;
  background-color: white;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${COLORS.info.border};
  }
`;

export const Input = styled.input`
  ${baseControlStyles}
  min-width: 260px;

  &::placeholder {
    color: ${COLORS.neutral.textMuted};
    opacity: 0.5;
  }
`;

export const Select = styled.select`
  ${baseControlStyles}
  min-width: 160px;
  cursor: pointer;
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 32px;
  background-color: ${COLORS.neutral.border};
  align-self: flex-end;
  margin-bottom: 4px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  height: 38px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  cursor: pointer;
  color: ${COLORS.neutral.textMain};

  input {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin: 0;
  }
`;
