import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server!
    // Requests can be made to: 'http://ingress-nginx.ingress-nginx-controller.svc.cluster.local'
    // on the local machine
    return axios.create({
      baseURL: 'http://www.ticketing.rosalie.io',
      headers: req.headers,
    });
  } else {
    // We are on the browser
    // Requests can be made to: ''
    return axios.create({
      baseURL: '/',
    });
  }
}
