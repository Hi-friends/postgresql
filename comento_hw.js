const puppeteer = require('puppeteer');

const URL = 'https://comento.kr/mentoring/conect/apply';

const dontOpenSelector = '#apply > div > div > div.login-setting > label';

const developerFilterSelector = '#develop';

const extractedElements = '#com_row > ul > li';

const firstItemClickSelector = '#com_row > ul > li:nth-child(1) > div > div.recruiting-detail.border > div.com-detail > h6';

const checkSelector = 'body > section > div > div > div.col-8.mobile-dsp';

const scrapeInfiniteScrollItems = async (page, itemTargetCount, scrollDelay = 1000) => {
  // extractItems --> 함수(메소드)
    let items = [];
    try {
        let previousHeight;
        while (items.length < itemTargetCount) {
            items = await page.evaluate(() => {
        // 브라우저에서 필요한 정보를 빼온다
                const extractedElements = document.querySelectorAll('#com_row > ul > li');
                
                const items = [];
                const datas = [];
                for (const element of extractedElements) {
                    const innercomp = element.querySelectorAll('div > div.recruiting-detail.border > div.com-detail');
                    items.push(innercomp);
                }
                
                //console.log(items);
                
                for(const index of items){
                    for(const data of index){
                        datas.push(data.innerText);
                        
                    }
                }
                // 필요한 정보를 추출한 후 리턴한다
                return datas;
            });
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await page.waitFor(scrollDelay); // 디폴트값은 1초
        }
    } catch (e) { console.log(e); }
    return items;
}

/*const scrapeInfiniteScrollInnerItems = async (page) => {
  // extractItems --> 함수(메소드)
    try {
        let items = [];
        items = page.evaluate(() => {
            const extractedElements = document.querySelectorAll('#com_row > ul > li');
            for (const element of extractedElements) {
                const clickSelector = element.querySelectorAll('div > div.recruiting-detail.border > div.com-detail > h6');
                page.click(clickSelector);
                
                page.waitFor(3000);
                const pageData = page.evaluate(() => {
                    const contents = [];
                    const conent = document.querySelectorAll('body > section > div > div > div.col-8.mobile-dsp > div > div.text-box.minus-margin.mb-20');
                    contents.push(content);
                });
            }
        })
    }catch (e) { console.log(e); }
    return contents;
}*/


const main = async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['—no-sandbox', '—disable-setuid-sandbox'],
  });
    
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });

  // 코멘토 채용 공고 페이지로 이동
    await page.goto(URL);
    await page.waitForSelector(dontOpenSelector);
    await page.click(dontOpenSelector);
    
    await page.waitFor(2000);
    
    await page.click(developerFilterSelector);
    
    await page.waitFor(5000);
    
    const datas = await scrapeInfiniteScrollItems(page, 50);
    
    await console.log(datas);
    
    await page.click(firstItemClickSelector);
    
    await page.waitForSelector(checkSelector);
    
    await page.evaluate(() => {
        const contentSelector = 'body > section > div > div > div.col-8.mobile-dsp > div > div.text-box.minus-margin.mb-20 > div:nth-child(2)';
        const extractedElements = document.querySelectorAll(contentSelector);
        console.log(extractedElements);
    });
        
    
    //const content = await scrapeInfiniteScrollInnerItems(page);
    
    //await console.log(content);

};


main();