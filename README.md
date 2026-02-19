# prebuild-stats

> [!IMPORTANT]
> This module is deprecated and no longer maintained, along with `prebuild` and `prebuild-install`. Please see [prebuild/prebuild-install#216](https://github.com/prebuild/prebuild-install/issues/216). Thank you!

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
