# Release
This document describes the release process for the `deepinfra` package.


## Checklist
Before release, make sure to do the following steps:

- [ ] Update the `package.json` version number. You can use `npm version --allow-same-version --no-git-tag-version version_number` to update the version number.
- [ ] Create a new release on GitHub with the same version number. This runs `.github/workflows/deploy.yml`, which publishes to npm.

## npm authentication
The publish job signs in to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers). On npmjs.com, open the package's Settings, then Trusted publishing, and add GitHub Actions with organization `deepinfra`, repository `deepinfra-node` and workflow filename `deploy.yml`, with `npm publish` allowed. A new entry expires unless it publishes within 2 days, so add it right before a release.

Without a trusted publisher the job falls back to the `NPM_TOKEN` repository secret.



## Authors
- [Oguz Vuruskaner](https://github.com/ovuruska)
- [Iskren Ivov Chernev](https://github.com/ichernev)

