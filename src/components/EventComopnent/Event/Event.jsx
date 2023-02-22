import PropTypes from 'prop-types';
import {
  FaMapMarkerAlt,
  FaUserAlt,
  FaCalendarAlt,
  FaClock,
} from 'react-icons/fa';
import { formatEventDuration, formatEventStart } from 'utils';
import { iconSize } from 'constants';
import { Card, CardInfo, CardTitle, Chip } from './Event.styled';

export const Event = ({ name, location, speaker, type, start, end }) => {
  const formattedStart = formatEventStart(start);
  const duration = formatEventDuration(start, end);

  return (
    <Card>
      <CardTitle>{name}</CardTitle>
      <CardInfo>
        <FaMapMarkerAlt size={iconSize.sm} />
        {location}
      </CardInfo>
      <CardInfo>
        <FaUserAlt size={iconSize.sm} />
        {speaker}
      </CardInfo>
      <CardInfo>
        <FaCalendarAlt size={iconSize.sm} />
        {formattedStart}
      </CardInfo>
      <CardInfo>
        <FaClock size={iconSize.sm} />
        {duration}
      </CardInfo>
      <Chip eventType={type}>{type}</Chip>
    </Card>
  );
};

Event.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  speaker: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['free', 'paid', 'vip']),
};
