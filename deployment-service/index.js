
const polka = require('polka');
const app = polka();

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4004;

const { json } = require('body-parser');
app.use(json());

const { spawn } = require('child_process');

const some_secret = "some_secret_key";

app.post('/deploy/:secret', (req, res) => {

    //Check if a valid secret is included with the request
    //There are additional checks to verify that a request is sent from GitHub
    const secret = req.params.secret;
    if (secret !== some_secret){
        res.end(403);
    }

    //Clone the repository, build both images, push to the container registry
    var child = spawn('./clone_build_push.sh');
    child.stdout.on('data', function (data) {
        console.log(data.toString());
      });
      
      child.stderr.on('data', function (data) {
        console.log(data.toString());
      });
      
      child.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString());
      });
    res.end("");
});

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Running on localhost:${PORT}`);
});
