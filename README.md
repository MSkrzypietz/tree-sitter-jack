This is a simple neovim tree sitter for the jack langauge from [nand2tetris](https://nand2tetris.org).

# Usage

### 1. Add the parser to your config

```
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.jack = {
  install_info = {
    url = "https://github.com/MSkrzypietz/tree-sitter-jack",
    files = {"src/parser.c"},
    generate_requires_npm = false,
    requires_generate_from_grammar = false,
  }
}

vim.filetype.add({
  extension = {
    jack = 'jack'
  }
})
```

### 2. Add the queries

Copy the files from the `queries` folder into `~/.config/nvim/after/queries/jack`.

### 3. Run `:TSUpdate` / `:TSInstall jack`

See the [nvim tree sitter docs](https://tree-sitter.github.io/tree-sitter/) for further troubleshooting.
