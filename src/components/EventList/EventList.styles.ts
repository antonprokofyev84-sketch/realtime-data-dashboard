import styled, { keyframes, css } from 'styled-components';
import type { Event } from '../../types/Event';
import { COLORS } from '../../constants/colors';

export const ListContainer = styled.div`
  flex: 1;
  overflow: auto;
  width: 100%;
`;

export const VirtualizerInner = styled.div`
  position: relative;
  width: 100%;
`;

export const VirtualizerItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const highlightFade = keyframes`
  0% {
    background: var(--highlight-bg);
  }
  95% {
    background: var(--highlight-bg);
  }
  100% {
    background: ${COLORS.neutral.surface};
  }
`;

export const EventRowContainer = styled.div<{ $type: Event['type']; $isNew?: boolean }>`
  --highlight-bg: ${(props) => COLORS[props.$type].bg};
  --highlight-shadow: ${(props) => COLORS[props.$type].accent};

  background: ${COLORS.neutral.surface};
  border: 1px solid ${COLORS.neutral.border};
  border-left: 4px solid ${(props) => COLORS[props.$type].border};
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: border-color 0.2s;
  margin-bottom: 8px;

  ${(props) =>
    props.$isNew &&
    css`
      animation: ${highlightFade} 5s ease-out forwards;
    `}

  &:hover {
    border-color: ${(props) => COLORS[props.$type].border};
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const TypeBadge = styled.div<{ $type: Event['type'] }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${(props) => COLORS[props.$type].bg};
  color: ${(props) => COLORS[props.$type].text};
  font-size: 11px;
  font-weight: 700;
`;

export const Dot = styled.span<{ $type: Event['type'] }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${(props) => COLORS[props.$type].border};
`;

export const Time = styled.span`
  font-size: 11px;
  color: ${COLORS.neutral.textMuted};
`;

export const Message = styled.div`
  font-size: 14px;
  color: ${COLORS.neutral.textMain};
  margin-bottom: 8px;
`;

export const Footer = styled.div`
  display: flex;
  gap: 4px;
  padding-top: 8px;
  border-top: 1px solid ${COLORS.neutral.border};
`;

export const Label = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${COLORS.neutral.textMuted};
`;

export const SourceValue = styled.span`
  font-size: 11px;
  color: ${COLORS.neutral.textMain};
`;
