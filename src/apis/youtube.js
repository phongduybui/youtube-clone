import axios from 'axios';

const API_KEY = 'AIzaSyD6-G_GH5O5QT_f8oeDHZjSybzThcBXPJo';
// const API_KEY_SECONDARY = 'AIzaSyDTP6O2vSfH2gF3976Y9SRkIHAtoApipz8';
// const API_KEY_THIRD = 'AIzaSyCasS9wwE-zCFuE-thapTMKUYb7tJjCbPs';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: API_KEY
  }
})