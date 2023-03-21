import * as core from '@actions/core'
import * as github from '@actions/github'
import * as githubReadmeStats from '@zo-bro-23/github-readme-stats-test'
import * as fs from 'fs'
import queryString from 'query-string'
import * as path from 'path'

try {
    const options = queryString.parse(core.getInput('options', { required: true }))
    const card = core.getInput('card', { required: false }) || 'stats'
    const file = core.getInput('path')

    process.env['PAT_1'] = core.getInput('token', { required: true })
    process.env['FETCH_MULTI_PAGE_STARS'] = core.getInput('fetch_multipage')

    fs.mkdirSync(path.dirname(file || 'grs/stats.svg'), { recursive: true })

    switch (card) {
        case 'stats':
            githubReadmeStats.generateStatsCard(options)
                .then(card => {
                    fs.writeFileSync(file || 'grs/stats.svg', card)
                })
            break
        case 'repo':
            githubReadmeStats.generateRepoCard(options)
                .then(card => {
                    fs.writeFileSync(file || 'grs/repo.svg', card)
                })
            break
        case 'top-langs':
            githubReadmeStats.generateTopLanguagesCard(options)
                .then(card => {
                    fs.writeFileSync(file || 'grs/top-langs.svg', card)
                })
            break
        case 'wakatime':
            githubReadmeStats.generateWakatimeCard(options)
                .then(card => {
                    fs.writeFileSync(file || 'grs/wakatime.svg', card)
                })
            break
        default:
            throw new Error('Card type must be `repo`, `top-langs`, or `wakatime`')
            break
    }
} catch (error) {
    core.setFailed(error.message)
}