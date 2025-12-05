const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { assert } = require("console");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

describe('the index.js file', () => {
  it('should create a new task when a new description and status is entered and display the task in the status column that corresponds to the task status', async function() {
    const todoCardsBefore = await page.$$eval('#todo-cards > .card', (results) => results );
    expect(todoCardsBefore.length).toBe(3);
      
    await page.evaluate(() => {
      document.getElementById('task-description').value = 'test description';
      document.getElementById('task-status').value = 'todo';
      document.getElementById('add-task').click();
    });
    
    const todoCardsAfter = await page.$$eval('#todo-cards > .card', (results) => results );
    expect(todoCardsAfter.length).toBe(4);
    
    const card = await page.$eval('#task-8', (result) => result.innerHTML );
    
    expect(card).toContain('test description');
    expect(card).toMatch(/<a href="\/edit\/8">[\s\S]*Edit[\s\S]*<\/a>/);
    expect(card).toMatch(/<a href="\/delete\/8">[\s\S]*Delete[\s\S]*<\/a>/);
  });
});