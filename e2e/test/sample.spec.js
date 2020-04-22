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


    //#################输入测试

    it('should add new todo item', async function() {


        await page.click('#myInput', {delay: 500});

        await page.type('#myInput', newTaskContent, {delay: 50});

        await page.click('#addButton', {delay: 50});


        let todoList = await page.waitFor('#myUL');

        const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('#myUL #myUL:li').textContent, todoList);

        expect(expectInputContent).to.eql(newTaskContent);

    })

});


describe('update task', function () {

    let page;



    before (async function () {

        page = await browser.newPage();

        await page.goto('http://127.0.0.1:80/');

    });



    after (async function () {

        await page.close();

    });

    

    it('should update task', async function() {

        const updatedContent = 'updated content';

        await page.waitFor('#myUL');

        await page.click('#myUL #myUL:li:last-child');

        const textareaElement=await page.$('.updatetask');

        await textareaElement.click('#submitchange')

        await page.$eval('#myUL #myUL:li:last-child textarea', textarea => textarea.blur());

        let theLastItem = await page.waitFor('#myUL #myUL:li:last-child');

        const expectInputContent = await page.evaluate(task => task.querySelector('textarea').textContent, theLastItem);

        expect(expectInputContent).to.eql(updatedContent);

    });

});

//############### 删除测试

describe('delete task', function () {

    let page;


    before (async function () {

        page = await browser.newPage();

        await page.goto('http://127.0.0.1:80/');

    });



    after (async function () {

        await page.close();

    });



    it('should delete the new item ', async function() {

        await page.waitFor('#myUL');

        let originalItemsCount = await page.$$('#myUL #myUL:li').then(item => item.length);

        await page.click('#myUL #myUL:li:last-child .close');

        await page.waitFor(500);

        let itemsCount = await page.$$('#myUL #myUL:li').then(item => item.length);

        expect(originalItemsCount - itemsCount).to.eql(1);

    });

});