import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

export const ControlPanelContainer = styled.div`
  background: ${COLORS.neutral.surface};
  border: 1px solid ${COLORS.neutral.border};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const ControlRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
  flex-wrap: wrap;
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${COLORS.neutral.textMuted};
  letter-spacing: 0.05em;
`;

export const Input = styled.input`
  height: 36px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid ${COLORS.neutral.border};
  font-size: 13px;
  outline: none;
  background-color: ${COLORS.neutral.surface};
  color: ${COLORS.neutral.textMain};
  transition: border-color 0.2s;

  &:focus {
    border-color: ${COLORS.info.border};
  }

  &::placeholder {
    color: ${COLORS.neutral.textMuted};
    opacity: 0.5;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'danger' }>`
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) => {
    if (props.$variant === 'danger') {
      return `
        background: ${COLORS.error.border};
        color: white;

        &:hover {
          background: ${COLORS.error.accent};
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        }

        &:active {
          transform: scale(0.98);
        }
      `;
    }

    return `
      background: ${COLORS.info.border};
      color: white;

      &:hover {
        background: ${COLORS.info.accent};
        box-shadow: 0 2px 8px rgba(96, 165, 250, 0.3);
      }

      &:active {
        transform: scale(0.98);
      }
    `;
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
