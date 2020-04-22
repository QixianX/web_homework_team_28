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
