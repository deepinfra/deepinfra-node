# Release
This document describes the release process for the `deepinfra` package.


## Checklist
Before release, make sure to do the following steps:

- [ ] Update the `package.json` version number. You can use `npm version --allow-same-version --no-git-tag-version version_number` to update the version number.
- [ ] Create a new release on GitHub with the same version number. This runs `.github/workflows/deploy.yml`, which stages the version on npm.
- [ ] Have a package maintainer approve the staged version with 2FA, on npmjs.com under Staged Packages or with `npm stage list deepinfra` and `npm stage approve <stage-id>`. Until then it can't be installed.

## npm authentication
The publish job signs in to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers) and only [stages](https://docs.npmjs.com/staged-publishing) the version. The trusted publisher is on npmjs.com under the package's Settings, then Trusted publishing: GitHub Actions with organization `deepinfra`, repository `deepinfra-node` and workflow filename `deploy.yml`, with `npm publish` unticked under Allowed actions, so nothing goes live without a maintainer's approval. If it ever has to be recreated, do it right before a release: a new entry expires unless a release uses it within 2 days.



## Authors
- [Oguz Vuruskaner](https://github.com/ovuruska)
- [Iskren Ivov Chernev](https://github.com/ichernev)

