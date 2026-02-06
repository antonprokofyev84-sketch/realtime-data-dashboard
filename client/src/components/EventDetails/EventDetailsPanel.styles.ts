import styled, { keyframes } from 'styled-components';
import { COLORS } from '../../constants/colors';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  z-index: 1000;
  animation: ${fadeIn} 0.25s ease-out forwards;

  &[data-state='closing'] {
    animation: ${fadeOut} 0.25s ease-in forwards;
  }
`;

export const DetailsOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  background: ${COLORS.neutral.surface};
  border-left: 1px solid ${COLORS.neutral.border};
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  z-index: 1001;

  animation: ${slideIn} 0.25s ease-out forwards;

  &[data-state='closing'] {
    animation: ${slideOut} 0.25s ease-in forwards;
  }
`;

export const DetailsHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${COLORS.neutral.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${COLORS.neutral.textMuted};
  line-height: 1;
  padding: 4px;

  &:hover {
    color: ${COLORS.neutral.textMain};
  }
`;

export const DetailsContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const Section = styled.div`
  margin-bottom: 24px;
`;

export const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${COLORS.neutral.textMuted};
  margin-bottom: 8px;
  letter-spacing: 0.05em;
`;

export const JsonContainer = styled.div`
  position: relative;
  background: #1e293b;
  border-radius: 6px;
  padding: 16px;
`;

export const JsonPre = styled.pre`
  margin: 0;
  color: #f8fafc;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &:active {
    background: ${COLORS.info.border};
  }
`;

export const DataGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 12px;
  font-size: 13px;
`;

export const DataKey = styled.span`
  color: ${COLORS.neutral.textMuted};
  font-weight: 600;
`;

export const DataValue = styled.span`
  color: ${COLORS.neutral.textMain};
  word-break: break-all;
  text-transform: capitalize;
`;

export const Message = styled.div`
  font-size: 15px;
  line-height: 1.5;
  font-weight: 500;
  color: ${COLORS.neutral.textMain};
`;
