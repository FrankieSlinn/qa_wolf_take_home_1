// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const fs = require('fs');

async function saveHackerNewsArticles() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to Hacker News
  await page.goto("https://news.ycombinator.com");


// Extract top 10 articles
const articles = await page.evaluate(() => {
  const titles = Array.from(document.querySelectorAll('.titleline'));
  return titles.slice(0, 10).map((titleElement, index)=> {
    const linkElement = titleElement.querySelector('a'); // Find the corresponding <a> element
    return {
      index: index + 1,
      title: titleElement.innerText,
       url:linkElement ? linkElement.href : null // Get the href attribute of the <a> element
    };
  });
});


  // Save articles to CSV file
  const csvContent = articles.map(article => `${article.index}.) ${article.title}, ${article.url}`).join('\n\n');
  fs.writeFileSync('hacker_news_top_10.csv', csvContent);

  console.log("Top 10 Hacker News articles saved to hacker_news_top_10.csv");


}

(async () => {
  await saveHackerNewsArticles();
})();

