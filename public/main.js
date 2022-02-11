const baseUrl = 'https://liquid-scss-css.herokuapp.com';
// const baseUrl = 'http://localhost:8081'
const compileBtn = document.querySelector('button#compiler');
compileBtn.addEventListener('click', () => {
  gulpAction('compile', compileBtn);
});

const minifyBtn = document.querySelector('button#minifier');
minifyBtn.addEventListener('click', () => {
  gulpAction('minify', minifyBtn);
});


const gulpAction = (action, btn) => {
  const input = document.querySelector('#input');
  const data = {input: input.value};
  const initText = btn.innerText;
  if (action == 'compile'){
    btn.innerText = 'COMPILING...';
  } else {
    btn.innerText = 'MINIFYING...';
  }
  fetch(`${baseUrl}/${action}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    const output = document.querySelector('#output');
    output.value = data.data;
    btn.innerText = initText;
  })
  .catch(err => console.log(err));
}