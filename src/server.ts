import app from "./app";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
