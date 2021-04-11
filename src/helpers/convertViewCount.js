import numeral from 'numeral';

numeral.register('locale', 'vi', {
  delimiters: {
    thousands: ' ',
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

export default (viewCount) => {
  return numeral(parseInt(viewCount)).format('0 a') + ' lượt xem';
}
