

const output = document.getElementById('output');

const getData = (url) => {

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.readyState === 200) {
        const response = JSON.parse(request.responseText);
        resolve(response);
      } else {
        reject(request.statusText);
      }
    });
    request.send();
  });

};

const outputPhotos = (data) => {
  data.forEach(item => {
    output.insertAdjacentHTML('beforebegin',
      `<h2>${item.title}<h2>
      <img src="${item.url}" alt="${item.title}">`);
  });

};

const urlPhoto = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
  twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');

Promise.all([oneImg, twoImg])
  .then(outputPhotos)
  .catch(error => console.log(error));
