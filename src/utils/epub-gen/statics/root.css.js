export const ROOT_CSS = `
/* Root */
#root {
  padding: 20px;
}

#root hr {
  border: 0;
  border-bottom: 1px solid #dedede;
  margin: 60px 10%;
}

#root.description {
  padding: 10px;
  background-color: rgb(245, 245, 245);
  border-radius: 5px;
}

#root img,
#root audio,
#root video{
  margin: 15px 0;
  max-width: 100%;
  height: auto;
}

#root h1,
#root h2 {
  padding-left: 0;
}

#root p {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: .5em 0;
}

#root pre {
  padding: 15px;
  border-radius: 5px;
  background-color: rgb(233, 233, 233);
}

#root blockquote {
  padding: 5px 15px;
  border-left: 3px solid rgba(0, 95, 95, 0.418);
  background-color: rgb(236, 243, 243);
  border-radius: 0 5px 5px 0;
  margin-left: 0;
  margin-right: 0;
}

#root table {
  border-collapse: collapse;
  width: 100%;
  max-width: 100%;
  overflow: auto;
}

#root table, 
#root th, 
#root td {
  padding: 10px 20px;
  border: 1px solid rgb(209, 209, 209);
  white-space: nowrap;
}

#root thead {
  background-color: rgb(240, 240, 240);
}
`