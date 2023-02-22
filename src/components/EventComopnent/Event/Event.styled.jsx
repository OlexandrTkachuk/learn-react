import styled from '@emotion/styled';

export const Card = styled.div`
  position: relative;
  border: 2px dashed black;
  padding: 8px;
  border-radius: 4px;
`;

export const CardTitle = styled.h2`
  margin-top: 0;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const CardInfo = styled.p`
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 8px;
  color: #212121;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0.25px;

  svg {
    display: block;
    margin-right: 8px;
    color: #757575;
  }
`;

const setBgColor = props => {
  switch (props.eventType) {
    case 'free':
      return 'teal';
    case 'paid':
      return 'blue';
    case 'vip':
      return 'orangered';
    default:
      return '#000';
  }
};

export const Chip = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  background-color: ${setBgColor};
  color: ${props => props.theme.colors.white};
`;

// .icon {
// display: block;
// margin-right: 8px;
// color: #757575;
// }
