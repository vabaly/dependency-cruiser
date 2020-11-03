# Dependency cruiser ![Dependency cruiser](https://raw.githubusercontent.com/sverweij/dependency-cruiser/master/doc/assets/ZKH-Dependency-recolored-160.png)

_Validate and visualise dependencies. With your rules._ JavaScript. TypeScript. CoffeeScript. ES6, CommonJS, AMD.

根据一份规则配置文件验证并可视化模块的依赖关系。支持 JavaScript、TypeScript、 CoffeeScript 这几种语言。支持 ES Module, CommonJS, AMD 这几种模块系统。

## What's this do? / 它做了什么

![Snazzy dot output to whet your appetite](https://raw.githubusercontent.com/sverweij/dependency-cruiser/master/doc/assets/sample-dot-output.png)

This runs through the dependencies in any JavaScript, TypeScript, LiveScript or CoffeeScript project and ...

它能运行在任何 JavaScript，TypeScript，LiveScript 或 CoffeeScript 项目中。它拥有以下的功能：

- ... **validates** them against (your own) [rules](./doc/rules-reference.md)
- ... **reports** violated rules
  - in text (for your builds)
  - in graphics (for your eyeballs)

- 根据（你自己配置的）规则**验证**它们
- 将违反规则的地方以下列**报告**的形式输出
  - 文字形式
  - 图片形式

As a side effect it can generate [**cool dependency graphs**](./doc/real-world-samples.md)
you can stick on the wall to impress your grandma.

作为副作用，它可以生成很酷的依赖关系图。

## How do I use it? / 如何使用

### Install it / 安装

- `npm install --save-dev dependency-cruiser` to use it as a validator in your project (recommended) or...
- `npm install --global dependency-cruiser` if you just want to to inspect multiple projects.

- `npm install --save-dev dependency-cruiser` 会将它用于项目中的校验（推荐）
- `npm install --global dependency-cruiser`，如果您想检查多个项目。

### Show stuff to your grandma / 创建一张依赖图

To create a graph of the dependencies in your src folder, you'd run dependency
cruiser with output type `dot` and run _GraphViz dot_ on the result. In
a one liner:

要在 src 文件夹中创建依赖关系图，您需要使用输出类型 dot 运行 dependency
cruiser，并在结果上运行 GraphViz dot。只需要下面这行命令：

```shell
depcruise --include-only "^src" --output-type dot src | dot -T svg > dependencygraph.svg
```

- You can read more about what you can do with `--include-only` and other command line
  options in the [command line interface](./doc/cli.md) documentation.
- _[Real world samples](./doc/real-world-samples.md)_
  contains dependency cruises of some of the most used projects on npm.

- 你可以在 [command line interface](./doc/cli.md) 文档中详细了解如何使用 --include-only 和其他命令行
- 文档 [Real world samples](./doc/real-world-samples.md) 中包含 npm 上一些最常用项目的 dependency cruises 样例。

### Validate things / 校验

#### Declare some rules / 定义规则

The easy way to get you started:

使用下面这个简单的命令即可得到一份规则文件：

```shell
depcruise --init
```

This will ask you some questions and create a `.dependency-cruiser.js` with some
rules that make sense in most projects (detecting **circular dependencies**,
dependencies **missing** in package.json, **orphans**, production code relying on
dev- or optionalDependencies, ...).

这个过程中会问一些问题，最终将创建一个 .dependency-cruiser.js 文件，其中包含一些在大多数项目中都适用的规则（例如检测循环依赖项、package.json 中缺少的依赖项
、孤立的依赖、依赖 dev- 或 optionalDependencies 的生产代码，... ）。

Start adding your rules by tweaking that file.

可以通过编辑该文件开始添加规则。

Sample rule:

样例规则：

```json
{
  "forbidden": [
    {
      "name": "not-to-test",
      "comment": "don't allow dependencies from outside the test folder to test",
      "severity": "error",
      "from": { "pathNot": "^test" },
      "to": { "path": "^test" }
    }
  ]
}
```

- To read more about writing rules check the
  [writing rules](./doc/rules-tutorial.md) tutorial
  or the [rules reference](./doc/rules-reference.md)
- You can find the `--init-rules` set [here](./doc/rules.starter.json)

- 可以通过阅读 [writing rules](./doc/rules-tutorial.md) 文档了解如何写规则
- 你可以在 [这里](./doc/rules.starter.json) 找到 `--init-rules` 集合。

#### Report them / 报告

```sh
depcruise --config .dependency-cruiser.js src
```

This will validate against your rules and shows any violations in an eslint-like format:

这将根据你的规则进行验证，并以类似 eslint 的格式显示任何违反规则的地方：

![sample err output](https://raw.githubusercontent.com/sverweij/dependency-cruiser/master/doc/assets/sample-err-output.png)

There's more ways to report validations; in a graph (like the one on top of this
readme) or in a table.

报告验证的方法更多。可以用一个图表（像最上面的那个图）或用一个表格。

- Read more about the err, dot, csv and html reporters in the
  [command line interface](./doc/cli.md)
  documentation.
- dependency-cruiser uses itself to check on itself in its own build process;
  see the `decpruise` script in the
  [package.json](https://github.com/sverweij/dependency-cruiser/blob/master/package.json#L64)

- 在文档 [command line interface](./doc/cli.md) 中阅读有关 err，dot，csv 和html 报告形式的更多信息。
- dependency-cruiser 使用它自己检查自己，可以请参阅 package.json 中的 decpruise 脚本

## I want to know more! / 更多信息

You've come to the right place :-) :

这里有更多信息：

- Usage
  - [Command line reference](./doc/cli.md)
  - [Writing rules](./doc/rules-tutorial.md)
  - [Rules reference](./doc/rules-reference.md)
  - [Options reference](./doc/options-reference.md)
  - [FAQ](./doc/faq.md)
- Hacking on dependency-cruiser
  - [API](./doc/api.md)
  - [Output format](./doc/output-format.md)
  - [Adding other output formats](./doc/faq.md#q-how-do-i-add-a-new-output-format)
  - [Adding support for other alt-js languages](./doc/faq.md#q-how-do-i-add-support-for-my-favorite-alt-js-language)
- Other things
  - [Road map](https://github.com/sverweij/dependency-cruiser/projects/1)
  - [Contact](./doc/faq.md#contact)
  - [Real world show cases](./doc/real-world-samples.md)
  - [TypeScript, CoffeeScript and LiveScript support](./doc/faq.md#features)
  - [Support for .jsx, .tsx, .csx/ .cjsx and .vue](./doc/faq.md#q-im-developing-in-react-and-use-jsx-tsx-csx-cjsx-how-do-i-get-that-to-work)
  - [Webpack alias/ modules support](./doc/faq.md#q-does-this-work-with-webpack-configs-eg-alias-and-modules)

- 用法
  - [命令行](./doc/cli.md)
  - [规则编写](./doc/rules-tutorial.md)
  - [规则手册](./doc/rules-reference.md)
  - [参数手册](./doc/options-reference.md)
  - [问答](./doc/faq.md)
- 扩展 dependency-cruiser
  - [API](./doc/api.md)
  - [输出格式](./doc/output-format.md)
  - [添加其他的输出格式](./doc/faq.md#q-how-do-i-add-a-new-output-format)
  - [添加对其他 alt-js 语言的支持](./doc/faq.md#q-how-do-i-add-support-for-my-favorite-alt-js-language)
- 其他
  - [路线图](https://github.com/sverweij/dependency-cruiser/projects/1)
  - [联系](./doc/faq.md#contact)
  - [真实的例子](./doc/real-world-samples.md)
  - [支持 TypeScript, CoffeeScript and LiveScript](./doc/faq.md#features)
  - [支持.jsx, .tsx, .csx/ .cjsx and .vue](./doc/faq.md#q-im-developing-in-react-and-use-jsx-tsx-csx-cjsx-how-do-i-get-that-to-work)
  - [支持 Webpack 别名 / 模块](./doc/faq.md#q-does-this-work-with-webpack-configs-eg-alias-and-modules)

## License

[MIT](LICENSE)

## Thanks

- [Marijn Haverbeke](http://marijnhaverbeke.nl) and other people who
  collaborated on [acorn](https://github.com/ternjs/acorn) -
  the excellent JavaScript parser dependency-cruiser uses to infer
  dependencies.
- [Katerina Limpitsouni](https://twitter.com/ninaLimpi) of [unDraw](https://undraw.co/)
  for the ollie in dependency-cruiser's
  [social media image](https://repository-images.githubusercontent.com/74299372/239ed080-370b-11ea-8fe7-140cf7b90a33).
- All members of the open source community who have been kind enough to raise issues,
  ask questions and make pull requests to get dependency-cruiser to be a better
  tool.

## Build status

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/sverweij/dependency-cruiser/linting%20%26%20test%20coverage%20-%20linux?label=actions&logo=github)](https://github.com/sverweij/dependency-cruiser/actions)
[![Build Status](https://travis-ci.org/sverweij/dependency-cruiser.svg?branch=master)](https://travis-ci.org/sverweij/dependency-cruiser)
[![coverage](https://gitlab.com/sverweij/dependency-cruiser/badges/master/coverage.svg)](https://gitlab.com/sverweij/dependency-cruiser/builds)
[![Maintainability](https://api.codeclimate.com/v1/badges/93035ef5fba33901d479/maintainability)](https://codeclimate.com/github/sverweij/dependency-cruiser/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/93035ef5fba33901d479/test_coverage)](https://codeclimate.com/github/sverweij/dependency-cruiser/test_coverage)
[![total downloads on npm](https://img.shields.io/npm/dt/dependency-cruiser.svg?maxAge=2591999)](https://npmjs.com/package/dependency-cruiser)

Made with :metal: in Holland.
