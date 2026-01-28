const puppeteer = require("puppeteer")

function delay(time) {
	return new Promise(function (resolve) {
		setTimeout(resolve, time)
	})
}

const scrape = async () => {
	const browser = await puppeteer.launch({
		headless: false,
	})
	const page = await browser.newPage()
	await page.goto("https://basement.redbull.com/pt-br", {
		waitUntil: "networkidle0",
	})
 
	await page.click("#onetrust-reject-all-handler")

	await page.type("#input-search", "SELF-CLEANING AIR SYSTEM")

	await delay(2000)

	await page.click("#drop-projects > div > div.card.card-clickable.no-overflow")

	await delay(3000)

	await page.click("#form-submit-vote > button") 

	await page.waitForNavigation();

	await delay(2000)

	await page.type("#email", "email@email.com")

	await page.click("#root > div > div.content > form > button")
	
	await page.waitForSelector("#pw")
	
	await page.type("#pw", "senha")
	
	await page.click("#root > div > div.content > div > form > button")
}

scrape().then(value => {
	console.log(value)
})
