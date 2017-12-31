import GenerateStats from './GenerateStats';
import FetchData from './FetchData';

const fetchUserDataPromise = (username) => {
  FetchData(username, true)
    .then((response) => {
      const data = JSON.parse(response);
      if (data.success) {
        return data;
      }
      throw new Error('User not found');
    })
    .then(data => GenerateStats(data))
    .then((data) => {
      console.log(data);
      // this.props.setUserData(data);
      // this.setState({ dataReq: 'successful' });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default fetchUserDataPromise;
