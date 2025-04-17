require('dotenv').config(); 
// https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow/call-your-api-using-the-client-credentials-flow


// const request = require('request');

// body={
//     "grant_type": "client_credentials",
//     "client_id": process.env.LEGIFRANCE_CLIENT_ID,
//     "client_secret": process.env.LEGIFRANCE_CLIENT_SECRET,
//     "scope": "openid"
//   }

//   console.log(body);

// request.post({
//     // headers: {'content-type' : 'application/x-www-form-urlencoded'},
//     url:     "https://sandbox-oauth.piste.gouv.fr/api/oauth/token",
//     body:    JSON.stringify(body), //body
//   }, function(error, response, body){
//     console.log(body);
//   });



var axios = require("axios").default;

var options = {
  method: 'POST',
//   url: 'https://{yourDomain}/oauth/token',
url : "https://sandbox-oauth.piste.gouv.fr/api/oauth/token",
//   headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.LEGIFRANCE_CLIENT_ID,
    client_secret: process.env.LEGIFRANCE_CLIENT_SECRET,
    // audience: 'YOUR_API_IDENTIFIER'
"scope": "openid"
})
};

axios.request(options).then(function (response) {
  console.log(response.data);

//   let body = {
//     "recherche": {
//         "champs": [
//             {
//                 "typeChamp": "NUM_ARTICLE",
//                 "criteres": [
//                     {
//                         "typeRecherche": "EXACTE",
//                         "valeur": "L36-11",
//                         "operateur": "ET"
//                     }
//                 ],
//                 "operateur": "ET"
//             }
//         ],
//         "filtres": [
//             {
//                 "facette": "NOM_CODE",
//                 "valeurs": [
//                     "Code des postes et des communications électroniques"
//                 ]
//             },
//             {
//                 "facette": "DATE_VERSION",
//                 "singleDate": 1514802418000
//             }
//         ],
//         "pageNumber": 1,
//         "pageSize": 10,
//         "operateur": "ET",
//     "sort": "PERTINENCE",
//         "typePagination": "ARTICLE"
//     },
//    "fond": "CODE_DATE"
// }

// let body = {"id": "LEGITEXT000006069577"}


// BODYok
// let body = {
//     "abrogated": true,
//     "textId": "LEGITEXT000006075116",
//     "searchedString": "constitution 1958",
//     "date": "2021-04-15",
//     "fromSuggest": true,
//     "sctCid": "LEGISCTA000006112861"
//   }
//   let body = {
//     "abrogated": true,
//     "textId": "LEGITEXT000006075116",
//     // "searchedString": "constitution 1958",
//     "date": "2021-04-15",
//     // "fromSuggest": true,
//     "sctCid": "LEGISCTA000006112861"
//   }

  let body = {
    "abrogated": false,
    "textId": "LEGITEXT000006069577",
    "date": "2025-04-15",
    "sctCid": "LEGISCTA000006084232"
  }

const token = response.data.access_token;
  var options = {
    method: 'POST',
    // url: 'https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app/list/ping',
    // url: 'https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app/search',

url: "https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app/consult/code",
    headers: {'content-type': 'application/json', authorization: 'Bearer '+token, 'accept': 'application/json'},
    data: body
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    let sections = response.data.sections;
    for (let i = 0; i < sections.length; i++) {
      console.log("\n########\n",sections[i].id, sections[i].title);
      if(sections[i].sections.length>0){
        console.log("______section_0_____",sections[i].sections[0]);
      }
      if(sections[i].articles.length>0){
        console.log("______article_0_____",sections[i].articles[0]);
      }
      
    }

  }).catch(function (error) {
    console.error(error);
  });
}).catch(function (error) {
  console.error(error);
});




// const options = {
// 	url: 'https://sandbox-api.piste.gouv.fr/dila/legifrance/lf-engine-app/list/ping',
// 	method: 'GET',
// 	headers: {
// 		'accept': 'text/plain'
// 	},
// 	gzip: true
// };
// request(options, (err, response, body) => {
//     console.log(response.statusCode, response);
// 	console.log('success:', body);
// });