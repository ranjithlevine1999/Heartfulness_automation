const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Explore',async({page})=>{ 
try {
    
    //Launching the Browser
    await page.goto('https://heartfulness.org/in-en');
     await takeScreenshot(page, 'Browser launched')

    //Login
       
    // Sign in button
    await page.click('//button[@aria-label="SIGN IN"]');
    await takeScreenshot(page, 'Sign in button clicked')
   
    //sign in with Email
    await page.locator('//button[contains(text(),"Sign in with Email")]').click();
    await takeScreenshot(page, 'Sign in with e-mail clicked')
   
    // Email field
    await page.fill('#email','karadipai@mailinator.com');
    await takeScreenshot(page, 'Given mail has entered')
   
    //Password field
    await page.fill('#password','Test@123');
    await takeScreenshot(page, 'Password has been entered')
   
    //Login button
    await page.locator('//button[contains(text(),"Login")]').click();
    await takeScreenshot(page, 'Login button clicked')
}
catch (error) {
        
    console.log("Error with Login", error.message);
}

try {
    // Individual Practice
    await page.locator('(//a[@target="_self"])[4]').click();
    await page.locator('(//a[@target="_self"])[5]').click();

    await sleep(1000);
   
    await takeScreenshot(page, 'Individual Practice');

    await page.waitForTimeout(2000)
   
    await expect(page).toHaveTitle('Heartfulness: Practice')
    const indiv = await page.title();
    console.log("27.", indiv);

} catch (error) {
    console.log("Header Individual practice", error.message);
}

try {
    //Personal Trainer
    await page.locator('(//a[@target="_self"])[4]').click();
    await page.locator('(//a[@target="_self"])[6]').click();
    
    await sleep(1000);

    await takeScreenshot(page, 'Personal Trainer');

    await page.waitForTimeout(2000)

    await expect(page).toHaveTitle('Meditate Online')
    const pers = await page.title();
    console.log("28.", pers);

} catch (error) {
    console.log("Header Meditation Place ", error.message);
}

try {
    //Group Session
    await page.locator('(//a[@target="_self"])[4]').click();
    await page.locator('(//a[@target="_self"])[7]').click();
    
    await sleep(1000);

    await takeScreenshot(page, 'Group session');

    await page.waitForTimeout(2000)


    await expect(page).toHaveTitle('Heartfulness')
    const groups = await page.title();
    console.log("29.", groups)

    //Home Button
    await page.goto("https://heartfulness.org/global")
    await page.waitForTimeout(2000)


    //Heartfulness Initiatives
    await page.getByRole('menuitem', { name: 'EXPLORE' }).click();

    await sleep(1000);

    await page.click('//span[contains(text(),"Heartfulness Initiatives")]');
    //await page.getByRole('menuitem', { name: 'Heartfulness Initiatives' }).click();
    await page.waitForTimeout(2000)

    await sleep(1000);

    await takeScreenshot(page, 'Heartfulness Initiatives');

    await expect(page).toHaveTitle('Heartfulness Initiatives')
    const init = await page.title(); 

} catch (error) {
    console.log("Header Meditation Place ", error.message);
}

 //page of Heartfulness Initiatives

// Parent element
const parent = page.locator('//div[@class="p-grid grid p-nogutter grid-nogutter"]');

// Child elements
const children = parent.locator('//div[@class="p-grid-items mb-4"]');

const childCount = await children.count();

console.log("     ");

console.log(`Number of cards present in the Heartfulness Initiatives is : ${childCount}`);

console.log("     ");


//======>> Simple output in the redable format



// for (let i = 0; i < childCount; i++) {
//   // Locate the title element within each child card
//   const cardTitle = await children.nth(i).locator('//h4[@class="initiatives_title"]').textContent();
//   cards.push(`Card ${i + 1}: ${cardTitle.trim()}`); // Collect only the titles
// }



const cards = []; //store card titles

for (let i = 0; i < childCount; i++) {
  // Locate the title element within each child card
  const cardTitle = await children.nth(i).locator('//h4[@class="initiatives_title"]').textContent(); 
  cards.push({ Index: i + 1, Title: cardTitle.trim() }); // Collect only the titles with index
}

// Log all card titles in table format
console.log('Heartfulness Initiatives Card Titles:');
console.table(
  cards.map((card) => ({ List: card.Index, Title: card.Title }))
);



//await takeScreenshot(page, `Number of cards present in the Heartfulness Initiatives is : ${childCount}`);


   
});


