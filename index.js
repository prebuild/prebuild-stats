#!/usr/bin/env node

/*
 * Copyright (c) 2017, Mathias Küsel
 * MIT License <https://github.com/mathiask88/prebuild-stats/blob/master/LICENSE>
 */

'use strict'

const babar = require('babar')
const get = require('simple-get')
const minimist = require('minimist')

const argv = minimist(process.argv.slice(2))

const [author, name] = argv._[0].split('/')
const renderWidth = argv.width || 80
const renderColor = argv.color || 'cyan'

if (argv.tag) argv.tag = `tags/${argv.tag}`
const tag = argv.tag || 'latest'

const opts = {
  url: `https://api.github.com/repos/${author}/${name}/releases/${tag}`,
  headers: {
    'user-agent': 'prebuild-download-stats'
  },
  json: true
}

get.concat(opts, (err, res, data) => {
  if (err) throw err

  if (res.statusCode !== 200) {
    console.log(data.message)
    process.exit(1)
  }

  if (!data.assets || (data.assets && data.assets.length === 0)) {
    console.log('No assets found for specified release')
    process.exit(1)
  }

  let chartData = {}
  data.assets.forEach((asset) => {
    const regex = /(.+)-(.+?)-(.+?)-(.+?)-(.+?)-(.+)\.tar\.gz/g
    const [name, version, runtime, abi, platform, arch] = regex.exec(asset.name).slice(1)
    const downloadCount = asset.download_count

    if (!chartData[version]) {
      chartData[version] = { 'runtime': {}, 'abi': {}, 'platform': {}, 'arch': {} }
    }

    if (!chartData[version]['runtime'][runtime])
      chartData[version]['runtime'][runtime] = 0;

    if (!chartData[version]['abi'][abi])
      chartData[version]['abi'][abi] = 0;

    if (!chartData[version]['platform'][platform])
      chartData[version]['platform'][platform] = 0;

    if (!chartData[version]['arch'][arch])
      chartData[version]['arch'][arch] = 0;

    chartData[version]['runtime'][runtime] += downloadCount
    chartData[version]['abi'][abi] += downloadCount
    chartData[version]['platform'][platform] += downloadCount
    chartData[version]['arch'][arch] += downloadCount

  });

  Object.keys(chartData).forEach((version) => {
    console.log(`Chart data for ${name}@${version}`)

    Object.keys(chartData[version]).forEach((sort) => {
      console.log(`\nSorted by ${sort}`)
      let caption = ''
      let data = []
      Object.keys(chartData[version][sort]).forEach((sortName, i) => {
        const downloadCount = chartData[version][sort][sortName];
        caption += `${i} = ${sortName}(${downloadCount}) `
        data.push([i, downloadCount])
      })

      console.log(
        babar(data, {
          'caption': caption.replace(new RegExp(`(.{${renderWidth}})`, 'g'), '$1\n     '),
          'width': renderWidth,
          'xFractions': 0,
          'minY': 1,
          'color': renderColor
        }))
    })
  })
})
