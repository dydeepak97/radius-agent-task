import url from 'url';

export function makeApiCall (requestOptions, cb) {
    let requestUrl = url.format(requestOptions);

    console.log(requestUrl);
    
    fetch(requestUrl)
      .then(response => {
        return response.json();
      })
      .then(responseJSON => {
        return cb(null, responseJSON)
      })
      .catch(err => {
        return cb(err, null)
      })
  };
