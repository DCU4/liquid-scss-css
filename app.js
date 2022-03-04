const express = require('express');
const app = express();
const http = require('http').createServer(app);
const fs = require('fs');

app.use(express.static(__dirname + '/public')); // js, css, images
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true , limit: '50mb'}));

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
  // parse input and add quotes and sass escape
  const output = input.replace(/\{{/g, '#{\'"{{').replace(/\}}/g,'}}"\'}');
  fs.writeFile('./tmp/style.scss', output, err => {
    if (err) {
      console.error('writeFile err', err)
      return
    }
    //file written successfully
    gulpAction('compilesass', res);
  });
});


app.post('/minify', function (req, res) {
  const input = req.body.input;
  const output = input.replace(/\{{/g, '#{\'"{{').replace(/\}}/g,'}}"\'}');
  
  fs.writeFile('./tmp/style.scss', output, err => {
    if (err) {
      console.error('writeFile err', err)
      return
    }
    //file written successfully
    gulpAction('minifysass', res);
  });
});



const gulpAction = (script, res) => {
  const exec = require('child_process').exec;
  exec(`gulp ${script}`, function (error, stdout, stderr) {
    if (error) {
      console.log('errorororor', error)
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
}



http.listen(process.env.PORT || 8081, () => {
  console.log('connected to serverrrr');
});
