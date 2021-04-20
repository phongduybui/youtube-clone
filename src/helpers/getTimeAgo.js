/* eslint-disable import/no-anonymous-default-export */
import moment from 'moment';
import 'moment/locale/vi';  // without this line it didn't work

moment.locale('vi');

export const getTimeAgo = time => moment(time).fromNow();

export const getTime = time => moment(time).format("DD MMM, YYYY");