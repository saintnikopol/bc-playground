app.use(route.get('/', bcapi.all));
app.use(route.get('/:id', bcapi.transactions));
app.use(route.get('/:id/balance', bcapi.balance));
app.use(route.post('/', books.add));
