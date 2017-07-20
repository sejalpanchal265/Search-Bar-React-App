
let requestUrl = 'http://localhost:3008/';

export function getData(endPoint, qs){

    let esc = encodeURIComponent;
    let query = '';
    if (Object.keys(qs).length >0) {    
        query = "?"+Object.keys(qs)
            .map(k => esc(k) + '=' + esc(qs[k]))
            .join('&');
    }
    
    return fetch(requestUrl+endPoint+query, {method: 'GET'})
      .then(responseType => responseType.json())
      .then(function(response){
          return response;
      });
}

export function putData(endPoint, data){


    return fetch(requestUrl+endPoint,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: "PUT",
                    mode: 'CORS',
                    body: JSON.stringify(data)
                })
      .then(responseType => responseType.json())
      .then(function(response){
          return response;
      });
}
