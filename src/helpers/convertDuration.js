import moment from 'moment';

const convertDuration = (duration) => {
  const durationAsMilliseconds = moment.duration(duration).asMilliseconds(); 

  if(durationAsMilliseconds >= 3600000) {
    return moment.utc(durationAsMilliseconds).format('HH:mm:ss');
  }

  return moment.utc(durationAsMilliseconds).format('mm:ss');
}

export default convertDuration;