# Upgrade / Downgrade Firmware with parameters


## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

- [ ] Check `node.js` version (the version must be at least 18):

```
node -v
```
if your version does not meet the above requirements, please install/update it using [Node.js](https://nodejs.org/)

- [ ] Use one from following utilities for running tests: [Microsoft Powershell](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5#installing-the-msi-package), Command Line (cmd), [Git Bush](https://git-scm.com/)

- [ ] Install [Microsoft VS Code](https://code.visualstudio.com/download)

- [ ] Check or install [TypeScript](https://www.typescriptlang.org/download/)

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files:
```
git clone git@github.com:a2softin-LTD/tools_sas_firmware_tests.git
```

- [ ] Open the project in an IDE and run the command for installing all dependencies:
```
npm install
```

- [ ] Please install additionally [Playwright framework](https://playwright.dev/docs/intro)
```
npm init playwright@latest
```
Run the install command and select the following to get started:
- Choose between TypeScript or JavaScript (default is TypeScript)
- Name of your Tests folder (default is tests or e2e if you already have a tests folder in your project)
- Add a GitHub Actions workflow to easily run tests on CI
- Install Playwright browsers (default is true)

- [ ] (!) Use [MD5 generator](https://www.md5hashgenerator.com/) to convert password from `String` to `Hash`


### 1. Open the project root and run 'Upgrade/Downgrade' tests from command line:
####
- Windows, eg:

```
$env:TEST_ENV="${ENV}"; $env:EMAIL="${USER_EMAIL}"; $env:PASSWORD_MD5="${USER_PASSWORD_MD5}"; $env:DEVICE_ID="${DEVICE_ID_HEX}"; $env:FIRMWARE_VERSIONS="http://51.20.115.159:7070/firmware/b7/22_75.bin,http://51.20.115.159:7070/firmware/b7/22_74.bin"; npx playwright test --grep "@sas_upgrade_downgrade"
```
- Linux, eg:
```
TEST_ENV="${ENV}" EMAIL="${USER_EMAIL}" PASSWORD_MD5="${USER_PASSWORD_MD5}" DEVICE_ID="${DEVICE_ID_HEX}" FIRMWARE_VERSIONS="http://51.20.115.159:7070/firmware/b7/22_75.bin,http://51.20.115.159:7070/firmware/b7/22_74.bin" npx playwright test --grep "@sas_upgrade_downgrade"
```
use follow tag: `@sas_upgrade_downgrade`

Example (for Windows):
```` 
$env:TEST_ENV="dev"; $env:EMAIL="agntkcak7s@jxpomup.com"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:DEVICE_ID="00:08:B7:10:08:F4"; $env:FIRMWARE_VERSIONS="http://51.20.115.159:7070/firmware/b7/22_75.bin,http://51.20.115.159:7070/firmware/b7/22_74.bin"; npx playwright test --grep "@sas_upgrade_downgrade"
````


### 2. Open the project root and run 'Upgrade/Downgrade' `tests for several devices` from command line:
####
- Windows, eg:

```
$env:TEST_ENV="${ENV}"; $env:EMAIL="${USER_EMAIL}"; $env:PASSWORD_MD5="${USER_PASSWORD_MD5}"; $env:SEVERAL_DEVICES_SAS="${SEVERAL_DEVICES_SAS}"; $env:FIRMWARE_VERSIONS="http://51.20.115.159:7070/firmware/b7/22_75.bin,http://51.20.115.159:7070/firmware/b7/22_74.bin"; npx playwright test --grep "@several_devices_up_down"
```
- Linux, eg:
```
TEST_ENV="${ENV}" EMAIL="${USER_EMAIL}" PASSWORD_MD5="${USER_PASSWORD_MD5}" DEVICE_ID="${SEVERAL_DEVICES_SAS}" FIRMWARE_VERSIONS="http://51.20.115.159:7070/firmware/b7/22_75.bin,http://51.20.115.159:7070/firmware/b7/22_74.bin" npx playwright test --grep "@several_devices_up_down"
```
use follow tag: `@several_devices_up_down`

Example (for Windows):
```` 
$env:TEST_ENV="dev"; $env:EMAIL="slobandriana+1@gmail.com"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:SEVERAL_DEVICES_SAS="00:08:B7:00:00:08,00:08:B7:10:02:08"; $env:FIRMWARE_VERSIONS="http://51.20.115.159:7070/firmware/b7/22_75.bin,http://51.20.115.159:7070/firmware/b7/22_74.bin"; npx playwright test --grep "@several_devices_up_down"
````


### 3. Open the project root and run 'Add/Delete reactions' tests from command line:
####
- Windows:

```
$env:TEST_ENV="${ENV}"; $env:EMAIL="${USER_EMAIL}"; $env:PASSWORD_MD5="${USER_PASSWORD_MD5}"; $env:DEVICE_ID="${DEVICE_ID_HEX}"; $env:REACTION_AMOUNT="${REACTION_AMOUNT}"; npx playwright test --grep "@sas_reactions_add | @sas_reactions_delete"
```
- Linux:
```
TEST_ENV="${ENV}" EMAIL="${USER_EMAIL}" PASSWORD_MD5="${USER_PASSWORD_MD5}" DEVICE_ID="${DEVICE_ID_HEX}"; $env:REACTION_AMOUNT="${REACTION_AMOUNT}" npx playwright test --grep "@sas_reactions_add | @sas_reactions_delete"
```
use following tags: `@sas_reactions_add` or `@sas_reactions_delete`

Examples (for Windows):
```` 
$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:REACTION_AMOUNT="10"; npx playwright test --grep "@sas_reactions_add" 

$env:TEST_ENV="dev"; $env:EMAIL="zajac@ukr.net"; $env:PASSWORD_MD5="8af3982673455323883c06fa59d2872a"; $env:DEVICE_ID="00:08:B7:00:00:16"; $env:REACTION_AMOUNT="10"; npx playwright test --grep "@sas_reactions_delete"
````

where:
- ENV: string = {**"dev"** **by default**, "qa", "prod"}
- USER_EMAIL: string = {YOUR_EMAIL || **"slobandriana+1@gmail.com" by default**}
- USER_PASSWORD_MD5: string = {YOUR_PASSWORD_MD5 || **"8af3982673455323883c06fa59d2872a" by default**}
- DEVICE_ID_HEX: string = {YOUR_DEVICE_ID_HEX || **"00:08:B7:10:08:F4" by default**}
- FIRMWARE_VERSIONS: string = {YOUR_FIRMWARE_VERSIONS_AS_STRING || "http:\/\/51.20.115.159:7070/firmware/b7/34_75.bin,http:\/\/51.20.115.159:7070/firmware/b7/22_75.bin" by default}
- command fot launch the test: npx playwright test --grep "@sas_upgrade_downgrade", where the tag "@sas_upgrade_downgrade" always used!
