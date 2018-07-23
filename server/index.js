import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

var app = new Koa();
app.use(bodyParser());

app.use(async ctx => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    var json_obj = ctx.request.body;
    //
    console.log('Got json object: \n', json_obj);
    ctx.body = json_obj;
});

app.listen(8080); //the server object listens on port 8080
