import styled from 'styled-components';
import type { Event } from '../../types/Event';
import { COLORS } from '../../constants/colors';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: #f8fafc;
`;

export const EventRow = styled.div<{ $type: Event['type'] }>`
  background: ${COLORS.neutral.surface};
  border: 1px solid ${COLORS.neutral.border};
  border-left: 4px solid ${(props) => COLORS[props.$type].border};
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    border-color: ${(props) => COLORS[props.$type].border};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const TypeBadge = styled.div<{ $type: Event['type'] }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${(props) => COLORS[props.$type].bg};
  color: ${(props) => COLORS[props.$type].text};
  font-size: 12px;
  font-weight: 700;
`;

export const Dot = styled.span<{ $type: Event['type'] }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${(props) => COLORS[props.$type].border};
`;

export const Time = styled.span`
  font-size: 12px;
  color: ${COLORS.neutral.textMuted};
`;

export const Message = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
  color: ${COLORS.neutral.textMain};
`;

export const Footer = styled.div`
  padding-top: 8px;
  border-top: 1px solid #f1f5f9;
`;

export const SourceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Label = styled.span`
  font-size: 12px;
  text-transform: uppercase;
`;

export const SourceValue = styled.span`
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
`;
