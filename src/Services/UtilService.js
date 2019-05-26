import url from 'url';
import axios from 'axios';
import parseLinkHeader from 'parse-link-header';
import { fakeData } from './data';

export function makeApiCall(requestOptions, cb) {
  let requestUrl = url.format(requestOptions);

  console.log(requestUrl);

  // axios.get(requestUrl)
  //   .then(response => {
  //     console.log('headers', parseLinkHeader(response.headers.link));

  //     cb(null, response.data);
  //   })
  //   .catch(err => {
  //     return cb(err, null)
  //   });

  // console.log(fetchDataRecursively(requestUrl).then(response => response));

  fetchDataRecursively(requestUrl).then(response => {
    console.log('inMakeAPI', response);

    cb(null, response)
  }
  ).catch(err => {
    console.log('yup');
    
    cb(err, null)
  });

  // return cb(null, fetchDataRecursively(requestUrl));

};


export function fetchDataRecursively(url, data = []) {

  console.log('Recursive');

  // return [];

  // return fakeData;

  return axios.get(url)
    .then(response => {

      console.log('FUll:', response);

      let linkHeader = parseLinkHeader(response.headers.link);

      if (!linkHeader || !linkHeader.next) {
        console.log('Fetching DONE');
        console.log('Data', data);


        return data.concat(response.data);
      }
      console.log('Fetching more', data);

      return fetchDataRecursively(linkHeader.next.url, data.concat(response.data));
    })
    .catch(err => {
      console.log('Errrrrr', err);

      throw err;
    });

}