/* eslint-disable import/no-anonymous-default-export */
import numeral from 'numeral';

numeral.register('locale', 'vi', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'N',
    million: 'Tr',
    billion: 'T',
    trillion: 't'
  }
});

numeral.locale('vi');

export const viewString = (viewCount) => {
  return numeral(parseInt(viewCount)).format('0 a') + ' lượt xem';
}

export const countString = (viewCount) => {
  return numeral(parseInt(viewCount)).format('0 a');
}

export const countComment = (count) => {
  return numeral(parseInt(count)).format('0,0');
}

export const viewNumber = (viewCount) => {
  return numeral(parseInt(viewCount)).format('0,0') + ' lượt xem';
}
