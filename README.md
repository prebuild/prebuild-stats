# prebuild-stats

A CLI tool to query some stats about [`prebuild-install`](https://github.com/mafintosh/prebuild-install) downloads from github releases

### Installation
Install with:
```
npm install -g prebuild-stats
```

### Usage

```
prebuild-stats author/package [options]

  --tag         (github release tag, default is latest release)
  --width=80    (render width)
  --color=cyan  (render color - 'yellow', 'cyan', 'white', 'magenta', 'green', 'red', 'grey', 'blue', or 'ascii')
```

Example
```
prebuild-stats lovell/sharp
```

## License

MIT
