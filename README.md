gitlab-jira-webhook
===================
概述：
-----------------------------------  
###在使用jira与gitlab过程中，需要把gitlab中的代码变动关联到jira的issue中，在网上没有找到合适的工具，因此自己写了一个。
使用步骤：
-----------------------------------  
###1.安装nodejs
###2.git clone https://github.com/yzjia/gitlab-jira-webhook.git
###3.cd gitlab-jira-webhook && npm install && node ./bin/www
###4.在gitlab中新建项目后，选择该project->setting->Web Hooks->url中填写http://yourdomain.com/hooks
###5.提交git代码到本地时填写“refs #PMSYS-9”，多个关联用空格分隔。例如：git commit -m"refs #PMSYS-9 refs #PMSYS-16 some message"
###6.git push提交代码到gitlab，gitlab自动调用webhook，为相应issue新增备注
