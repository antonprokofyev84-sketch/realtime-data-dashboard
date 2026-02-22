import styled from 'styled-components';
import { COLORS } from '../../constants/colors';

export const FormCard = styled.div`
  background: ${COLORS.neutral.surface};
  border: 1px solid ${COLORS.neutral.border};
  border-radius: 8px;
  padding: 24px;
  max-width: 600px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h1`
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${COLORS.neutral.textMain};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${COLORS.neutral.textMuted};
  letter-spacing: 0.05em;
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid ${COLORS.neutral.border};
  font-size: 14px;
  outline: none;
  background-color: ${COLORS.neutral.surface};
  color: ${COLORS.neutral.textMain};
  transition: all 0.2s;

  &:focus {
    border-color: ${COLORS.info.border};
    box-shadow: 0 0 0 3px ${COLORS.info.bg};
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: ${COLORS.neutral.textMuted};
    opacity: 0.6;
  }
`;

export const Select = styled.select`
  height: 40px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid ${COLORS.neutral.border};
  font-size: 14px;
  outline: none;
  background-color: ${COLORS.neutral.surface};
  color: ${COLORS.neutral.textMain};
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    border-color: ${COLORS.info.border};
    box-shadow: 0 0 0 3px ${COLORS.info.bg};
  }

  option {
    color: ${COLORS.neutral.textMain};
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${COLORS.neutral.textMain};

  input[type='radio'],
  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: ${COLORS.info.border};
  }

  &:hover span {
    color: ${COLORS.info.border};
  }
`;

export const CheckboxLabel = styled(RadioLabel)``;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${COLORS.error.border};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '⚠';
    font-size: 14px;
  }
`;

export const SuccessMessage = styled.div`
  background: ${COLORS.info.bg};
  border: 1px solid ${COLORS.info.border};
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.info.text};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FieldArrayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Button = styled.button<{ type?: string }>`
  height: 40px;
  padding: 0 20px;
  border-radius: 6px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  color: white;
  background: ${COLORS.info.border};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${COLORS.info.accent};
    box-shadow: 0 2px 8px rgba(96, 165, 250, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AddButton = styled(Button)`
  background: ${COLORS.info.border};
  align-self: flex-start;
`;

export const RemoveButton = styled(Button)`
  background: ${COLORS.error.border};
  padding: 0 12px;
  min-width: 80px;

  &:hover:not(:disabled) {
    background: ${COLORS.error.accent};
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  }
`;
