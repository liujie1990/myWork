### 1. 遍历目录
```
#切换目录
#destination参数用以指定想切换到的目录名，如果没有为cd命令指定目标路径，它将切换到用户主目录。destination参数可以用两种方式表示：一种是使用绝对文件路径，另一种是使用相对文件路径。
cd destination
```
#### 1.1 绝对文件路径
绝对文件路径总是以正斜线(/)作为起始，指明虚拟文件系统的根目录。

```
#该绝对文件路径指向usr目录所包含的bin目录下的用户二进制文件
/usr/bin
#使用绝对文件路径可以清晰表明用户想切换到的准确位置。只需在cd命令后面指定相应的全路径名就可以进入到该目录中。
cd /usr/bin
```
#### 1.2 pwd命令
pwd命令可以显示出shell会话的当前目录，这个目录被称为当前工作目录。
#### 1.3 相对文件路径
相对文件路径允许用户指定一个基于当前位置的目标文件路径。

有两个特殊字符可用户相对文件路径中：

* 单点符(.): 表示当前目录
* 双点符(..): 表示当前目录的父目录

```
#切换到上级目录下的downloads目录
cd ../downloads
#必要时用户可以用多个双点符来向上切换目录
cd ../../etc
#上述情况使用绝对路径更方便
cd /etc
```
### 2. 文件和目录列表
#### 2.1 ls命令
ls命令最基本的形式会显示当前目录下的文件和目录。**特别注意：** ls命令输出的列表是按字母排序的(按列排序而不是按行排序)。

```
#可以使用带-F参数的ls命令轻松区分文件和目录。-F参数在目录名后加了正斜线(/)，在可执行文件的后面加星号(*)。
ls -F
#Linux经常采用隐藏文件来保存配置信息。在Linux上，隐藏文件通常是文件名以点号开始的文件。这些文件并没有在默认的ls命令输出中显示出来，称其为隐藏文件。可以使用带-a参数的ls命令将隐藏文件和普通文件以及目录一起显示出来。
ls -a
#-R参数叫作递归选项，会列出当前目录下包含的子目录中的文件。
ls -F -R 或者 ls -FR  可以这样合并写
#-l参数表示显示长列表，会产生长列表格式的输出，包含了目录中每个文件的更多相关信息。
ls -l
#-d 表示显示目录自身的属性，而不是目录中的内容
ls -d
```
#### 2.2 过滤输出列表
ls命令还支持在命令行中定义过滤器。这个过滤器就是一个进行简单文本匹配的字符串。

* 问号(?): 代表一个字符
* 星号(*): 代表零个或多个字符

```
#只显示my_test文件的信息
ls -l my_test
#问号可用于过滤器字符串中替代任意位置的单个字符
ls -l my_te?t
#星号可匹配零个或多个字符
#匹配以my开头的文件
ls -l my*
#中括号表示一个字符位置并给出多个可能的选择。
#my_te[sy]t  表示s或者y
#my_te[a-z]t  表示字母范围a-z
ls -l my_te[sy]t
ls -l my_te[a-z]t
#可以使用感叹号(!)将不需要的内容排除在外
ls -l my_te[!a]t
```
### 3. 处理文件
#### 3.1 创建文件
```
#touch命令用来创建空文件
touch test_one
```
#### 3.2 复制文件
```
#cp命令用来完成将文件和目录从一个位置复制到另一个位置。
#cp命令需要两个参数：源对象和目标对象
#当source(源对象)和destination(目标对象)参数都是文件名时，cp命令将源文件复制成一个新文件，并且以destination命名。
cp source(源对象) destination(目标对象)

#如果目标文件已经存在，cp命令可能并不会提醒这一点。最好加上-i选项，强制shell询问是否需要覆盖已有文件。
cp -i test_one test_two

#也可以将文件复制到现有目录中
cp -i test_one /home/download

#将demo目录中的所有文件复制到demo2目录中。demo2目录可以不存在，它可以随着cp -R命令被创建。
cp -R demo/ demo2

#cp命令中使用通配符，将所有以test结尾的文件复制到demo目录中
cp .test demo/
```
#### 3.3 制表键自动补全(tab键)
#### 3.4 重命名文件
在Linux中，重命名文件称为移动。`mv`命令可以将文件和目录移动到另一个位置或重新命名。

```
#移动文件会将文件名从demo更改为demos,因为mv只影响文件名。
mv demo demos

#mv也可以用来移动文件的位置，将test.txt文件移动到demo/目录下
mv test.txt demo/

#也可以使用mv命令移动文件位置并修改文件名称
#将demo目录下的test.txt文件移动到demo2目录下，并重命名为test2.txt
mv /demo/test.txt /demo2/test2.txt

#移动整个目录及其内容,移动demo目录下所有文件和目录到demo2目录下
mv demo demo2
```
#### 3.5 删除文件
```
#rm命令用来删除文件，-i参数提示是不是要真的删除该文件
#bash shell中没有回收站，文件一旦删除就没法再找回。因此，在使用rm命令时，加入-i参数是个好习惯。
rm -i test.txt

#使用通配符删除成组的文件
rm -i de?o
```
**rm命令相关参数：**

* -d：直接把欲删除的目录的硬连接数据删除成0，删除该目录；
* -f：强制删除文件或目录；
* -i：删除已有文件或目录之前先询问用户；
* -r或-R：递归处理，将指定目录下的所有文件与子目录一并处理；
* --preserve-root：不对根目录进行递归操作；
* -v：显示指令的详细执行过程。

### 4. 处理目录
#### 4.1 创建目录
```
#创建目录
mkdir demo

#同时创建多个目录和子目录，需要加入-p参数
mkdir -p demo/demo_test

#删除目录(只能删除空目录，如果目录不为空需要先删除目录下的文件)
rmdir demo

#删除目录及其所有内容
rm -rf demo(危险)
```
### 5. 查看文件内容
#### 5.1 查看文件类型
```
#查看文件是什么类型
file test.txt
```
```
#查看整个文件内容
cat test.txt

#-n参数会给所有行加上行号
#-b参数给有文本的行加上行号
#-T参数可以禁止制表符出现
cat -n test.txt
```
```
#more命令会显示文本文件的内容，但会在显示每页数据之后停下来。可以使用空格键或回车键以逐行向前的方式浏览文本文件。浏览完后，按q键退出。
more test.txt
```
```
#less命令和more命令基本一样，一次显示一屏的文件文本，但是支持更堵哦得选项。less命令能够识别上下键以及上线翻页键。
```
#### 5.2 查看部分文件
```
#tail命令会显示文件最后几行的内容。默认情况下，会显示文件的末尾10行。
tail test.txt

#-n参数用来修改所显示的行数
#只显示文件的最后两行
tail -n 2 test.txt

#-f参数是tail命令的一个突出特性。允许在其他进程使用该文件时查看文件的内容
```
```
#head命令会显示文件开头的那些行的内容，默认显示前10行的文本。
head test.txt

#类似tail命令，head也支持-n参数。这两个命令都允许在破折号后面输入想要显示的行数
head -5 test.txt (显示前5行)
```
### 6. 监测程序
#### 6.1 探查进程
当程序运行在系统上时，我们称之为进程。

```
#ps命令。默认情况下，ps命令只会显示运行在当前控制台下的属于当前用户的进程。
ps

#-e参数指定显示所有运行在系统上的进程
#-f参数则扩展了输出
ps -ef
```

* UID: 启动这些进程的用户
* PID(Process ID): 程序的进程ID
* PPID: 父进程的进程号
* C: 进程生命周期中的CPU利用率
* STIME: 进程启动时的系统事件
* TTY: 进程启动时的终端设备
* TIME: 运行进程需要的累计CPU时间
* CMD: 启动的程序名称

#### 6.2 实时监测进程
```
#top命令跟ps命令相似，能够显示进程信息，但它是实时显示的。
```
### 7. 处理数据文件
#### 7.1 搜索数据
```
#grep命令会在输入或指定的文件中查找包含匹配指定模式的字符的行
#在file文件中搜索能匹配模式three的文本
grep three file

#反向搜索(输出不匹配该模式的行)，加-v参数
grep -v three file

#显示匹配模式行的行号，加-n参数
grep -n three file

#显示有多少行含有匹配的模式，加-c参数
grep -c three file

#指定多个匹配模式，加-e参数(同时匹配three和two)
grep -e three -e two file

#正则匹配(搜索包含t或者f字符的匹配)
grep [tf] file
```