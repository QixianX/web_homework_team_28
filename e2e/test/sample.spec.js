describe('add task', function () {

    let page;

    let newTaskContent;


    before (async function () {

        page = await browser.newPage();

        let random = new Date().getMilliseconds();

        newTaskContent = 'new todo item ' + random;

        await page.goto('http://127.0.0.1:80/');

    });



    after (async function () {

        await page.close();

    });