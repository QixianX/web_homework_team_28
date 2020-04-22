

from selenium import webdriver
import time


chrome_options = webdriver.ChromeOptions()
browser = webdriver.Chrome(chrome_options=chrome_options)
browser.get("K:\\kejian\\web_homework\\frontend\\main.html")
# browser.get("/frontend/main.html")

#############直接点击,返回警告


add_t = browser.find_element_by_class_name("addBtn")
add_t.click()
time.sleep(0.7)


# ############测试输入

todo_te = browser.find_element_by_id('myInput')
todo_te.send_keys("哈哈")
time.sleep(0.7)


###########测试输入点击
add_t = browser.find_element_by_class_name("addBtn")
add_t.click()
time.sleep(0.7)



todo_te = browser.find_element_by_id('myInput')
todo_te.send_keys("heh")
time.sleep(0.7)

add_t = browser.find_element_by_class_name("addBtn")
add_t.click()
time.sleep(0.7)





###########测试删除











