import moment from 'moment';
import 'moment/locale/vi';  // without this line it didn't work

moment.locale('vi');

export default time => moment(time).fromNow();