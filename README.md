#clfu
## Reveal command-line gems ([commandlinefu.com](http://commandlinefu.com) cli tool)

Usage: clfu [options] [command]


  Options:

    -v, --version  output the version number
    -h, --help     output usage information


  Commands:

    popular [options]          Show all commands sorted by votes
    matching [options] <text>  Show commands which contain <text> in description or in command
    using [options] <command>  Show commands using <command>

### Popular
Usage: clfu popular [options]

  Show all commands sorted by votes


  Options:

    -s, --skip <n>  Skip <n> items
    -t, --take <n>  Take only <n> items
    -h, --help      output usage information

### Matching
Usage: clfu matching [options] <text>

  Show commands which contain <text> in description or in command


  Options:

    -s, --skip <n>  Skip <n> items
    -t, --take <n>  Take only <n> items
    -h, --help      output usage information

### Using
Usage: clfu using [options] <command>

  Show commands using <command>


  Options:

    -s, --skip <n>  Skip <n> items
    -t, --take <n>  Take only <n> items
    -h, --help      output usage information


(node.js is required)