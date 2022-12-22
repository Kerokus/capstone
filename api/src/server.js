const app = require("./app.js");
const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Capstone application listening on ${PORT}`);
})
