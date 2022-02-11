const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static(__dirname + '/public')); // js, css, images
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  if (res.statusCode === 200) {
    res.sendFile('/views/index.html', {
      root: __dirname
    });
  } else {
    return res.status(404);
  }
});

app.post('/compile', function (req, res) {
  const input = req.body.input;
  const fs = require('fs');
  fs.writeFile('./tmp/style.scss', input, err => {
    if (err) {
      console.error('writeFile err', err)
      return
    }
    //file written successfully
    const exec = require('child_process').exec;
    exec(`gulp compilesass`, function (error, stdout, stderr) {
      if (error) {
        console.log('exec error', error)
      } else {
        fs.readFile('./tmp/style.css.liquid', 'utf-8', (err, data) => {
          if (err) {
            console.error('readFile error', err)
            return
          }
          // send to output
          res.json({ data: data });
        })
      }
    });
  });
});


app.post('/minify', function (req, res) {
  const input = req.body.input;
  const fs = require('fs');
  fs.writeFile('./tmp/style.scss', input, err => {
    if (err) {
      console.error('writeFile err', err)
      return
    }
    //file written successfully
    const exec = require('child_process').exec;
    exec(`gulp minifysass`, function (error, stdout, stderr) {
      if (error) {
        console.log('exec error', error)
      } else {
        fs.readFile('./tmp/style.css.liquid', 'utf-8', (err, data) => {
          if (err) {
            console.error('readFile error', err)
            return
          }
          // send to output
          res.json({ data: data });
        })
      }
    });
  });
});



// function runScript(script) {
//   var exec = require('child_process').exec;
//   exec(`gulp ${script}`, function (error, stdout, stderr) {
//     if (error) {
//       console.log('errorororor', error)
//     } else {
//       console.log('stdout: ' + stdout);
//     }
//   });
// }



http.listen(8081, () => {
  console.log('connected to serverrrr');
});
