---
layout: post
title: "Install Jekyll On Mac M1 Chip"
category: notes
tags: [tips]
published: True
date: "2021-07-02 23:12:41 -0700"
---

最近刚整了个MacBook Air M1，想用来安安静静继续之前的jekyll的blog。但是发现jekyll装了总是出错。错误基本上有三种：

### 1. 启动`jekyll server`的时候，抱怨ruby环境出错：

```shell
You may have encountered a bug in the Ruby interpreter or extension libraries.
Bug reports are welcome.
For details: https://www.ruby-lang.org/bugreport.html
```

**Root Cause**
ruby的版本有问题。可以通过 `ruby -v` 来查看版本。我看我当前的是3.0，还有个system defualt的2.6，这两个都不行。
M1上的jekyll目前需要的是2.7.2，所以可以通过先uninstall，然后再推荐用rbenv来装。

<!--more-->

```shell
brew unstall ruby
brew install rbenv
type rbenv
rbenv init
eval "$(rbenv init -)" ## also put this command into your ~/.zshrc

cd
rbenv install 2.7.2
rbenv global 2.7.2

```

### 2. 启动`bundle install`的时候，有一对关于ARM架构不支持的错误.

```
Error: Cannot install under Rosetta 2 in ARM default prefix (/opt/homebrew)!
To rerun under ARM use:
    arch -arm64 brew install ...
```

然后这个问题主要反映的是试图在用bundle把jekyll安装在M1 的ARM架构上。基本上就是一连串的错误。另外一个workaround就是在intel架构下安装和运行jekyll和bundle

想要在intel架构下安装，就得需要在安装一份intel架构下得homebrew

```shell
arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

然后再安装bundler和jekyll

```
arch -x86_64 gem install --user-install bundler jekyll
```

然后继续执行bundle的命令来安装你的jekyll project下的依赖

```shell
bundle update
```

```shell
bundle install
```

然后就可以run server了

```shell
bundle exec jekyll server
```

### 3. 如果你遇到了某种package missing的complains


```
Configuration file: /path/_config.yml
  Dependency Error: Yikes! It looks like you don't have jekyll-commonmark-ghpages or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- rouge' If you run into trouble, you can find helpful resources at https://jekyllrb.com/help/!
jekyll 3.8.5 | Error:  jekyll-commonmark-ghpages
```

可以试试下面的[命令](https://stackoverflow.com/questions/57236495/bundle-exec-jekyll-serve-dependency-error-yikes-it-looks-like-you-dont-have)，that works for me.

```
gem uninstall -aIx
```
